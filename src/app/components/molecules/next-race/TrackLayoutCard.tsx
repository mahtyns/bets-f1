import Text from "../../atoms/Text";

interface TrackLayoutCardProps {
    image: string,
    name: string,
    type: string,
    mainClass: string
}

const TrackLayoutCard = (props: TrackLayoutCardProps) => {
    return (
        <div className={`${props.mainClass}__layout track-layout`}>
            <div className="track-layout__header">
                <Text text="Track layout" variant="primary" mainClass="track-layout__title" />
                <Text text={props.type} variant="primary" mainClass="track-layout__type" />
            </div>
            <div className="track-layout__image-wrapper">
                <img className="track-layout__image" src={props.image} alt={`${props.name} circuit layout`} />
            </div>
        </div>
    )
}

export default TrackLayoutCard