"use client";

import { useState } from "react";
import type { Standing } from "@/app/types/standings";
import UserResultsSummary from "../../molecules/user-results/UserResultSummary";
import Title from "../../atoms/Title";

interface StandingsUserResultsProps {
    standings: Standing[];
    currentUserId: string;
}

export const StandingsUserResults = (props: StandingsUserResultsProps) => {
    const mainClass = "standings-results";
    const [selectedId, setSelectedId] = useState(props.currentUserId);

    const selected =
        props.standings.find((standing) => standing.userId === selectedId) ??
        props.standings[0] ??
        null;

    if (!selected) return null;

    return (
        <section id="standings-results" className={mainClass}>
            <div className={`${mainClass}__header`}>
                <Title isH1={false} title="Results" />
                <select
                    className={`${mainClass}__select`}
                    value={selected.userId}
                    onChange={(event) => setSelectedId(event.target.value)}
                >
                    {props.standings.map((standing) => (
                        <option key={standing.userId} value={standing.userId}>
                            {standing.userId === props.currentUserId ? `${standing.name} (you)` : standing.name}
                        </option>
                    ))}
                </select>
            </div>
            <UserResultsSummary mainClass={mainClass} standing={selected} />
        </section>
    );
};