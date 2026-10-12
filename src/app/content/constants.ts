const year = new Date().getFullYear();

export const constants = {
    siteName: "Rosario Bets",
    logo: "/_logo.png",
    season: "Season 2027",
    header: {
        nextRace: {
            text: "Next race: ",
            opens: "Bets open in"
        }
    },
    footer: {
        links: [
            {
                name: "Upcoming races",
                link: "/upcoming"
            },
            {
                name: "Scoring rules",
                link: "/rules"
            },
            {
                name: "Pit crew support",
                link: "mailto:martyna.smolarek19@gmail.com"
            }
        ],
        copyright: " © Rosario Racing F1 Bets. Page created by Rosario. All rights reserved.",
        text: "F1 Social Prediction League",
        year: year
    },
    buttons: {
        open: {
            text: "Place bet",
            variant: "primary" as const
        },
        closed: {
            text: "Bets closed",
            variant: "secondary" as const
        }
    }
}

export const icons = {
    trophy: "/icons/trophy.png"
}