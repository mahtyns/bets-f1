import Title from "../../atoms/Title";
import UserRaceResultCard from "../../molecules/user-page/UserRaceResultCard";
import { getSessionUserId } from "@/app/lib/session";
import { getUserResults } from "@/app/data/user-results";

export const UserPageStats = async () => {
    const mainClass = "user-results";
    const userId = await getSessionUserId();
    const results = userId ? await getUserResults(userId) : [];

    return (
        <section id="user-results" className={mainClass}>
            <Title isH1={false} title="Your latest results" />
            {results.length > 0 ? (
                results.map((result) => (
                    <UserRaceResultCard key={result.raceId} mainClass={mainClass} result={result} />
                ))
            ) : (
                <p>No scored races yet.</p>
            )}
        </section>
    );
};