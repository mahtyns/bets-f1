import Text from "../../atoms/Text";
import Title from "../../atoms/Title";

interface ScoringTextBlockProps {
    mainClass: string,
    title: string,
    text: string
}
export const ScoringTextBlock = (props: ScoringTextBlockProps) => {
    return (
        <article className={props.mainClass}>
            <Title isH1={false} title={props.title} />
            <Text variant="white" text={props.text} />
        </article>
    )
}
