import ImageRounded from "../../atoms/ImageRounded";
import Title from "../../atoms/Title";

interface WeekWinnerProps {
    mainClass: string;
}

const WeekWinner = (props: WeekWinnerProps) => {
    return (
        <div className={`${props.mainClass}__week-winner`}>
            <Title isH1={false} title="Winner of the Week" />
            <div className={`${props.mainClass}__week-winner__card`} >
                <div className={`${props.mainClass}__week-winner__card--info`}>
                    <ImageRounded mainClass={props.mainClass} src={"/profiles/max-icon.png"} alt="Player Profile" />
                    <div className={`${props.mainClass}__player-card__name`}>
                        <p>BOBBERTO 🦫</p>
                        <p>MC BEAVER</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WeekWinner