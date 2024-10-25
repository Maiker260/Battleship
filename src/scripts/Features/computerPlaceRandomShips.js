import { gamePlayer } from "../..";

// Function to place ships randomnly
export default function computerPlaceRandomShips() {
    let player2Game = gamePlayer.player2Game;
    const gridSize = 10; // Grid Size: 10x10
    const computerPlayer = true;

    while (player2Game.gameboard.ships.length < 5) {
        const axis = Math.random() < 0.5 ? 'Horizontal' : 'Vertical';
        let randomNum = Math.floor(Math.random() * gridSize);
        let shipPlaced = false;

        while (!shipPlaced) {
            if (!player2Game.placeShips(randomNum, String.fromCharCode(97 + randomNum), player2Game.shipLength, axis, computerPlayer)) {
                break
            }
            shipPlaced = true;
        }
    }
}