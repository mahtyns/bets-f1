import { Subtitle } from "../../atoms/Subtitle";

type StatArea = "winner" | "p1" | "p2" | "p3" | "fastest" | "dotd" | "safety";

interface StatCardProps {
    mainClass: string;
    area: StatArea;
    title: string;
    text?: string;
    detail?: string;
}

const LockedStatCard = (props: StatCardProps) => {
    return (
        <article className={`${props.mainClass}__stat-card ${props.mainClass}__stat-card--${props.area}`}>
            <Subtitle isH3={false} title={props.title} />
            {props.text && <p className={`${props.mainClass}__stat-name`}>{props.text}</p>}
            {props.detail && <p className={`${props.mainClass}__stat-detail`}>{props.detail}</p>}
        </article>
    );
};

export default LockedStatCard;