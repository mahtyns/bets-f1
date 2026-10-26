import { Suspense } from "react";
import { PredictionHubContent } from "../components/page-contents/PredictionHubContent";

export default async function PredictionHubPage() {

    return (
        <main className="predictions">
            <Suspense>
                <PredictionHubContent />
            </Suspense>
        </main>
    );
}
