import { constants } from "@/app/content/constants";
import AuthGate from "../layouts/AuthGate";
import PlayerCellLogged from "../molecules/PlayerCellLogged";
import PlayerCellLogin from "../molecules/PlayerCellLogin";
import { mainPageContent } from "@/app/content/main";
import { Logout } from "../atoms/Logout";
import Button from "../atoms/Button";
import { ButtonType } from "@/app/types/components";
import HeaderPoints from "../molecules/header/HeaderPoints";
import Login from "../layouts/Login";

interface HeaderMobileProps {
    setMenuOpen: (arg0: boolean) => void;
    buttonText: string,
    buttonVariant: ButtonType;
    totalPoints: number | null;
    rank: number | null
}

export const HeaderMobile = (props: HeaderMobileProps) => {
    const mainClass = "header__mobile"
    return (
        <div className={mainClass}>
            <AuthGate
                loggedIn={<><PlayerCellLogged mainClass={mainClass} /><HeaderPoints points={props.totalPoints} rank={props.rank} /></>}
                loggedOut={<PlayerCellLogin mainClass={mainClass} />} />

            <Button variant={props.buttonVariant} text={props.buttonText} handleClick={() => window.location.href = '/prediction-hub'} />
            <ul className={`${mainClass}__links`}>
                {
                    mainPageContent.navbar.links.map(link => <li key={'mobile-' + link.linkName} className={`${mainClass}__link`}><a href={link.linkUrl}>{link.linkName}</a></li>)
                }
            </ul>
            <button className="close-button" onClick={() => props.setMenuOpen(false)}>X</button>
            <AuthGate
                loggedIn={<Logout />}
                loggedOut={<a className="header__mobile__login-link" href="/login">Log in here</a>} />
        </div>
    )
}
