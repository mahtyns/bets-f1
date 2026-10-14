import SessionBadge from "../../atoms/SessionBadge";
import Text from "../../atoms/Text";

interface SessionRowProps {
    mainClass: string,
    code: string,
    name: string,
    day: string,
    time: string
}

const SessionRow = (props: SessionRowProps) => {
    const rowClass = `${props.mainClass}__session`;

    return (
        <li className={rowClass}>
            <SessionBadge code={props.code} mainClass={rowClass} />
            <div className={`${rowClass}-info`}>
                <Text text={props.name} variant="white" mainClass={`${rowClass}-name`} />
                <Text text={`${props.day} • ${props.time}`} variant="muted" mainClass={`${rowClass}-time`} />
            </div>
        </li>
    )
}

export default SessionRow