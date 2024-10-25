import createBoard from "./createBoard";
import setupEventListeners from "./Event Listeners/setupEventListeners";

export default function initializeGame() {
    createBoard('player1Board');
    createBoard('player2Board');
    setupEventListeners();
}