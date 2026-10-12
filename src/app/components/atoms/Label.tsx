interface LabelProps {
    text: string,
    mainClass: string,
    variant: 'primary' | 'secondary' | 'tertiary'
}

const variantClasses: Record<LabelProps['variant'], string> = {
    primary: 'primary',
    secondary: 'secondary',
    tertiary: 'tertiary'
};

export const Label = (props: LabelProps) => {
    return (
        <div className={`${props.mainClass}__label label label--${variantClasses[props.variant]}`}>{props.text}</div>
    )
}
