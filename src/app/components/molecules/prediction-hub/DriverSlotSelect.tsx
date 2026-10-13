import type { PredictionDriver } from "@/app/types/predictions";
import { predictionHubContent } from "@/app/content/prediction-hub";
import SelectField from "../../atoms/SelectField";

interface DriverSlotSelectProps {
    mainClass: string;
    remaining: PredictionDriver[];
    onSelect: (driver: PredictionDriver) => void;
}

const DriverSlotSelect = (props: DriverSlotSelectProps) => {
    return (
        <SelectField
            mainClass={props.mainClass}
            value=""
            placeholder={predictionHubContent.selectPlaceholder}
            options={props.remaining.map((driver) => ({
                value: String(driver.driverNumber),
                label: `${driver.name} · ${driver.team}`,
            }))}
            onChange={(value) => {
                const driver = props.remaining.find(
                    (item) => String(item.driverNumber) === value
                );
                if (driver) props.onSelect(driver);
            }}
        />
    );
};

export default DriverSlotSelect;
