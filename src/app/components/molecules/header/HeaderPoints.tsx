interface HeaderPointsProps {
    points: number | null;
    rank: number | null;
}

const HeaderPoints = (props: HeaderPointsProps) => {
    return (
        <div className="header__user-info__points">
            <p>Your points: {props.points ?? "-"}</p>
            <p>Rank: {props.rank !== null ? `P${props.rank}` : "-"}</p>
        </div>
    )
}

export default HeaderPoints