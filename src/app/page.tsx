import { DriverTeamStandings } from "./components/layouts/DriverTeamStandings";
import GeneralStandings from "./components/layouts/GeneralStandings";
import { StandingsDetailed } from "./components/layouts/StandingsDetailed";
import styles from "./page.module.css";
import { getStandings } from "./data/standings";
import { getCurrentUser } from "./lib/getCurrentUser";

export default async function Home() {
  const [standings, user] = await Promise.all([getStandings(), getCurrentUser()]);
  const currentUserId = user ? String(user.id) : "";

  return (
    <div className={styles.page}>
      <main>
        <GeneralStandings standings={standings} currentUserId={currentUserId} />
        <StandingsDetailed standings={standings} currentUserId={currentUserId} />
        <DriverTeamStandings />
      </main>
    </div>
  );
}