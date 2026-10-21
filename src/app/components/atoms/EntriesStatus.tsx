"use client"

import { getBetsIn } from "@/app/actions/bets-in";
import { getNextRace } from "@/app/data/next-race";
import { useEffect, useState } from "react";


interface EntriesProps {
    sessionNumber: number | undefined
}


export const EntriesStatus = (props: EntriesProps) => {
    const [totalBets, setTotalBets] = useState<number | undefined>(0);

    useEffect(() => {
        const fetchBets = async () => {
            if (props.sessionNumber) {
                const result = await getBetsIn(props.sessionNumber);

                if ("totalBetsIn" in result) {
                    setTotalBets(result.totalBetsIn);
                }
            }
        };

        fetchBets();
    }, [props.sessionNumber]);

    return (
        <div className="entries">
            <img />
            {totalBets} ENTRIES IN
        </div>
    )
}
