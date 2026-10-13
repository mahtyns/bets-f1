import type { CSSProperties, DragEvent, KeyboardEvent } from "react";
import type { PredictionDriver, PredictionSlot } from "@/app/types/predictions";
import { predictionHubContent } from "@/app/content/prediction-hub";
import PositionBadge from "../../atoms/PositionBadge";
import ClearButton from "../../atoms/ClearButton";
import DriverSlotSelect from "./DriverSlotSelect";

interface DriverPredictionCardProps {
    mainClass: string;
    driver: PredictionSlot;
    remaining: PredictionDriver[];
    position: number;
    isDragging: boolean;
    isOver: boolean;
    onSelect: (driver: PredictionDriver) => void;
    onClear: () => void;
    onDragStart: (event: DragEvent<HTMLLIElement>) => void;
    onDragOver: (event: DragEvent<HTMLLIElement>) => void;
    onDrop: (event: DragEvent<HTMLLIElement>) => void;
    onDragEnd: () => void;
    onKeyDown: (event: KeyboardEvent<HTMLLIElement>) => void;
}

const DriverPredictionCard = (props: DriverPredictionCardProps) => {
    const { driver, mainClass } = props;
    const isEmpty = !driver;
    const style = driver
        ? ({ "--team-colour": `#${driver.teamColour}` } as CSSProperties)
        : undefined;
    const emptyClass = isEmpty ? ` ${mainClass}__driver-card--empty` : "";
    const draggingClass = props.isDragging ? ` ${mainClass}__driver-card--dragging` : "";
    const overClass = props.isOver ? ` ${mainClass}__driver-card--over` : "";
    const label = driver
        ? `${driver.name}, ${driver.team}, P${props.position}. Drag to reorder.`
        : `P${props.position}. ${predictionHubContent.selectPlaceholder}`;

    return (
        <li
            className={`${mainClass}__driver-card${emptyClass}${draggingClass}${overClass}`}
            style={style}
            draggable={!isEmpty}
            tabIndex={0}
            aria-grabbed={props.isDragging}
            aria-label={label}
            onDragStart={isEmpty ? undefined : props.onDragStart}
            onDragOver={props.onDragOver}
            onDrop={props.onDrop}
            onDragEnd={props.onDragEnd}
            onKeyDown={props.onKeyDown}
        >
            <PositionBadge mainClass={mainClass} position={props.position} />
            {driver ? (
                <>
                    <span className={`${mainClass}__colour-bar`} />
                    <div className={`${mainClass}__driver-info`}>
                        <p>{driver.name}</p>
                        <p>{driver.team}</p>
                    </div>
                    <ClearButton
                        mainClass={mainClass}
                        label={predictionHubContent.clearDriver}
                        onClick={props.onClear}
                    />
                </>
            ) : (
                <DriverSlotSelect
                    mainClass={mainClass}
                    remaining={props.remaining}
                    onSelect={props.onSelect}
                />
            )}
        </li>
    );
};

export default DriverPredictionCard;
