
import { CalendarPageHeading } from "../components/layouts/CalendarPageHeading";
import { NextRace } from "../components/layouts/NextRaceCard";
import { UpcomingRounds } from "../components/layouts/UpcomingRounds";
import styles from "./../page.module.css";

export default function Home() {
    return (
        <div className={styles.page}>
            <main>
                <CalendarPageHeading />
                <NextRace />
                <UpcomingRounds />
            </main>
        </div>
    );
}
