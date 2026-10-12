import FormBadge from "../../atoms/FormBadge";
import type { Result } from "@/app/types/standings";


interface FormStripProps {
    results: Result[]
    mainClass: string
}

const FormStrip = (props: FormStripProps) => {
    return (
        <div className={`${props.mainClass}__form-strip form-strip`}>
            {props.results.map((result, i) => <FormBadge key={result + i} mainClass={props.mainClass} content={result} />)}
        </div>
    )
}

export default FormStrip