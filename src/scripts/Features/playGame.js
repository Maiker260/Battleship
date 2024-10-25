import { gamePlayer } from "../..";
import { boards } from "../DOM/boards";
import hitCell from "./hitCell";

export default function playGame() {
    // Player1 starts the game
    gamePlayer.player1Game.turn = true;

    boards.player2.addEventListener('click', hitCell);
}