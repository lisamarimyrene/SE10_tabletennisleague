// implemented in PlayerListTable component
export const isFavorite = (player) => {
    return (
        favoritePlayers &&
        favoritePlayers.some((favoritePlayer) => favoritePlayer._id === player._id)
    );
};