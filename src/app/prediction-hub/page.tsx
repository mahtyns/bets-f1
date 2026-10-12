
import { SecondaryPageHeading } from "../components/layouts/SecondaryPageHeading";
import styles from "./../page.module.css";
export default function Home() {

    return (
        <div className={styles.page}>
            <main>
                <SecondaryPageHeading />
            </main>
        </div>
    );
}
