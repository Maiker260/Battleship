import { gamePlayer } from "../../..";
import selectMultipleCells from "../../DOM/selectMultipleCells";

// Function to add a new Ship to the cell clicked
export default function placeNewShip(e, currentAxis) {
    let player1Game = gamePlayer.player1Game;
    const target = e.target.dataset;

    if (target.board && player1Game.totalShips > 0) {
        if (!player1Game.placeShips(target.row, target.column, player1Game.shipLength, currentAxis)) {
            return
        }

        // Loop through the next cells to place the ship.
        for (let i = 0; i < player1Game.shipLength; i++) {
            let cell = selectMultipleCells(i, target, currentAxis);

            if (cell) {
                cell.classList.add('ship_placed');
            }
        }

        player1Game.totalShips -= 1;

        const shipsRemaining = document.querySelector('#ships_remaining');
        shipsRemaining.textContent = `${player1Game.totalShips} Ships Remaining`;

        if (player1Game.totalShips === 0) {
            document.querySelector('#done_btn').removeAttribute('disabled', '');
        }
    }
}