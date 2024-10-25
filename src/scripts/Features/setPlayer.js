import { boards } from "../DOM/boards";
import { gamePlayer } from "../..";

export default function setPlayer() {
    let board, currentPlayer, opponent;
    let player1Game = gamePlayer.player1Game;
    let player2Game = gamePlayer.player2Game;

    if (player2Game.turn) {
        board = boards.player1;
        currentPlayer = player2Game;
        opponent = player1Game;
    } else {
        board = boards.player2;
        currentPlayer = player1Game;
        opponent = player2Game;
    }

    return { board, currentPlayer, opponent };
}