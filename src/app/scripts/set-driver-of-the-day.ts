import { createClient } from "@supabase/supabase-js";
import { BET_CATEGORIES } from "../content/bet-categories";
import { CHAMPIONSHIP_YEAR } from "../content/helper-values";

const run = async () => {
    const round = Number(process.argv[2]);
    const driverNumber = Number(process.argv[3]);
    if (!round || !driverNumber) {
        throw new Error("Usage: set-driver-of-the-day.ts <round> <driver number>");
    }

    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SECRET_KEY!
    );

    const { data: race } = await supabase
        .from("races")
        .select("id, name")
        .eq("season", CHAMPIONSHIP_YEAR)
        .eq("round", round)
        .maybeSingle();
    if (!race) throw new Error(`Round ${round} not found in races`);

    const { data: driver } = await supabase
        .from("drivers")
        .select("id, name, team_id")
        .eq("number", driverNumber)
        .maybeSingle();
    if (!driver) throw new Error(`Driver #${driverNumber} not found in drivers`);

    const { error: deleteError } = await supabase
        .from("race_results")
        .delete()
        .eq("race_id", race.id)
        .eq("category", BET_CATEGORIES.driverOfTheDay);
    if (deleteError) throw deleteError;

    const { error: insertError } = await supabase.from("race_results").insert({
        race_id: race.id,
        category: BET_CATEGORIES.driverOfTheDay,
        position: null,
        driver_id: driver.id,
        team_id: driver.team_id,
        safety_car: null,
    });
    if (insertError) throw insertError;

    console.log(`Driver of the Day for ${race.name}: ${driver.name}`);
};

run().catch((error) => {
    console.error(error);
    process.exit(1);
});