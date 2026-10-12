import { Label } from "../../atoms/Label";
import Title from "../../atoms/Title";
import Text from "../../atoms/Text";
import Flag from "../../atoms/Flag";

interface NextRaceHeaderProps {
    mainClass: string,
    round: number,
    totalRounds: number,
    dateRange: string,
    flag: string,
    title: string,
    subtitle: string
}

const NextRaceHeader = (props: NextRaceHeaderProps) => {
    const round = String(props.round).padStart(2, '0');

    return (
        <header className={`${props.mainClass}__header`}>
            <div className={`${props.mainClass}__meta`}>
                <Label text="Next Grand Prix" variant="primary" mainClass={props.mainClass} />
                <Text text={`Round ${round} of ${props.totalRounds}`} variant="primary" mainClass={`${props.mainClass}__round`} />
                <Text text={props.dateRange} variant="muted" mainClass={`${props.mainClass}__dates`} />
            </div>
            <div className={`${props.mainClass}__heading`}>
                <Flag src={props.flag} alt="" mainClass={props.mainClass} />
                <Title title={props.title} isH1={false} />
            </div>
            <Text text={props.subtitle} variant="primary" mainClass={`${props.mainClass}__subtitle`} />
        </header>
    )
}

export default NextRaceHeader