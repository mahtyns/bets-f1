import type {
    PredictionDriver,
    PredictionSlot,
    RacePredictionVariant,
} from "@/app/types/predictions";
import { predictionHubContent } from "@/app/content/prediction-hub";
import PredictionModuleHeader from "../../molecules/prediction-hub/PredictionModuleHeader";
import DraggableDriverList from "./DraggableDriverList";

interface RaceFinishersPredictionProps {
    mainClass: string;
    variant: RacePredictionVariant;
    allDrivers: PredictionDriver[];
    slots: PredictionSlot[];
    onSlotsChange: (slots: PredictionSlot[]) => void;
}

const RaceFinishersPrediction = (props: RaceFinishersPredictionProps) => {
    const copy = predictionHubContent[props.variant];

    return (
        <article className={`${props.mainClass}__module`}>
            <PredictionModuleHeader
                mainClass={props.mainClass}
                title={copy.title}
                subtitle={copy.subtitle}
                hint={copy.hint}
            />
            <DraggableDriverList
                mainClass={props.mainClass}
                allDrivers={props.allDrivers}
                slots={props.slots}
                layout="race"
                onSlotsChange={props.onSlotsChange}
            />
        </article>
    );
};

export default RaceFinishersPrediction;
