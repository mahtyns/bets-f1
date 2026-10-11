import ImageRounded from "../../atoms/ImageRounded";

interface PlayerCardProps {
    mainClass: string;
}

const PlayerCard = (props: PlayerCardProps) => {
    return (
        <div className={`${props.mainClass}__player-card`}>
            <div className={`${props.mainClass}__player-card__topbar`}>
                CHAMPIONSHIP LEADER · P1
            </div>
            <div className={`${props.mainClass}__player-card__info`}>
                <ImageRounded mainClass={props.mainClass} src={"/profiles/leclerc-icon.png"} alt="Player Profile" />
                <div className={`${props.mainClass}__player-card__name`}>
                    <p>ROSARIO 😈</p>
                    <p>ROSARIO RACING</p>
                </div>
            </div>
            <div className={`${props.mainClass}__player-card__points`}>
                <div className={`${props.mainClass}__player-card__total`}>
                    <p>TOTAL PTS</p>
                    <p>394</p>
                </div>
                <div className={`${props.mainClass}__player-card__delta`} >
                    <p>DELTA P1</p>
                    <p>-29 PTS</p>
                </div>
                <div className={`${props.mainClass}__player-card__accuracy`} >
                    <p>Accuracy</p>
                    <p>80%</p>
                </div>
            </div>
        </div>
    )
}

export default PlayerCard