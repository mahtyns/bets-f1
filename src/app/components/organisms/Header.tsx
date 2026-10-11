import { constants } from "../../content/constants"

const Header = () => {
    return (
        <div className="header">
            <div className="header__logo">
                <img src={constants.logo} alt="RosarioBETS F1 Betting Page Logo" />
            </div>
        </div>
    )
}

export default Header