"use client";

import { useState } from "react";
import type { BetSummary } from "@/app/data/bet-summary";
import type { PlayerBet } from "@/app/data/race-bets";
import Title from "../../atoms/Title";
import BetSummaryList from "../../molecules/prediction-hub/BetSummaryList";
import { Subtitle } from "../../atoms/Subtitle";

interface PredictionLockedResultsProps {
    bet: BetSummary | null;
    bets: PlayerBet[];
    userId: number | null;
}

export const PredictionLockedResults = (props: PredictionLockedResultsProps) => {
    const mainClass = "prediction-hub";

    const otherBets = props.bets.filter((bet) => bet.userId !== String(props.userId));
    const [selectedId, setSelectedId] = useState<string>("");
    const selected = otherBets.find((bet) => bet.userId === selectedId) ?? otherBets[0] ?? null;

    return (
        <section id="prediction-hub-bet" className="prediction-hub__bet">
            <Title isH1={false} title="Your predictions" />
            <div className={`${mainClass}__compare`}>
                <div>
                    <Subtitle isH3={false} title="Your bets" />
                    {props.bet ? (
                        <article className={`${mainClass}__module`}>
                            <BetSummaryList mainClass={mainClass} summary={props.bet} />
                        </article>
                    ) : (
                        <p>You did not place a bet for this race.</p>
                    )}
                </div>
                <div>
                    <div className={`${mainClass}__compare-bets`}>
                        <Subtitle isH3={false} title="Compare bets" />
                        {selected && (
                            <select
                                value={selected.userId}
                                onChange={(event) => setSelectedId(event.target.value)}
                            >
                                {otherBets.map((bet) => (
                                    <option key={bet.userId} value={bet.userId}>
                                        {bet.name}
                                    </option>
                                ))}
                            </select>
                        )}
                    </div>
                    {selected ? (
                        <article className={`${mainClass}__module`}>
                            <BetSummaryList mainClass={mainClass} summary={selected.summary} />
                        </article>
                    ) : (
                        <p>No other players placed a bet for this race.</p>
                    )}
                </div>
            </div>
        </section>
    );
};