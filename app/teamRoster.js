"use client";
import React, { useEffect, useState } from "react";
import TeamData from "./teamData";


//This function will retrieve the team data from the TeamData file and then I used that information
//to create a dropdown menu that will allow the user to select a team and then display the players
//from that team. I also added a sort by age and sort by position button that will sort the players.

export default function TeamRoster() {
    const [teams, setTeams] = useState({});
    const [selectedTeam, setSelectedTeam] = useState(null);
    const [sortedPlayers, setSortedPlayers] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch team data when the component mounts
    useEffect(() => {
        async function fetchData() {
            setLoading(true);
        try {
            
            const data = await TeamData();
            if (data) {
                setTeams(data);
            } else {
                console.error("TeamData returned undefined");
            }
            console.log("Fetched data:", data); // Log the data to debug
        } catch (error) {
            console.error("Error fetching data:", error);
        }
        setLoading(false);
        }
        fetchData();
    }, []);

    // Handle team selection
    const handleTeamSelect = (teamName) => {
        setSelectedTeam(teamName);
        setSortedPlayers(teams[teamName]?.players || []); // Initialize sorted players
    };
    //  Sort players by age
    const sortByAge = () => {
        const sorted = [...sortedPlayers].sort((a, b) => (a.age || 0) - (b.age || 0));
        setSortedPlayers(sorted);
    };
    // Sort players by position
    const sortByPosition = () => {
        const sorted = [...sortedPlayers].sort((a, b) => a.position.localeCompare(b.position));
        setSortedPlayers(sorted);
    };

    // Styles - I got used to doing styles this way instead of adding the inline styling with tailwind css
    const containerStyle = {
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        minHeight: "100vh",
    };

    const headerStyle = {
        textAlign: "center",
        color: "#16a34a",
        fontSize: "24px",
        fontWeight : "bold",
    };

    const selectStyle = {
        display: "block",
        width: "100%",
        padding: "10px",
        margin: "20px 0",
        fontSize: "16px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        color: "#333",
    };

    const rosterContainerStyle = {
        backgroundColor: "#f9f9f9",
        border: "1px solid #ddd",
        borderRadius: "5px",
        padding: "20px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        color: "#333",
    };

    const playerCardStyle = {
        padding: "10px",
        border: "1px solid #ddd",
        borderRadius: "5px",

    };

    const playerNameStyle = {
        fontSize: "18px",
        fontWeight: "bold",
        marginBottom: "5px",
        color: "#333",
    };

    const playerInfoStyle = {
        margin: "5px 0",
        color: "#555",
    };

    const buttonStyle = {
        padding: "10px 20px",
        margin: "10px 5px",
        fontSize: "16px",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        backgroundColor: "#15803d",
        color: "#fff",
    };
    const gridStyle = {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", 
        gap: "10px",
        padding: "10px",
        color: "#333",
    };

    const h2Style = {
        fontSize: "32px",
        fontWeight: "bold",
        color: "#333",
        textAlign: "center",
    };
    const loadingStyle = {
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        height: "100vh", 
        textAlign: "center", 
        fontSize: "18px", 
        color: "#16a34a" ,
        fontSize: "32px",
        fontWeight: "bold",
    };
    return (
        <div style={containerStyle}> 
        {/* This is the main container for the page
            Here is where the main content will be displayed showing a dropdown menu to select a team
            and then displaying the players from that team. */}
            <h1 style={headerStyle}>Welcome to the NFL Roster Website!</h1>
            
            {loading ? (
                // Show a loading message while fetching data
                <p style={loadingStyle}>
                    Loading Roster Data...
                </p>
            ) : (
                <div>
                    <p style={{ textAlign: "center" }}> Select a team to view their roster.</p>
                    <label htmlFor="team-select">Select a Team: </label>
                    <select
                        id="team-select"
                        onChange={(e) => handleTeamSelect(e.target.value)}
                        value={selectedTeam || ""}
                        style={selectStyle}>
                        <option value="" disabled>Select a team</option>
                        {/* Create an option for each team*/}
                        {Object.keys(teams).map((teamName) => (
                            <option key={teamName} value={teamName}>
                                {teamName}
                            </option>
                        ))}
                    </select>
    
                    {/*Once a team is selected, it will display the players that play for the selected team,
                    and also allow the user to sort the results by the teams age or their position*/}
                    {selectedTeam && (
                        <div style={rosterContainerStyle}>
                            <h2 style={h2Style} >{selectedTeam}</h2>
                            <div>
                                <button style={buttonStyle} onClick={sortByAge}>
                                    Sort by Age
                                </button>
                                <button style={buttonStyle} onClick={sortByPosition}>
                                    Sort by Position
                                </button>
                            </div>
                            <div style={gridStyle}>
                                {sortedPlayers.map((player) => (
                                    <div key={player.id} style={playerCardStyle}>
                                        <h3 style={playerNameStyle}>
                                            {player.first_name} {player.last_name}
                                        </h3>
                                        <p style={playerInfoStyle}>Position: {player.position || "N/A"}</p>
                                        <p style={playerInfoStyle}>Age: {player.age || "N/A"}</p>
                                        <p style={playerInfoStyle}>Number: {player.jersey_number || "N/A"}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
