// Scripts
import Player from "./scripts/Constructors/Player";
import initializeGame from "./scripts/Features/initializeGame";

// Styles
import './style.css';

// Global Variables
export let gameState = {
    player1Board: [],
    player2Board: [],
    activeGame: false,
}

export let gamePlayer = {
    player1Game: new Player('Player 1', gameState.player1Board),
    player2Game: new Player('Computer', gameState.player2Board),
}

export let domElements = {
    dialog: document.querySelector("dialog"),
    startGameBtn: document.querySelector("#start_game_btn"),
    resetGameBtn: document.querySelector("#reset_game_btn"),
}

initializeGame();