import Text from "../../atoms/Text";
import Title from "../../atoms/Title";

interface ScoringRulesHeaderProps {
    mainClass: string,
    title: string,
    description: string
}
export const ScoringRulesHeader = (props: ScoringRulesHeaderProps) => {
    return (
        <section id="scoring-rules" className={`${props.mainClass}__header`}>
            <Title isH1={true} title={props.title} />
            <Text variant="primary" text={props.description} />
        </section>
    )
}
