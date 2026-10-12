export interface DriverStanding {
    position: number;
    driverNumber: number;
    name: string;
    team: string;
    teamColour: string;
    points: number;
    deltaToLeader: number;
}

export interface TeamStanding {
    position: number;
    name: string;
    teamColour: string;
    points: number;
    progress: number;
}

export interface ChampionshipStandings {
    year: number;
    drivers: DriverStanding[];
    teams: TeamStanding[];
}