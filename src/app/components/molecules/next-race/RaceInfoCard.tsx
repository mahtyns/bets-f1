import Text from "../../atoms/Text";

interface RaceInfoCardProps {
    mainClass: string,
    label: string,
    value: string,
    subText: string,
    highlight: boolean
}

const RaceInfoCard = (props: RaceInfoCardProps) => {
    const cardClass = `${props.mainClass}__card`;

    return (
        <div className={`${cardClass}${props.highlight ? ` ${cardClass}--highlight` : ''}`}>
            <Text text={props.label} variant="primary" mainClass={`${cardClass}-label`} />
            <Text text={props.value} variant="white" mainClass={`${cardClass}-value`} />
            <Text text={props.subText} variant="primary" mainClass={`${cardClass}-sub`} />
        </div>
    )
}

export default RaceInfoCard