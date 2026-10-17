"use server";

import { createAdminClient } from "@/app/lib/supabase/admin";
import { getSessionUserId } from "@/app/lib/session";
import { BET_CATEGORIES, SAFETY_CAR_TO_NUMBER } from "@/app/content/bet-categories";
import { PREDICTION_SLOT_COUNT } from "@/app/utils/helpers/predictionSlots";
import type { SaveBetInput } from "@/app/types/bets";

type SaveBetResult = { error: string | null };

const hasDuplicates = (numbers: (number | null)[]): boolean => {
    const picked = numbers.filter((number) => number !== null);
    return new Set(picked).size !== picked.length;
};

export const saveBetAction = async (input: SaveBetInput): Promise<SaveBetResult> => {
    const userId = await getSessionUserId();
    if (!userId) return { error: "You need to be logged in" };

    const supabase = createAdminClient();

    const { data: race } = await supabase
        .from("races")
        .select("id, is_sprint, bets_opens_at, bets_lock_at")
        .eq("id", input.raceId)
        .maybeSingle();

    if (!race) return { error: "Race not found" };

    const now = Date.now();
    if (now < new Date(race.bets_opens_at).getTime()) return { error: "Bets are not open yet" };
    if (now >= new Date(race.bets_lock_at).getTime()) return { error: "Bets are closed for this race" };

    const qualifying = input.qualifying.slice(0, PREDICTION_SLOT_COUNT);
    const raceFinish = input.race.slice(0, PREDICTION_SLOT_COUNT);
    const sprint = race.is_sprint ? input.sprint.slice(0, PREDICTION_SLOT_COUNT) : [];

    if ([qualifying, raceFinish, sprint].some(hasDuplicates)) {
        return { error: "A driver can only be picked once per category" };
    }

    const { data: drivers } = await supabase.from("drivers").select("id, number");
    if (!drivers) return { error: "Could not load the drivers" };

    const idByNumber = new Map(drivers.map((driver) => [driver.number, driver.id]));

    const allNumbers = [
        ...qualifying,
        ...raceFinish,
        ...sprint,
        input.fastestLap,
        input.driverOfTheRace,
    ].filter((number) => number !== null);

    if (allNumbers.some((number) => !idByNumber.has(number))) {
        return { error: "Unknown driver in your picks" };
    }

    const { data: bet, error: betError } = await supabase
        .from("bets")
        .upsert({ user_id: userId, race_id: race.id }, { onConflict: "user_id,race_id" })
        .select("id")
        .single();

    if (betError || !bet) return { error: "Could not save your bet" };

    const positionRows = (category: string, numbers: (number | null)[]) =>
        numbers.flatMap((number, index) =>
            number === null
                ? []
                : [{
                    bet_id: bet.id,
                    category,
                    position: index + 1,
                    driver_id: idByNumber.get(number),
                }]
        );

    const specialRows = [];

    if (input.fastestLap !== null) {
        specialRows.push({
            bet_id: bet.id,
            category: BET_CATEGORIES.fastestLap,
            driver_id: idByNumber.get(input.fastestLap),
        });
    }

    if (input.driverOfTheRace !== null) {
        specialRows.push({
            bet_id: bet.id,
            category: BET_CATEGORIES.driverOfTheDay,
            driver_id: idByNumber.get(input.driverOfTheRace),
        });
    }

    if (input.safetyCar !== null) {
        specialRows.push({
            bet_id: bet.id,
            category: BET_CATEGORIES.safetyCar,
            safety_car: SAFETY_CAR_TO_NUMBER[input.safetyCar],
        });
    }

    const rows = [
        ...positionRows(BET_CATEGORIES.qualifying, qualifying),
        ...positionRows(BET_CATEGORIES.race, raceFinish),
        ...positionRows(BET_CATEGORIES.sprint, sprint),
        ...specialRows,
    ];

    const { error: deleteError } = await supabase
        .from("bet_picks")
        .delete()
        .eq("bet_id", bet.id);

    if (deleteError) return { error: "Could not save your bet" };

    if (rows.length > 0) {
        const { error: insertError } = await supabase.from("bet_picks").insert(rows);
        if (insertError) return { error: "Could not save your bet" };
    }

    return { error: null };
};