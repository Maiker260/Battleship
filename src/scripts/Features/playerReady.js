import computerPlaceRandomShips from "./computerPlaceRandomShips";
import playGame from "./playGame";
import { domElements } from "../..";

// Function to run when the player's ready
export default function playerReady() {
    // Computer's Board Generated
    computerPlaceRandomShips();
    
    domElements.dialog.close();
    playGame();
    // Delete grid when finish placing the ships
    const gridDialog = document.querySelector('#dialog_placement_board')
    gridDialog.textContent = '';

    domElements.startGameBtn.setAttribute('disabled', '');
    domElements.resetGameBtn.removeAttribute('disabled', '');
}