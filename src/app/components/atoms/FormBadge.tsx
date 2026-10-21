import { FormBadgeContentType } from "@/app/types/components";

interface FormBadgeProps {
    mainClass: string,
    content: FormBadgeContentType
}

const variantClasses: Record<FormBadgeProps['content'], string> = {
    W: 'form-badge--winner',
    P: 'form-badge--podium',
    L: 'form-badge--lost',
};
const FormBadge = (props: FormBadgeProps) => {
    return (
        <div className={`${props.mainClass}__form-badge form-badge ${variantClasses[props.content]}`}>{props.content}</div>
    )
}

export default FormBadge