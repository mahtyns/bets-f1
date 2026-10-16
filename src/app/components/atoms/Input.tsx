interface InputProps {
    id: string;
    type: 'text' | 'password';
    value: string;
    onChange: (value: string) => void;
    autoComplete?: string;
    required?: boolean;
}

const Input = (props: InputProps) => {
    return (
        <input
            className="input"
            id={props.id}
            name={props.id}
            type={props.type}
            value={props.value}
            onChange={(e) => props.onChange(e.target.value)}
            autoComplete={props.autoComplete}
            required={props.required}
        />
    )
}

export default Input