import React, { useEffect, useState } from "react";
import axios from "axios";
import "./TopFivePlayers.css";

// * TopFivePlayers component
export default function TopFivePlayers() {
    const [topPlayers, setTopPlayers] = useState([])

    // Get top 5 players from api endpoint
    useEffect(() => {
        axios.get('http://localhost:5005/api/public/getTopPlayers')
            .then(res => {
                setTopPlayers(res.data);
                // setTopPlayers5(res.data);
            })
            .catch(error => console.log(error))
    }, [TopFivePlayers])


    return (
        <table className="tableT">
            <thead className="table-headerT">
                <tr>
                    <th className="headerNamesT">Name</th>
                    <th className="headerInstituteT">Institute</th>
                    <th className="headerMatchesT">Matches won</th>
                    <th className="headerPointsT">Points</th>
                </tr>
            </thead>
            <tbody className="table-bodyT">
                {topPlayers.map((player, index) => (
                    <tr key={index} className="table-rowT">
                        <td className="dataNamesT">{player.firstname} {player.lastname}</td>
                        <td className="dataInstituteT">{player.institute}</td>
                        <td className="dataMatchesT">{player.matchesWon}</td>
                        <td className="dataPointsT">{player.points}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

