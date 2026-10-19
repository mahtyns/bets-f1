import "server-only";
import { createAdminClient } from "@/app/lib/supabase/admin";
import { cacheLife } from "next/cache";


export interface BetsWindow {
    opensAt: string;
    locksAt: string;
}

// meetingKey is the OpenF1 meeting key, stored in races.external_id
export const getBetsWindow = async (meetingKey: number): Promise<BetsWindow | null> => {
    "use cache"
    cacheLife("hours")
    const supabase = createAdminClient();

    const { data, error } = await supabase
        .from("races")
        .select("bets_opens_at, bets_lock_at")
        .eq("external_id", meetingKey)
        .maybeSingle();

    if (error) console.error(error);
    if (!data) return null;

    return {
        opensAt: new Date(data.bets_opens_at).toISOString(),
        locksAt: new Date(data.bets_lock_at).toISOString(),
    };
};

export const isBetsOpen = (betsWindow: BetsWindow | null, now: number): boolean =>
    betsWindow !== null &&
    now >= new Date(betsWindow.opensAt).getTime() &&
    now < new Date(betsWindow.locksAt).getTime();