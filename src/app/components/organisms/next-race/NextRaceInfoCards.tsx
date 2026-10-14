import RaceInfoCard from "../../molecules/next-race/RaceInfoCard";
import { RaceInfoCardData } from "@/app/utils/helpers/raceInfoCards";

interface NextRaceInfoCardsProps {
    mainClass: string,
    cards: RaceInfoCardData[]
}

export const NextRaceInfoCards = (props: NextRaceInfoCardsProps) => {
    if (props.cards.length === 0) return null;

    return (
        <div className={`${props.mainClass}__cards`}>
            {props.cards.map((card) => (
                <RaceInfoCard key={card.label} mainClass={props.mainClass} {...card} />
            ))}
        </div>
    )
}