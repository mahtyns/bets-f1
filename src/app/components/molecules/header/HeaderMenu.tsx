"use client";

import { useState } from "react";
import { HeaderMobile } from "../../organisms/HeaderMobile";

export const HeaderMenu = () => {
    const [menuOpen, setMenuOpen] = useState<boolean>(false);


    return (
        <div className="header__menu">
            <button aria-label="open-menu" onClick={() => setMenuOpen(!menuOpen)}>
                <img src={"/icons/menu.png"} />
            </button>
            {menuOpen && <HeaderMobile setMenuOpen={setMenuOpen} />}
        </div>
    );
};