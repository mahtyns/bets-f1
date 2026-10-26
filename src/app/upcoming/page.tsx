
import { Suspense } from "react";
import styles from "./../page.module.css";
import { UpcomingContent } from "../components/page-contents/UpcomingContent";

export default function UpcomingPage() {
    return (
        <div className={styles.page}>
            <main>
                <Suspense>
                    <UpcomingContent />
                </Suspense>
            </main>
        </div>
    );
}
