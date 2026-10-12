import { constants } from "../../content/constants"
import Button from "../atoms/Button";
import HeaderLinks from "../molecules/header/HeaderLinks";
import HeaderNextRace from "../molecules/header/HeaderNextRace";
import HeaderPoints from "../molecules/header/HeaderPoints";
import PlayerCell from "../molecules/PlayerCell";

import { mockStandings } from "@/app/data/mockStandings";

const Header = () => {
    return (
        <div className="header">
            <div className="header__logo">
                <img src={constants.logo} alt="RosarioBETS F1 Betting Page Logo" />
            </div>
            <Button variant="secondary" text="Place Bets" />
            <HeaderNextRace />
            <HeaderLinks />
            <div className="header__user-info">
                <HeaderPoints />
                <PlayerCell mainClass={"header"}
                    name={mockStandings[0].name}
                    team={mockStandings[0].team}
                    avatarId={mockStandings[0].avatarId}
                    isMe={true} />
            </div>
        </div>
    )
}

export default Header