import "server-only";
import { createAdminClient } from "@/app/lib/supabase/admin";
import { getSessionUserId } from "@/app/lib/session";
import type { SafetyCarChoice } from "@/app/types/predictions";
import { PREDICTION_SLOT_COUNT } from "@/app/utils/helpers/predictionSlots";
import { BET_CATEGORIES, SAFETY_CAR_FROM_NUMBER } from "../content/betCategories";

export interface UserBet {
    qualifying: (number | null)[];
    race: (number | null)[];
    sprint: (number | null)[];
    fastestLap: number | null;
    driverOfTheRace: number | null;
    safetyCar: SafetyCarChoice | null;
}

export const getUserBet = async (raceId: number): Promise<UserBet | null> => {
    const userId = await getSessionUserId();
    if (!userId) return null;

    const supabase = createAdminClient();

    const { data: bet } = await supabase
        .from("bets")
        .select("id")
        .eq("user_id", userId)
        .eq("race_id", raceId)
        .maybeSingle();

    if (!bet) return null;

    const [picksResult, driversResult] = await Promise.all([
        supabase
            .from("bet_picks")
            .select("category, position, driver_id, safety_car")
            .eq("bet_id", bet.id),
        supabase.from("drivers").select("id, number"),
    ]);

    const picks = picksResult.data;
    const drivers = driversResult.data;

    if (picksResult.error || driversResult.error || !picks || !drivers) {
        console.error(picksResult.error ?? driversResult.error);
        return null;
    }

    const numberById = new Map(drivers.map((driver) => [driver.id, driver.number]));

    const driverNumber = (driverId: number | null | undefined): number | null =>
        driverId ? numberById.get(driverId) ?? null : null;

    const slotsFor = (category: string): (number | null)[] => {
        const slots: (number | null)[] = Array(PREDICTION_SLOT_COUNT).fill(null);

        picks
            .filter((pick) => pick.category === category && pick.position)
            .forEach((pick) => {
                slots[pick.position - 1] = driverNumber(pick.driver_id);
            });

        return slots;
    };

    const special = (category: string) => picks.find((pick) => pick.category === category);
    const safetyCar = special(BET_CATEGORIES.safetyCar)?.safety_car;

    return {
        qualifying: slotsFor(BET_CATEGORIES.qualifying),
        race: slotsFor(BET_CATEGORIES.race),
        sprint: slotsFor(BET_CATEGORIES.sprint),
        fastestLap: driverNumber(special(BET_CATEGORIES.fastestLap)?.driver_id),
        driverOfTheRace: driverNumber(special(BET_CATEGORIES.driverOfTheDay)?.driver_id),
        safetyCar: safetyCar == null ? null : SAFETY_CAR_FROM_NUMBER[safetyCar] ?? null,
    };
};