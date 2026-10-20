import type { RedFlagChoice } from "@/app/types/predictions";
import { predictionHubContent } from "@/app/content/prediction-hub";

interface RedFlagOptionsProps {
    mainClass: string;
    value: RedFlagChoice | null;
    onSelect: (value: RedFlagChoice) => void;
}

const RedFlagOptions = (props: RedFlagOptionsProps) => {
    return (
        <div className={`${props.mainClass}__safety-options`}>
            {predictionHubContent.specials.redFlag.options.map((option) => {
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

export default RedFlagOptions;
