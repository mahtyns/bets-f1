import styles from "./page.module.css";
import { Suspense } from "react";
import { HomeContent } from "./components/page-contents/HomeContent";

export default async function Home() {

  return (
    <div className={styles.page}>
      <main>
        <Suspense>
          <HomeContent />
        </Suspense>
      </main>
    </div>
  );
}