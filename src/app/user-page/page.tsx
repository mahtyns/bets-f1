import AuthGate from "../components/layouts/AuthGate";
import Login from "../components/layouts/Login";
import { UserPageHeading } from "../components/layouts/user-page/UserPageHeading";
import { UserPageStats } from "../components/layouts/user-page/UserPageStats";
import { UserPageUpdating } from "../components/layouts/user-page/UserPageUpdating";
import styles from "./../page.module.css";

export default async function LogInPage() {

    return (
        <div className={styles.page}>
            <main className="user-page">
                <AuthGate
                    loggedIn={<>
                        <UserPageHeading />
                        <UserPageStats />
                        <UserPageUpdating />
                    </>}
                    loggedOut={<Login />}
                />
            </main>
        </div>
    );
}
