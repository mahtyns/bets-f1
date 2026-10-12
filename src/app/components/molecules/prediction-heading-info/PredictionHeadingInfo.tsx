
interface PredictionInfoProps {
    round: number,
    circuitName: string,
    circuitType: string
}

export const PredictionHeadingInfo = (props: PredictionInfoProps) => {
    return (
        <div className="prediction-info">
            <p className="prediction-info__round">
                Round: {props.round}
            </p>
            <p className="prediction-info__name">
                / {props.circuitName} /
            </p>
            <p className="prediction-info__type">
                {props.circuitType}
            </p>
        </div>
    )
}
