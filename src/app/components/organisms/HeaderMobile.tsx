import { constants } from "@/app/content/constants";
import AuthGate from "../layouts/AuthGate";
import PlayerCellLogged from "../molecules/PlayerCellLogged";
import PlayerCellLogin from "../molecules/PlayerCellLogin";
import { mainPageContent } from "@/app/content/main";

interface HeaderMobileProps {
    setMenuOpen: (arg0: boolean) => void
}

export const HeaderMobile = (props: HeaderMobileProps) => {
    const mainClass = "header__mobile"
    return (
        <div className={mainClass}>
            <AuthGate
                loggedIn={<PlayerCellLogged mainClass={mainClass} />}
                loggedOut={<PlayerCellLogin mainClass={mainClass} />} />
            <ul className={`${mainClass}__links`}>
                {
                    mainPageContent.navbar.links.map(link => <li key={'mobile-' + link.linkName} className={`${mainClass}__link`}><a href={link.linkUrl}>{link.linkName}</a></li>)
                }
            </ul>
            <button className="close-button" onClick={() => props.setMenuOpen(false)}>X</button>
        </div>
    )
}
