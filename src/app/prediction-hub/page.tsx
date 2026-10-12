
import next from "next/dist/types";
import { SecondaryPageHeading } from "../components/layouts/SecondaryPageHeading";
import { CHAMPIONSHIP_YEAR } from "../content/helperValues";
import { predictionHubContent } from "../content/prediction-hub";
import { getNextRace } from "../data/nextRace";
import { getTrackInformation } from "../data/trackInformation";
import styles from "./../page.module.css";


export default async function Home() {

    const nextRace = await getNextRace();
    const track = nextRace ? await getTrackInformation(nextRace.circuitKey) : null;

    const pageFullTitle = CHAMPIONSHIP_YEAR + ' ' + track?.name + ' ' + predictionHubContent.mainTitle

    return (
        <div className={styles.page}>
            <main>
                <SecondaryPageHeading titleText={pageFullTitle} roundNumber={nextRace!.round} trackName={track!.meetingShort} trackType={track!.type} flag={track!.flag} />
            </main>
        </div>
    );
}
