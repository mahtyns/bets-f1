import { Badge } from "../atoms/Badge";
import ImageRounded from "../atoms/ImageRounded";
import { avatars, avatarTeams } from '../../content/helper-values'

interface PlayerCellProps {
    mainClass: string,
    name: string,
    team: string,
    avatarId: number,
    isMe?: boolean
}

const PlayerCell = (props: PlayerCellProps) => {
    return (
        <div className={`${props.mainClass}__player-cell__info`}>
            <ImageRounded mainClass={props.mainClass} src={avatars[props.avatarId]} alt="Player Profile" width={96} height={96} />
            <div className={`${props.mainClass}__player-cell__name ${props.mainClass}__player-cell__name--${avatarTeams[props.avatarId]}`}>
                <p>{props.name}</p>
                <p>{props.team}</p>
            </div>
            {
                props.isMe && <Badge />
            }
        </div>
    )
}

export default PlayerCell