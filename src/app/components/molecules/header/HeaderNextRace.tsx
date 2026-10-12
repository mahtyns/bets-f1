import { getNextRace } from "@/app/data/nextRace";
import Countdown from "../../atoms/Countdown";

const HeaderNextRace = async () => {
    const nextRace = await getNextRace();

    if (!nextRace) return null;

    return (
        <div className="next-race">
            <p>Next race:</p>
            <p className="next-race__name">{nextRace.circuit}</p>
            <p>Locks in: <span><Countdown targetDate={nextRace.start} /></span></p>
        </div>
    )
}

export default HeaderNextRace