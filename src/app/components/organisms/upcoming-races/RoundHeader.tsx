import Title from "../../atoms/Title";
import Text from "../../atoms/Text";

interface RoundsHeaderProps {
    mainClass: string,
    firstRound: number,
    lastRound: number
}

const pad = (round: number) => String(round).padStart(2, '0');

const RoundsHeader = (props: RoundsHeaderProps) => {
    const text = props.firstRound === props.lastRound
        ? `Round ${pad(props.firstRound)}`
        : `Rounds ${pad(props.firstRound)} - ${pad(props.lastRound)}`;

    return (
        <header className={`${props.mainClass}__header`}>
            <Text text={text} variant="primary" mainClass={`${props.mainClass}__rounds`} />
            <Title title="Upcoming World Championship Rounds" isH1={false} />
        </header>
    )
}

export default RoundsHeader