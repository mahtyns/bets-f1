"use client"
import { constants } from '@/app/content/constants';

const HeaderLogo = () => {
    return (
        <button onClick={() => window.location.href = "/"}>
            <img src={constants.logo} alt="RosarioBETS F1 Betting Page Logo" />
        </button>
    )
}


export default HeaderLogo