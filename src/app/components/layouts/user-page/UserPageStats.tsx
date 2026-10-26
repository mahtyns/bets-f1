import { getSessionUserId } from "@/app/lib/session";
import { getUserResults } from "@/app/data/user-results";
import { UserResultsView } from "./UserResultsView";

export const UserPageStats = async () => {
    const mainClass = "user-results";
    const userId = await getSessionUserId();
    const results = userId ? await getUserResults(userId) : [];

    return (
        <section id="user-results" className={mainClass}>
            <UserResultsView mainClass={mainClass} results={results} />
        </section>
    );
};