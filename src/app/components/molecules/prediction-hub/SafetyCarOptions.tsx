import type { SafetyCarChoice } from "@/app/types/predictions";
import { predictionHubContent } from "@/app/content/prediction-hub";

interface SafetyCarOptionsProps {
    mainClass: string;
    value: SafetyCarChoice | null;
    onSelect: (value: SafetyCarChoice) => void;
}

const SafetyCarOptions = (props: SafetyCarOptionsProps) => {
    return (
        <div className={`${props.mainClass}__safety-options`}>
            {predictionHubContent.specials.safetyCar.options.map((option) => {
                const selectedClass =
                    props.value === option.value
                        ? ` ${props.mainClass}__safety-option--selected`
                        : "";

                return (
                    <button
                        key={option.value}
                        type="button"
                        className={`${props.mainClass}__safety-option${selectedClass}`}
                        onClick={() => props.onSelect(option.value)}
                        aria-pressed={props.value === option.value}
                    >
                        {option.label}
                    </button>
                );
            })}
        </div>
    );
};

export default SafetyCarOptions;
