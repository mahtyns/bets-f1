import { constants } from "../../content/constants"
import Link from "../atoms/Link";

const Footer = () => {
    const mainClass = "footer"

    return (
        <div className={mainClass}>
            <div className={`${mainClass}__logo`}>
                <img src={constants.logo} alt="Rosario Racing Footer Logo" /><span> | {constants.footer.text}</span>
            </div>
            <div className={`${mainClass}__links`}>
                {
                    constants.footer.links.map((link, i) => <Link key={link.name + i} linkName={link.name} linkUrl={link.link} external={false} />)
                }
            </div>
            <div className={`${mainClass}__copyright`}>
                {
                    constants.footer.year + constants.footer.copyright
                }
            </div>
        </div>
    )
}

export default Footer