import { domElements } from "../../..";
import startNewGame from "../startNewGame";
import resetGame from "../resetGame";

// Function to handle the Main Buttons Event Listeners
export default function setupEventListeners() {
    domElements.startGameBtn.addEventListener('click', startNewGame);
    domElements.resetGameBtn.addEventListener('click', resetGame);
}