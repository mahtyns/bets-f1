import GeneralStandings from "./components/layouts/GeneralStandings";
import { StandingsDetailed } from "./components/layouts/StandingsDetailed";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main>
        <GeneralStandings />
        <StandingsDetailed />
      </main>
    </div>
  );
}
