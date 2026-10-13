import type { ReactNode } from "react";
import Title from "../../atoms/Title";
import Text from "../../atoms/Text";

interface WeekendSpecialCardProps {
    mainClass: string;
    title: string;
    description: string;
    children: ReactNode;
}

const WeekendSpecialCard = (props: WeekendSpecialCardProps) => {
    return (
        <article className={`${props.mainClass}__special-card`}>
            <Title isH1={false} title={props.title} />
            <Text text={props.description} variant="muted" mainClass={`${props.mainClass}__special-copy`} />
            {props.children}
        </article>
    );
};

export default WeekendSpecialCard;
