"use client";

import { useState } from "react";
import type { UserRaceResult } from "@/app/data/user-results";
import Title from "../../atoms/Title";
import UserRaceResultCard from "../../molecules/user-page/UserRaceResultCard";

interface UserResultsViewProps {
    mainClass: string;
    results: UserRaceResult[];
}

export const UserResultsView = (props: UserResultsViewProps) => {
    const { mainClass, results } = props;
    const [selectedId, setSelectedId] = useState<number | null>(null);

    const selected = results.find((result) => result.raceId === selectedId) ?? results[0] ?? null;

    return (
        <>
            <div className={`${mainClass}__header`}>
                <Title isH1={false} title="Your latest results" />
                {selected && (
                    <select
                        className={`${mainClass}__select`}
                        value={selected.raceId}
                        onChange={(event) => setSelectedId(Number(event.target.value))}
                    >
                        {results.map((result) => (
                            <option key={result.raceId} value={result.raceId}>
                                {`Round ${result.round} · ${result.name}`}
                            </option>
                        ))}
                    </select>
                )}
            </div>
            {selected ? (
                <UserRaceResultCard mainClass={mainClass} result={selected} />
            ) : (
                <p>No scored races yet.</p>
            )}
        </>
    );
};