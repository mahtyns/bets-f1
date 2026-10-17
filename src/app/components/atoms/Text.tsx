
interface TextProps {
    text: string,
    variant: 'white' | 'primary' | 'muted',
    mainClass?: string
}

const variantClasses: Record<TextProps['variant'], string> = {
    primary: 'text--primary',
    white: 'text--white',
    muted: 'text--muted'
};

const Text = (props: TextProps) => {
    return (
        <p className={`${props.mainClass}__text ${variantClasses[props.variant]}`}>{props.text}</p>
    )
}

export default Text