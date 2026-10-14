interface SessionBadgeProps {
    code: string,
    mainClass: string
}

const SessionBadge = (props: SessionBadgeProps) => {
    return (
        <span className={`${props.mainClass}__badge`}>{props.code}</span>
    )
}

export default SessionBadge