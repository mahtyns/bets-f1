import { LabelType } from "@/app/types/components";

interface LabelProps {
    text: string,
    mainClass: string,
    variant: LabelType
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
