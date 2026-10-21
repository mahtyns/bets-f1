"use client";

import { useState } from "react";
import { HeaderMobile } from "../../organisms/HeaderMobile";
import { ButtonType } from "@/app/types/components";

interface HeaderMenuProps {
    buttonText: string,
    buttonVariant: ButtonType,
    totalPoints: number | null;
    rank: number | null;
}

export const HeaderMenu = (props: HeaderMenuProps) => {
    const [menuOpen, setMenuOpen] = useState<boolean>(false);


    return (
        <div className="header__menu">
            <button aria-label="open-menu" onClick={() => setMenuOpen(!menuOpen)}>
                <img src={"/icons/menu.png"} />
            </button>
            {menuOpen && <HeaderMobile setMenuOpen={setMenuOpen} buttonText={props.buttonText} buttonVariant={props.buttonVariant} totalPoints={props.totalPoints} rank={props.rank} />}
        </div>
    );
};