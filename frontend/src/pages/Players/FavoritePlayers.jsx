import React, { useState , useContext} from "react";
import "./Players.css";
import FavoritePlayersListTable from "../../components/FavoritePlayersList/FavoritePlayersListTable";

// * FavoritePlayers page
export default function FavoritePlayers() {
  return (
    <div className="players-container">
      <h1>Favorite players</h1>
      <p>Here you can see all the players you added to your favorites!</p>
      <FavoritePlayersListTable />
    </div>
  );
}
