import { constants } from "../../content/constants"
import Button from "../atoms/Button";
import HeaderLinks from "../molecules/header/HeaderLinks";
import HeaderNextRace from "../molecules/header/HeaderNextRace";
import HeaderPoints from "../molecules/header/HeaderPoints";
import { getNextRace } from "@/app/data/next-race";
import RaceWeekGate from "../layouts/RaceWeekGate";
import HeaderNextRaceOpen from "../molecules/header/HeaderNextRaceOpen";
import HeaderNextRaceLocked from "../molecules/header/HeaderNextRaceLocked";
import AuthGate from "../layouts/AuthGate";
import PlayerCellLogin from "../molecules/PlayerCellLogin";
import { Logout } from "../atoms/Logout";
import PlayerCellLogged from "../molecules/PlayerCellLogged";
import { getStandings } from "@/app/data/standings";
import { getSessionUserId } from "@/app/lib/session";
import { HeaderMenu } from "../molecules/header/HeaderMenu";
import { HeaderButtons } from "../molecules/header/HeaderButtons";
import HeaderLogo from "../atoms/HeaderLogo";

const Header = async () => {
    const [userId] = await Promise.all([
        getNextRace(),
        getStandings(),
        getSessionUserId(),
    ]);
    const standings = userId ? await getStandings() : [];
    const me = standings.find((standing) => standing.userId === String(userId));

    return (
        <div className="header">
            <div className="header__logo">
                <HeaderLogo />
            </div>
            <HeaderButtons />
            <RaceWeekGate
                open={<HeaderNextRaceOpen text="Pools open" opens="Closing in" />}
                locked={<HeaderNextRaceLocked text="Pools are locked" />}
                idle={
                    <HeaderNextRace
                        text={constants.header.nextRace.text}
                        opens={constants.header.nextRace.opens}
                    />
                }
            />

            <HeaderLinks />
            <AuthGate
                loggedIn={<div className="header__user-info">
                    <HeaderPoints points={me?.totalPoints ?? null} rank={me?.rank ?? null} />
                    <PlayerCellLogged mainClass={"header"} />
                    <Logout />
                </div>}
                loggedOut={<PlayerCellLogin mainClass={"header"} />}
            />
            <HeaderMenu buttonText={constants.buttons.mobileMenu.text} buttonVariant={constants.buttons.mobileMenu.variant} totalPoints={me?.totalPoints ?? null} rank={me?.rank ?? null} />
        </div>
    )
}

export default Header