import "server-only";
import { createAdminClient } from "@/app/lib/supabase/admin";
import type { PredictionDriver } from "@/app/types/predictions";

const FALLBACK_COLOUR = "66748f";

export const getPredictionDrivers = async (): Promise<PredictionDriver[]> => {
    const supabase = createAdminClient();

    const { data: teams, error: teamsError } = await supabase
        .from("teams")
        .select("id, name, colour");

    const { data: drivers, error: driversError } = await supabase
        .from("drivers")
        .select("name, number, acronym, team_id")
        .order("name");

    if (teamsError || driversError || !teams || !drivers) {
        console.error(teamsError ?? driversError);
        return [];
    }

    const teamsById = new Map(teams.map((team) => [team.id, team]));

    return drivers.map((driver) => {
        const team = teamsById.get(driver.team_id);

        return {
            driverNumber: driver.number,
            name: driver.name,
            team: team?.name ?? "",
            teamColour: team?.colour || FALLBACK_COLOUR,
            acronym: driver.acronym ?? "",
        };
    });
};