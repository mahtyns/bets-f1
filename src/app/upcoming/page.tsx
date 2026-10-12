
import { CalendarPageHeading } from "../components/layouts/CalendarPageHeading";
import { NextRace } from "../components/layouts/NextRaceCard";
import styles from "./../page.module.css";

export default function Home() {
    return (
        <div className={styles.page}>
            <main>
                <CalendarPageHeading />
                <NextRace />
            </main>
        </div>
    );
}
