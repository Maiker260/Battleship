import createDOMBoard from "../DOM/createDOMBoard";
import { gameState } from "../..";

// Function to create the logical board
export default function createBoard(playerBoard) {
    const grid = 10; // Grid Size: 10x10
    const gameboard = document.querySelector(`#${playerBoard}`);
    let player1Board = gameState.player1Board
    let player2Board = gameState.player2Board
    
    for (let i = 0; i < grid; i++) {
        const row = [];
        const rowElem = document.createElement('div');

        for (let j = 0; j < grid; j++) {
            const column = {
                row: i + 1,
                // Assign a Letter to the Columns.
                column: String.fromCharCode(97 + j),
                value: null,
            };

            createDOMBoard(playerBoard, j, i, rowElem)
            row.push(column);
        }

        if (playerBoard === 'dialog_placement_board') {
            player1Board.push(row);
        } else if (playerBoard === 'player2Board') {
            player2Board.push(row);
        }
        gameboard.appendChild(rowElem);
    }
}