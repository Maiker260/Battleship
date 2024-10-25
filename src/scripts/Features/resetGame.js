import { gameState, gamePlayer, domElements } from "../..";
import Player from "../Constructors/Player";
import createBoard from "./createBoard";

// Function to reset the game when the "Reset Game" button is pressed
export default function resetGame() {
    gameState.player1Board = [];
    gameState.player2Board = [];
    gameState.activeGame = false;

    domElements.resetGameBtn.setAttribute('disabled', '');
    domElements.startGameBtn.removeAttribute('disabled', '');

    const player1BoardElement = document.querySelector('#player1Board');
    const player2BoardElement = document.querySelector('#player2Board');
    player1BoardElement.textContent = '';
    player2BoardElement.textContent = '';

    const allMarkers = document.querySelectorAll('.marker_hit, .marker_miss');
    allMarkers.forEach(marker => marker.remove());

    createBoard('player1Board');
    createBoard('player2Board');

    const gridDialog = document.querySelector('#dialog_placement_board')
    gridDialog.textContent = '';
    
    gamePlayer.player1Game = new Player('Player 1', gameState.player1Board);
    gamePlayer.player2Game = new Player('Computer', gameState.player2Board);

    const currentlyPlaying = document.querySelector('#current_player');
    currentlyPlaying.textContent = 'Current Player: None';

    const shipsRemaining = document.querySelector('#ships_remaining');
    shipsRemaining.textContent = `${gamePlayer.player1Game.totalShips} Ships Remaining`;

    document.querySelector('#player1_ships_remaining').textContent = `${gamePlayer.player1Game.totalShips} Ships Remaining`;
    document.querySelector('#player2_ships_remaining').textContent = `${gamePlayer.player2Game.totalShips} Ships Remaining`;
}