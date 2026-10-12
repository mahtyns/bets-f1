import type { DriverStanding } from "@/app/types/championship";
import Title from "../../atoms/Title";
import DriverRow from "../../molecules/driver-team-standings/DriverRow";

interface DriversChampionshipProps {
    mainClass: string;
    year: number;
    drivers: DriverStanding[];
}

const DriversChampionship = (props: DriversChampionshipProps) => {
    return (
        <div className={`${props.mainClass}__card`}>
            <header className={`${props.mainClass}__card-header`}>
                <Title isH1={false} title={`${props.year} FIA Driver World Championship`} />
                <p>Official standings</p>
            </header>
            <ul className={`${props.mainClass}__list`}>
                {props.drivers.map((driver) => (
                    <DriverRow key={driver.driverNumber} mainClass={props.mainClass} driver={driver} />
                ))}
            </ul>
        </div>
    )
}

export default DriversChampionship