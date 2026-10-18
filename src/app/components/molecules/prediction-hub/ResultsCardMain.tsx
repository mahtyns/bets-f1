"use client"
import { Subtitle } from "../../atoms/Subtitle";

interface ResultsCardMainProps {
    title: string;
    name: string;
    detail?: string;
    team?: string;
}

export const ResultsCardMain = (props: ResultsCardMainProps) => {
    return (
        <div className="prediction-hub-winner">
            <Subtitle isH3={false} title={props.title} />
            <p className="winner-name">{props.name}</p>
            <div className="prediction-hub-winner__details">
                {props.team && <p>{props.team}</p>}
                {props.detail && <p>{props.detail}</p>}
            </div>
        </div>
    )
}