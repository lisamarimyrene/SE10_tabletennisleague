import React, { useState , useContext} from "react";
import "./Players.css";
import CreatePlayer from "../../components/Admin/CreatePlayer/CreatePlayer";
import { TechnologyContext } from "../../providers/TechnologyProvider";
import PlayerListTable from "../../components/PlayersList/PlayerListTable";

// * AllPlayers page
export default function AllPlayers() {
  const [showAddPlayer, setShowAddPlayer] = useState(false);
  const { userRole } = useContext(TechnologyContext);

  // Toggle addPlayer functionality
  const toggleAddPlayer = () => {
    setShowAddPlayer(!showAddPlayer);
  };

  // Handle submit functionality
  function handleOnSubmit() {
    setShowAddPlayer(!showAddPlayer);
  }

  return (
    <div className="players-container">
      <h1>Leaderboard</h1>
      <p>Here is an overview of all players in the league, sorted by rank.</p>
      {userRole === 'admin' && (
        <>
      <button className="createPlayerBtn" onClick={toggleAddPlayer}>
        Create player
      </button>
      {showAddPlayer && <CreatePlayer onSubmit={handleOnSubmit} />}
      </>)}      
      <PlayerListTable/>
    </div>
  );
}
