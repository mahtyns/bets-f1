import type { UserRaceResult } from "@/app/data/user-results";

interface UserRaceResultCardProps {
    mainClass: string;
    result: UserRaceResult;
}

const NONE = "-";

const UserRaceResultCard = (props: UserRaceResultCardProps) => {
    const { mainClass, result } = props;

    return (
        <article className={`${mainClass}__race`}>
            <header className={`${mainClass}__race-header`}>
                <h3>{`Round ${result.round} · ${result.name}`}</h3>
                <p>{`${result.totalPoints} pts`}</p>
            </header>
            {result.categories.map((category) => {
                const hasLabel = category.rows.some((row) => row.label !== "");

                return (
                    <div key={category.title} className={`${mainClass}__category`}>
                        <div className={`${mainClass}__category-header`}>
                            <p>{category.title}</p>
                            <p>{`${category.points} pts`}</p>
                        </div>
                        <table className={`${mainClass}__table`}>
                            <colgroup>
                                <col className={`${mainClass}__col-label`} />
                                <col />
                                <col />
                                <col className={`${mainClass}__col-points`} />
                            </colgroup>
                            <thead>
                                <tr>
                                    {hasLabel && <th className="table-th-label">#</th>}
                                    <th className="table-th-pick" colSpan={hasLabel ? 1 : 2}>Your pick</th>
                                    <th className="table-th-official">Official</th>
                                    {hasLabel && <th className="table-th-points">Pts</th>}
                                </tr>
                            </thead>
                            <tbody>
                                {category.rows.map((row, index) => (
                                    <tr
                                        key={`${category.title}-${index}`}
                                        className={row.pick !== NONE && row.pick === row.official ? `${mainClass}__row--match` : undefined}
                                    >
                                        {hasLabel && <td className="table-label">{row.label}</td>}
                                        <td className="table-pick" colSpan={hasLabel ? 1 : 2}>{row.pick}</td>
                                        <td className="table-official">{row.official}</td>
                                        {hasLabel && <td className="table-points">{row.points ?? ""}</td>}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                );
            })}
        </article>
    );
};

export default UserRaceResultCard;