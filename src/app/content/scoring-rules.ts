export const scoringRules = {
    pageTitle: "Scoring rules",
    pageDescription: "Check here how the scoring works: betting, points, results.",
    paragraphs: [
        {
            paragraphTitle: "General information",
            paragraphText: "Players place bets for each race. The pools open on Monday of the Week Race, and lock when the first practice starts. The results for each round are calculated when the race closes, except for the Driver of the Day that is added a little bit later. To place a bet, a player must go to the /prediction-hub page when the pools are open, then play the desired categories by either choosing the drivers and dragging and dropping them on the prediction position, or selecting an option from ones presented. After placing the bets, the chosen options will be shown on the slip on the right side of the page. The player must click on Confirm button to save bets."
        },
        {
            paragraphTitle: "Qualifying, Races, Sprints",
            paragraphText: "After assining the driver and their position, the points are scored in three ways: same driver in that exact position → 5, otherwise, the predicted driver's teammate is the actual driver in that position → 3, otherwise, the predicted driver finished somewhere else in the real top 10 → 1, otherwise 0 points. Only the best match counts per position, never added together.",
        },
        {
            paragraphTitle: "Weekend Specials",
            paragraphText: "Weekend special scores include: the driver of the day, fastest lap's driver and safety car appearance (VSC is not included). Driver of the day: Choose the desired driver from the possible options, if it matches the actual one, you get 3 points. Fastest lap: Choose the desired driver from the possible options, if it matches the actual one, you get 3 points. Safety car appearance: Choose from the options - 0 (safety car will not appear during the race), 1-2 (safety car will be out 1 or 2 times), 3+ (safety car will be out 3 or more times). If the number matches the actual one, you get 2 points."
        },
        {
            paragraphTitle: "Scoring",
            paragraphText: "After the race the points from all the categories where bet was placed will be summed up and the results will appear in the main page in the standings sections. The winner of the round is the player with most points and will appear with 'W' in the form column in detailed standings. Players on the podium are the players with position 1, 2 and 3 and will appear with 'P' in the form column in detailed standings. The rest of the results will be shown as 'L' in the detailed standings. The winner of the season will be the person with most points from all of the rounds."
        }
    ]
}

// same driver in that exact position → 5
// otherwise, the predicted driver’s teammate is the actual driver in that position → 3
// otherwise, the predicted driver finished somewhere else in the real top 10 → 1
// otherwise 0
// Only the best match counts per position, never added together.