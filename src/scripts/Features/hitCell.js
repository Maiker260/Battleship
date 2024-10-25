import setPlayer from "./setPlayer";
import attackHandler from "./attackHandler";
import changeCurrentPlayerTurn from "./changeCurrentPlayerTurn";
import computerTurn from "./computerTurn";
import { gameState } from "../..";

// Function to allow the user to attack the opponent when when clicking a cell
export default function hitCell(e) {
    let activeGame = gameState.activeGame;
    
    const cellContainer = e.target;
    const cell = e.target.dataset;
    const { board, currentPlayer, opponent } = setPlayer();

    if (!activeGame) {
        alert('Game Over, Start a New Game.');
    } else if (cell.board === board.id) {
        
        if (opponent.alreadyHits(cell.row, cell.column)) {
            alert('Already Hit!');
            return;
        }

        // Change Player Turn (vs Computer only)
        changeCurrentPlayerTurn(currentPlayer, opponent, opponent)

        attackHandler(currentPlayer, opponent, cell.row, cell.column, cellContainer);
        
        if (opponent.owner === 'Computer' && activeGame && opponent.turn) {
            computerTurn(currentPlayer, opponent);
            changeCurrentPlayerTurn(currentPlayer, opponent, currentPlayer)
        }
        
    } else {
        console.log(cellContainer);
        alert(`${currentPlayer.owner}'s Turn!`);
    }
}