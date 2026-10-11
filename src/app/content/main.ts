import { constants } from "./constants";

export const mainPageContent = {
    navbar: {
        logo: constants.logo,
        links: [
            {
                linkName: "Standings",
                linkUrl: "/"
            },
            {
                linkName: "Calendar",
                linkUrl: "/upcoming"
            },
            {
                linkName: "Prediction Hub",
                linkUrl: "/prediction-hub"
            },
        ]
    },
    mainStandings: {
        title: "The Paddock Crew 🏆",
        p1: {
            name: "Championship leader",
            label: "P1"
        },
        p2: {
            name: "Runner Up",
            label: "P2"
        },
        p3: {
            name: "P3 Yeah?",
            label: "P3"
        }
    }
}