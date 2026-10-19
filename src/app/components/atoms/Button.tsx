interface ButtonProps {
    text: string,
    variant: 'primary' | 'secondary' | 'inverted' | 'outlined'
    handleClick?: () => void | null | string;
    type?: 'submit',
    disabled?: boolean
}

const variantClasses: Record<ButtonProps['variant'], string> = {
    primary: 'button--primary',
    secondary: 'button--secondary',
    inverted: 'button--inverted',
    outlined: 'button--outlined',
};

const Button = (props: ButtonProps) => {
    return (
        <button
            className={`button ${variantClasses[props.variant]}`}
            onClick={props.handleClick}
            type={props.type}
            disabled={props.disabled}
        >
            {props.text}
        </button>
    )
}

export default Button