
import { CalendarPageHeading } from "../components/layouts/CalendarPageHeading";
import styles from "./../page.module.css";

export default function Home() {
    return (
        <div className={styles.page}>
            <main>
                <CalendarPageHeading />
            </main>
        </div>
    );
}
