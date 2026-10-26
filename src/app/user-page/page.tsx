import { Suspense } from "react";
import { UserPageContent } from "../components/page-contents/UserPageContent";
import styles from "./../page.module.css";

export default async function LogInPage() {

    return (
        <div className={styles.page}>
            <main className="user-page">
                <Suspense>
                    <UserPageContent />
                </Suspense>
            </main>
        </div>
    );
}
