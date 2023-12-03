// implemented in PlayerListTable component
export const isFavorite = (favoritePlayers, player) => {
    return (
        favoritePlayers &&
        favoritePlayers.some((favoritePlayer) => favoritePlayer._id === player._id)
    );
};