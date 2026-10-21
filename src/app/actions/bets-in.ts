"use server"

import { createAdminClient } from "@/app/lib/supabase/admin";

export const getBetsIn = async (sessionNumber: number) => {
    const supabase = createAdminClient();

    const { data: bets, error } = await supabase.from('bets').select('race_id, user_id').eq('race_id', sessionNumber);

    if (error || !bets) {
        return { error: "Could not fetch bets" };
    }

    return { totalBetsIn: bets.length };
}