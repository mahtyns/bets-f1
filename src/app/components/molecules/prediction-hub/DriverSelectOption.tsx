import type { PredictionDriver } from "@/app/types/predictions";

interface DriverSelectOptionProps {
    mainClass: string;
    driver: PredictionDriver;
    selected: boolean;
    onSelect: (driverNumber: number) => void;
}

const DriverSelectOption = (props: DriverSelectOptionProps) => {
    const selectedClass = props.selected ? ` ${props.mainClass}__driver-option--selected` : "";

    return (
        <button
            type="button"
            className={`${props.mainClass}__driver-option${selectedClass}`}
            onClick={() => props.onSelect(props.driver.driverNumber)}
            aria-pressed={props.selected}
        >
            {props.driver.name}
        </button>
    );
};

export default DriverSelectOption;
