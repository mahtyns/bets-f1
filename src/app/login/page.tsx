import Login from "../components/layouts/Login";
import styles from "./../page.module.css";

export default async function LogInPage() {

    return (
        <div className={styles.page}>
            <main>
                <Login />
            </main>
        </div>
    );
}
