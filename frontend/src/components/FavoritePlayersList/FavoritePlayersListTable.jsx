import "./FavoritePlayersListTable.css";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { TechnologyContext } from "../../providers/TechnologyProvider";
import jwt_decode from "jwt-decode";

// * FavoritePlayerListTable component
export default function FavoritePlayerListTable() {
    const { loggedIn, accessToken } = useContext(TechnologyContext);
    const [players, setPlayers] = useState([]);

    // Decode token
    const decodeToken = jwt_decode(accessToken);
    // Save the id from the logged in player in token
    const id = decodeToken.id;

    // Get the favorite players from the logged in user
    useEffect(() => {
        if (!loggedIn) {
            return;
        }
        axios
            .get(`http://localhost:5005/api/players/getFavoritePlayers/${id}`, {
                headers: { authToken: `Bearer ${accessToken}` },
            })
            .then((res) => {
                if (res.data.favorites) {
                    setPlayers(res.data.favorites);
                }
            })
            .catch((error) => console.log(error));
    }, [loggedIn]);

    // Remove favorite player functionality
    const handleRemoveFavorite = (removePlayerId) => {
        // Confirm message if you want to remove player 
        const confirms = confirm("Are you sure you want to remove this player from favorites?");

        // If user confirms then remove player and update the players state to update list
        if (confirms) {
            console.log("Sending removeFavorite request...");
            axios.patch(`http://localhost:5005/api/players/removeFavoritePlayer/${id}`,
                { id, removePlayerId },
                { headers: { authToken: `Bearer ${accessToken}` } }
            )
                .then((res) => {
                    // Remove the player from the state
                    setPlayers((prevPlayers) =>
                        prevPlayers.filter((player) => player._id !== removePlayerId)
                    );
                })
                .catch((error) => console.log(error));
        }
    };

    if (!loggedIn) {
        return null;
    }

    return (
        <div className="table-scrollF">
            <table>
                <thead className="table-headerF">
                    <tr>
                        <th className="headerNamesF">Name</th>
                        <th className="headerInstituteF">Institute</th>
                        <th className="headerMatchesF">Matches won</th>
                        <th className="headerPointsF">Points</th>
                        <th className="headerFavoriteF">Favorite</th>
                    </tr>
                </thead>
                <tbody className="table-bodyF">
                    {players.length === 0 ? (
                        <tr>
                            <td className="noPlayersYet" colSpan="5">No favorite players yet.</td>
                        </tr>
                    ) : (
                        players.map((player, index) => (
                            <tr key={index} className="table-rowF">
                                <td className="dataNamesF">{player.firstname} {player.lastname}</td>
                                <td className="dataInstituteF">{player.institute}</td>
                                <td className="dataMatchesF">{player.matchesWon}</td>
                                <td className="dataPointsF">{player.points}</td>
                                <td className="dataFavoriteF">
                                    <button className="remove-favorite-button" onClick={() => handleRemoveFavorite(player._id)}>
                                        <svg
                                            className="is-favorite"
                                            width="20"
                                            height="20"
                                            viewBox="0 0 12 11"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M10.6456 1.80591C10.3903 1.55041 10.0871 1.34774 9.75332 1.20945C9.41959 1.07117 9.06189 1 8.70065 1C8.3394 1 7.9817 1.07117 7.64797 1.20945C7.31424 1.34774 7.01102 1.55041 6.75565 1.80591L6.22565 2.33591L5.69565 1.80591C5.1798 1.29007 4.48016 1.00027 3.75065 1.00027C3.02113 1.00027 2.32149 1.29007 1.80565 1.80591C1.2898 2.32176 1 3.0214 1 3.75091C1 4.48043 1.2898 5.18007 1.80565 5.69591L2.33565 6.22591L6.22565 10.1159L10.1156 6.22591L10.6456 5.69591C10.9011 5.44054 11.1038 5.13732 11.2421 4.80359C11.3804 4.46986 11.4516 4.11216 11.4516 3.75091C11.4516 3.38967 11.3804 3.03196 11.2421 2.69824C11.1038 2.36451 10.9011 2.06129 10.6456 1.80591Z"
                                                fill="#F56584"
                                                stroke="#F56584"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                        <p>Unfavorite</p>
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    )

}
