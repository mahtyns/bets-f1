import { getChampionshipStandings } from "@/app/data/championship";
import DriversChampionship from "../organisms/driver-team-standings/DriverChampionship";
import TeamsChampionship from "../organisms/driver-team-standings/TeamChampionship";


const DRIVERS_SHOWN = 5;
const TEAMS_SHOWN = 4;

export const DriverTeamStandings = async () => {

    const mainClass = "driver-team-standings"
    const standings = await getChampionshipStandings();

    return (
        <section id="driver-team-standings" className={mainClass}>
            {standings ? (
                <>
                    <DriversChampionship
                        mainClass={mainClass}
                        year={standings.year}
                        drivers={standings.drivers.slice(0, DRIVERS_SHOWN)}
                    />
                    <TeamsChampionship
                        mainClass={mainClass}
                        year={standings.year}
                        teams={standings.teams.slice(0, TEAMS_SHOWN)}
                    />
                </>
            ) : (
                <p>Championship standings are not available yet.</p>
            )}
        </section>
    )
}