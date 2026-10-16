import Input from "../../atoms/Input";

interface LoginFieldProps {
    mainClass: string;
    id: string;
    label: string;
    type: 'text' | 'password';
    value: string;
    onChange: (value: string) => void;
    autoComplete?: string;
}

const LoginField = (props: LoginFieldProps) => {
    return (
        <div className={`${props.mainClass}__field`}>
            <label className={`${props.mainClass}__label`} htmlFor={props.id}>
                {props.label}
            </label>
            <Input
                id={props.id}
                type={props.type}
                value={props.value}
                onChange={props.onChange}
                autoComplete={props.autoComplete}
                required
            />
        </div>
    )
}

export default LoginField