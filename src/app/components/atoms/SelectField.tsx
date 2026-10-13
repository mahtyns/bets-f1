interface SelectOption {
    value: string;
    label: string;
}

interface SelectFieldProps {
    mainClass: string;
    value: string;
    placeholder: string;
    options: SelectOption[];
    onChange: (value: string) => void;
    labelledBy?: string;
}

const SelectField = (props: SelectFieldProps) => {
    return (
        <select
            className={`${props.mainClass}__select`}
            value={props.value}
            aria-label={props.placeholder}
            onChange={(event) => props.onChange(event.target.value)}
        >
            <option value="">{props.placeholder}</option>
            {props.options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
};

export default SelectField;
