import { EntriesStatus } from "../../atoms/EntriesStatus";
import { PoolStatus } from "../../atoms/PoolStatus";
import { PredictionHeadingInfo } from "../prediction-heading-info/PredictionHeadingInfo";

interface PredictionHubTopbarProps {
    round: number,
    circuitName: string,
    circuitType: string,
    mainClass: string
}

export const PredictionHubTopbar = (props: PredictionHubTopbarProps) => {

    return (
        <div className={`${props.mainClass}__topbar`}>
            <PredictionHeadingInfo round={props.round} circuitName={props.circuitName} circuitType={props.circuitType} />
            <div className={`${props.mainClass}__status-bar`}>
                <EntriesStatus entryNumber={3} />
                <PoolStatus variant="closed" />
            </div>
        </div>
    )
}
