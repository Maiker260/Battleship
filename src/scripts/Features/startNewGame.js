import createBoard from "./createBoard";
import handleDialogEventListeners from "./handleDialogEventListeners";
import playerReady from "./playerReady";
import { gameState, domElements, gamePlayer } from "../..";

// Function to start the game when the "Start Game" button is pressed
export default function startNewGame() {
    gameState.activeGame = true;
    domElements.dialog.showModal();
    createBoard('dialog_placement_board');
    
    let currentAxis = 'Horizontal';

    const axis = document.querySelector('#axis')
    axis.addEventListener('click', () => {
        currentAxis = currentAxis === 'Horizontal' 
            ? 'Vertical' 
            : 'Horizontal';
        handleDialogEventListeners(currentAxis)
    })
    
    handleDialogEventListeners(currentAxis)

    document.querySelector('#done_btn').addEventListener('click', playerReady);
}