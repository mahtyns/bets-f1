import type { PredictionDriver, PredictionSlot } from "@/app/types/predictions";
import { predictionHubContent } from "@/app/content/prediction-hub";
import PredictionModuleHeader from "../../molecules/prediction-hub/PredictionModuleHeader";
import DraggableDriverList from "./DraggableDriverList";

interface QualifyingQ3PredictionProps {
    mainClass: string;
    allDrivers: PredictionDriver[];
    slots: PredictionSlot[];
    onSlotsChange: (slots: PredictionSlot[]) => void;
}

const QualifyingQ3Prediction = (props: QualifyingQ3PredictionProps) => {
    const { qualifying } = predictionHubContent;

    return (
        <article className={`${props.mainClass}__module`}>
            <PredictionModuleHeader
                mainClass={props.mainClass}
                title={qualifying.title}
                subtitle={qualifying.subtitle}
                hint={qualifying.hint}
            />
            <DraggableDriverList
                mainClass={props.mainClass}
                allDrivers={props.allDrivers}
                slots={props.slots}
                layout="grid"
                onSlotsChange={props.onSlotsChange}
            />
        </article>
    );
};

export default QualifyingQ3Prediction;
