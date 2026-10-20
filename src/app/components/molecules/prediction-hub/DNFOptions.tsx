import type { DNFChoice } from "@/app/types/predictions";
import { predictionHubContent } from "@/app/content/prediction-hub";

interface DNFOptionsProps {
    mainClass: string;
    value: DNFChoice | null;
    onSelect: (value: DNFChoice) => void;
}

const DNFOptions = (props: DNFOptionsProps) => {
    return (
        <div className={`${props.mainClass}__safety-options`}>
            {predictionHubContent.specials.dnf.options.map((option) => {
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

export default DNFOptions;
