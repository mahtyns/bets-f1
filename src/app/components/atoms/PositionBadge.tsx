interface PositionBadgeProps {
    position: number;
    mainClass: string;
}

const PositionBadge = (props: PositionBadgeProps) => {
    const podiumClass =
        props.position <= 3 ? ` ${props.mainClass}__position--p${props.position}` : "";

    return (
        <span className={`${props.mainClass}__position${podiumClass}`}>
            P{props.position}
        </span>
    );
};

export default PositionBadge;
