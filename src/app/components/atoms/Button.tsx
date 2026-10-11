interface ButtonProps {
    text: string,
    variant: 'primary' | 'secondary' | 'inverted' | 'outlined'
    handleClick?: () => void | null;
    type?: 'submit'
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
        >
            {props.text}
        </button>
    )
}

export default Button