"use client"
import { constants } from "@/app/content/constants";
import Button from "../../atoms/Button";
import RaceWeekGate from "../../layouts/RaceWeekGate";


export const HeaderButtons = () => {
    return (
        <>
            <RaceWeekGate
                open={<Button variant={constants.buttons.open.variant} text={constants.buttons.open.text} handleClick={() => window.location.href = "/prediction-hub"} />}
                idle={<Button variant={constants.buttons.idle.variant} text={constants.buttons.idle.text} handleClick={() => window.location.href = "/upcoming"} />}
                locked={<Button variant={constants.buttons.locked.variant} text={constants.buttons.locked.text} handleClick={() => window.location.href = "/prediction-hub"} />} />
        </>
    )
}
