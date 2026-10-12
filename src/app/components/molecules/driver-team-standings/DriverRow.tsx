import type { CSSProperties } from "react";
import type { DriverStanding } from "@/app/types/championship";

interface DriverRowProps {
    mainClass: string;
    driver: DriverStanding;
}

const DriverRow = (props: DriverRowProps) => {
    const { driver } = props;
    const style = { "--team-colour": `#${driver.teamColour}` } as CSSProperties;

    return (
        <li className={`${props.mainClass}__driver-row`} style={style}>
            <span className={`${props.mainClass}__position`}>P{driver.position}</span>
            <span className={`${props.mainClass}__colour-bar`} />
            <div className={`${props.mainClass}__driver-info`}>
                <p>{driver.name}</p>
                <p>{driver.team} • #{driver.driverNumber}</p>
            </div>
            <div className={`${props.mainClass}__driver-points`}>
                <p>{driver.points} <span>PTS</span></p>
                {driver.deltaToLeader !== 0 && <p>{driver.deltaToLeader} PTS</p>}
            </div>
        </li>
    )
}

export default DriverRow