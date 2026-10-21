import { getNextRace } from "@/app/data/next-race";
import { EntriesStatus } from "../../atoms/EntriesStatus";
import { PoolStatus } from "../../atoms/PoolStatus";
import { PredictionHeadingInfo } from "../prediction-heading-info/PredictionHeadingInfo";
import RaceWeekGate from "../../layouts/RaceWeekGate";

interface PredictionHubTopbarProps {
    round: number,
    circuitName: string,
    circuitType: string,
    mainClass: string
}

export const PredictionHubTopbar = async (props: PredictionHubTopbarProps) => {
    const nextRace = await getNextRace();

    return (
        <div className={`${props.mainClass}__topbar`}>
            <PredictionHeadingInfo round={props.round} circuitName={props.circuitName} circuitType={props.circuitType} />
            <div className={`${props.mainClass}__status-bar`}>
                <EntriesStatus sessionNumber={nextRace?.round} />
                <RaceWeekGate
                    locked={<PoolStatus variant="closed" />}
                    open={<PoolStatus variant="open" />}
                    idle={<PoolStatus variant="closed" />} />
            </div>
        </div>
    )
}
