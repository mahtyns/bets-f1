import PlayerCell from "../../molecules/PlayerCell";
import FormStrip from "../../molecules/detailed-standings/FormStrip";
import type { Standing } from "@/app/types/standings";

type Trend = Standing["trend"];

interface DetailedTableStandingsProps {
  standings: Standing[];
  currentUserId: string;
  mainClass: string
}
const columns: { label: string }[] = [
  { label: "Rank" },
  { label: "Driver" },
  { label: "Total pts" },
  { label: "Last GP" },
  { label: "Poles" },
  { label: "Podiums" },
  { label: "Win rate" },
  { label: "Form (last 4)" },
];

const trendSymbol: Record<Trend, string> = { up: "▲", down: "▼", same: "—" };
const trendLabel: Record<Trend, string> = {
  up: "Moved up",
  down: "Moved down",
  same: "No change",
};

const DetailedTableStandings = ({
  standings,
  currentUserId,
  mainClass
}: DetailedTableStandingsProps) => {
  return (
    <table className={`${mainClass}__table`}>
      <thead className={`${mainClass}__head`}>
        <tr>
          {columns.map((col) => (
            <th
              key={col.label}
              scope="col"
              className={`${mainClass}__th`}
            >
              {col.label}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {standings.map((s) => {
          const isMe = s.userId === currentUserId;

          return (
            <tr
              key={s.userId}
              className={`${mainClass}__row ${isMe ? `${mainClass}__row--me` : ""}`}
            >
              <td className={`${mainClass}__td ${mainClass}__rank`}>
                {String(s.rank).padStart(2, "0")}{" "}
                <span
                  role="img"
                  aria-label={trendLabel[s.trend]}
                  className={`${mainClass}__trend ${mainClass}__trend--${s.trend}`}
                >
                  {trendSymbol[s.trend]}
                </span>
              </td>

              <td className={`${mainClass}__td`}>
                <PlayerCell
                  mainClass={mainClass}
                  name={s.name}
                  team={s.team}
                  avatarId={s.avatarId}
                  isMe={isMe}
                />
              </td>

              <td className={`${mainClass}__td ${mainClass}__points`}>
                {s.totalPoints.toLocaleString("en-US")}
              </td>
              <td className={`${mainClass}__td ${mainClass}__gain`}>
                +{s.lastGpPoints}
              </td>
              <td className={`${mainClass}__td`}>
                {s.poles} / {s.races}
              </td>
              <td className={`${mainClass}__td`}>
                {s.podiums} / {s.races}
              </td>
              <td className={`${mainClass}__td`}>
                {s.winRate.toFixed(1)}%
              </td>

              <td className={`${mainClass}__td`}>
                <FormStrip mainClass={mainClass} results={s.form} />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default DetailedTableStandings;