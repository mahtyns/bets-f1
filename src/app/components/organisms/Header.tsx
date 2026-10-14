import { constants } from "../../content/constants"
import Button from "../atoms/Button";
import HeaderLinks from "../molecules/header/HeaderLinks";
import HeaderNextRace from "../molecules/header/HeaderNextRace";
import HeaderPoints from "../molecules/header/HeaderPoints";
import PlayerCell from "../molecules/PlayerCell";
import { getNextRace } from "@/app/data/nextRace";
import { getBetsOpen } from "@/app/data/betsStatus";

import { mockStandings } from "@/app/data/mockStandings";
import RaceWeekGate from "../layouts/RaceWeekGate";
import HeaderNextRaceOpen from "../molecules/header/HeaderNextRaceOpen";
import HeaderNextRaceLocked from "../molecules/header/HeaderNextRaceLocked";

const Header = async () => {
    const nextRace = await getNextRace();
    const isOpen = nextRace ? getBetsOpen(nextRace, Date.now()) : false;
    const button = isOpen ? constants.buttons.open : constants.buttons.closed;

    return (
        <div className="header">
            <div className="header__logo">
                <img src={constants.logo} alt="RosarioBETS F1 Betting Page Logo" />
            </div>
            <Button variant={button.variant} text={button.text} />
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
            <div className="header__user-info">
                <HeaderPoints />
                <PlayerCell
                    mainClass={"header"}
                    name={mockStandings[0].name}
                    team={mockStandings[0].team}
                    avatarId={mockStandings[0].avatarId}
                    isMe={true}
                />
            </div>
        </div>
    )
}

export default Header

// <HeaderNextRace
//     text={constants.header.nextRace.text}
//     opens={constants.header.nextRace.opens}
// />