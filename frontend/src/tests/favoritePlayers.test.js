import { isFavorite } from "../utils/favoritePlayers";

// Mock favoritePlayers array for testing
const favoritePlayers = [
    { _id: '1', name: 'Player 1' },
    { _id: '2', name: 'Player 2' },
    { _id: '3', name: 'Player 3' },
];

// Test cases for the isFavorite function
describe('isFavorite function', () => {
    test('should return true if player is in favoritePlayers', () => {
        const playerInFavorites = { _id: '1', name: 'Player 1' };
        expect(isFavorite(favoritePlayers, playerInFavorites)).toBe(true);
    });

    test('should return false if player is not in favoritePlayers', () => {
        const playerNotInFavorites = { _id: '4', name: 'Player 4' };
        expect(isFavorite(favoritePlayers, playerNotInFavorites)).toBe(false);
    });
});
