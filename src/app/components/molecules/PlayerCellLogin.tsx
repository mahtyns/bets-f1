import ImageRounded from "../atoms/ImageRounded";
import { avatars } from '../../content/helperValues'

interface PlayerCellProps {
    mainClass: string,
}

const PlayerCellLogin = (props: PlayerCellProps) => {
    return (
        <div className={`${props.mainClass}__player-cell__info ${props.mainClass}__player-cell__info--login`}>
            <ImageRounded mainClass={props.mainClass} src={avatars[1]} alt="Player Profile" width={96} height={96} />
            <div className={`${props.mainClass}__player-cell__login`}>
                <p>Log in to play</p>
                <p><a href="/login">LOG IN</a></p>
            </div>
        </div>
    )
}

export default PlayerCellLogin