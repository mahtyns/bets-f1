import { constants } from "../../content/constants"

const Footer = () => {
    return (
        <div className="footer">
            <div className="footer__logo">
                <img src={constants.logo} /><span> | {constants.footer.text}</span>
            </div>
        </div>
    )
}

export default Footer