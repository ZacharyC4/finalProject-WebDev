import { BalldontlieAPI } from "@balldontlie/sdk";

// This function fetches active player data from the BallDontLie API and groups them by team.
// I had to get help from ChatGPT with troubleshooting the code and understanding the API
// More specifically the cursor and fetching all of the data from the API.
export default async function TeamData() {
    const api = new BalldontlieAPI({ apiKey: "452accf1-0923-44b3-b149-c8ff2e3b5895" });
    const teams = {};
    let cursor = 0; 

    try {
        while (true) {
            const activePlayers = await api.nfl.getActivePlayers({ per_page: 100, cursor });
            if (!activePlayers || !activePlayers.data || activePlayers.data.length === 0) {
                break;
            }
            console.log("Fetched players:", activePlayers.data);

            // Group players by team.
            activePlayers.data.forEach(player => {
                const teamName = player.team.full_name;
                if (!teams[teamName]) {
                    teams[teamName] = {
                        team: player.team,
                        players: [],
                    };
                }
                teams[teamName].players.push(player);
            });

            // Update the cursor for the next page.
            if (!activePlayers.meta.next_cursor) {
                break;
            }
            cursor = activePlayers.meta.next_cursor;
        }
        console.log("Grouped Teams Data:", teams);
        return teams;

    } catch (error) {
        console.error("Error fetching active player data:", error);
        return {};
    }
}
