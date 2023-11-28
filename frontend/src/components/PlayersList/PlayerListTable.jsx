import { useContext, useEffect, useState } from "react";
import "./PlayerListTable.css";
import axios from "axios";
import { TechnologyContext } from "../../providers/TechnologyProvider";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook
import jwt_decode from "jwt-decode";

// * PlayerListTable component
export default function PlayerListTable() {
    const { loggedIn, accessToken, userRole } = useContext(TechnologyContext);
    const [players, setPlayers] = useState([]);
    const [editIndex, setEditIndex] = useState(-1);
    const [favoritePlayers, setFavoritePlayers] = useState(null);
    // const [favoritePlayerIds, setFavoritePlayerIds] = useState([]);

    // Decode token
    const decodeToken = jwt_decode(accessToken);
    // Save the id from the logged in player in token
    const id = decodeToken.id;

    // Initialize navigate
    const navigate = useNavigate(); // Access the navigate function

    // If you are not logged in, return empty
    if (!loggedIn) {
        return null;
    }

    // * Get all players ranked by score function
    const getAllPlayers = () => {
        if (!loggedIn) {
            return;
        }
        axios
            .get("http://localhost:5005/api/players/playersRanked", {
                headers: { authToken: `Bearer ${accessToken}` },
            })
            .then((res) => {
                setPlayers(res.data);
            })
            .catch((error) => console.log(error));
    }

    // * Get favorite players from the logged in user
    const fetchFavoritePlayers = () => {
        if (!loggedIn) {
            return;
        }
        axios
            .get(`http://localhost:5005/api/players/getFavoritePlayers/${id}`, {
                headers: { authToken: `Bearer ${accessToken}` },
            })
            .then((res) => {
                if (res.data.favorites) {
                    setFavoritePlayers(res.data.favorites);
                }
            })
            .catch((error) => console.log(error));
    }

    // * Handle add player to favorite functionality
    const handleAddFavorite = (selectedPlayerId) => {
        if (selectedPlayerId === id) {
            alert("You can't favorite yourself.")
        }
        axios
            .patch(`http://localhost:5005/api/players/addFavoritePlayer/${id}`,
                { id, selectedPlayerId },
                {
                    headers: { authToken: `Bearer ${accessToken}` }
                })
            .then((res) => {
                fetchFavoritePlayers()
            })
            .catch((error) => console.log(error)
            );
    };

    // * Handle remove player from favorite functionality
    const handleRemoveFavorite = (removePlayerId) => {
        axios
            .patch(`http://localhost:5005/api/players/removeFavoritePlayer/${id}`,
                { id, removePlayerId },
                {
                    headers: { authToken: `Bearer ${accessToken}` }
                })
            .then((res) => {
                fetchFavoritePlayers()
            })
            .catch((error) => console.log(error));
    };

    // * Render the getAllPlayers fetchFavoritePlayer functions
    useEffect(() => {
        getAllPlayers()
        fetchFavoritePlayers()
    }, [loggedIn])

    // isFavorite functionality
    const isFavorite = (player) => {
        return (
            favoritePlayers &&
            favoritePlayers.some((favoritePlayer) => favoritePlayer._id === player._id)
        );
    };

    // * Handle delete player functionality
    const handleDeleteBtn = (index) => {
        // Set selected player id
        const selectedPlayer = players[index];

        // Confirm if they want to delete player
        const confirms = confirm("Are you sure you want to delete this player?");

        // If user said yes, continue
        if (confirms) {
            axios
                .delete(`http://localhost:5005/api/players/${selectedPlayer._id}`, {
                    headers: { authToken: `Bearer ${accessToken}` },
                })
                .then(() => {
                    const updatedPlayers = [...players];
                    updatedPlayers.splice(index, 1);
                    setPlayers(updatedPlayers);
                })
                .catch((error) => console.log(error));
        }
    };

    // * Handle edit player functionality
    const handleEditBtn = (index) => {
        setEditIndex(index);
        setFavoritePlayers({ ...players[index] });
        const selectedPlayer = players[index];
        navigate(`/players/editPlayer/${selectedPlayer._id}`); // Redirect to the edit player page
    };

    return (
        <div className="table-scroll">
            <table>
                <thead className="table-header">
                    <tr>
                        <th className="headerNames">Name</th>
                        <th className="headerInstitute">Institute</th>
                        <th className="headerMatches">Matches won</th>
                        <th className="headerPoints">Points</th>
                        <th className="headerFavorite">Favorite</th>
                        {userRole === "admin" && (<th className="headerEditDel">Edit/Delete</th>)}
                    </tr>
                </thead>
                <tbody className="table-body">
                    {players.map((player, index) => (
                        <tr key={index} className="table-row">
                            <td className="dataNames">{player.firstname} {player.lastname}</td>
                            <td className="dataInstitute">{player.institute}</td>
                            <td className="dataMatches">{player.matchesWon}</td>
                            <td className="dataPoints">{player.points}</td>
                            <td className="dataFavorite">{isFavorite(player) ? (
                                <button className="add-favorite-button" onClick={() => handleRemoveFavorite(player._id)}>
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
                            ) : (
                                <button className="add-favorite-button" onClick={() => handleAddFavorite(player._id)} type="button">
                                    <svg
                                        className="add-favorite"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 23 21"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M20.2913 2.61183C19.7805 2.10083 19.1741 1.69547 18.5066 1.41891C17.8392 1.14235 17.1238 1 16.4013 1C15.6788 1 14.9634 1.14235 14.2959 1.41891C13.6285 1.69547 13.022 2.10083 12.5113 2.61183L11.4513 3.67183L10.3913 2.61183C9.3596 1.58013 7.96032 1.00053 6.50129 1.00053C5.04226 1.00053 3.64298 1.58013 2.61129 2.61183C1.5796 3.64352 1 5.04279 1 6.50183C1 7.96086 1.5796 9.36013 2.61129 10.3918L3.67129 11.4518L11.4513 19.2318L19.2313 11.4518L20.2913 10.3918C20.8023 9.88107 21.2076 9.27464 21.4842 8.60718C21.7608 7.93972 21.9031 7.22431 21.9031 6.50183C21.9031 5.77934 21.7608 5.06393 21.4842 4.39647C21.2076 3.72901 20.8023 3.12258 20.2913 2.61183Z"
                                            stroke="#F56584"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round" />
                                    </svg>
                                    <p>Favorite</p>
                                </button>
                            )}</td>
                            {userRole === "admin" && (
                                <td className="dataEditDel">
                                    {/* Edit player button */}
                                    <button className="player-edit-button" onClick={() => handleEditBtn(index)} type="button">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="20" height="20" viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="#40A6C7"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="player-edit">
                                            <path d="M12 20h9"></path>
                                            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                                        </svg>
                                        <p>Edit</p>
                                    </button>

                                    {/* Delete player button */}
                                    <button className="player-delete-button" onClick={() => handleDeleteBtn(index)}>
                                        <svg
                                            className="player-delete"
                                            viewBox="0 0 11 11"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M9 1H2C1.44772 1 1 1.44772 1 2V9C1 9.55229 1.44772 10 2 10H9C9.55229 10 10 9.55229 10 9V2C10 1.44772 9.55229 1 9 1Z"
                                                stroke="#F56584"
                                                strokeLinecap="round" // Update property name here
                                                strokeLinejoin="round" // Update property name here
                                            />
                                            <path
                                                d="M4 4L7 7"
                                                stroke="#F56584"
                                                strokeLinecap="round" // Update property name here
                                                strokeLinejoin="round" // Update property name here
                                            />
                                            <path
                                                d="M7 4L4 7"
                                                stroke="#F56584"
                                                strokeLinecap="round" // Update property name here
                                                strokeLinejoin="round" // Update property name here
                                            />
                                        </svg>
                                        <p>Del</p>
                                    </button>
                                </td>)}
                        </tr>))}
                </tbody>
            </table>
        </div>
    )

}
