import Gameboard from "./Gameboard";

export default class Player {
    constructor(owner, board) {
        this.owner = owner;
        this.turn = false;
        this.totalShips = 5;
        this.shipLength = 4;
        this.gameboard = new Gameboard(owner, board);
    }

    placeShips(row, column, length, rotation, computer) {
        return this.gameboard.placeShip(row, column, length, rotation, computer);
    }

    alreadyHits(row, column) {
        return this.gameboard.alreadyHit(row, column);
    }

    MissShot(row, column) {
        return this.gameboard.MissShot(row, column);
    }

    attack(opponent, row, column) {
            opponent.gameboard.receiveAttack(row, column);
    }

    changeTurn() {
        this.turn 
            ? this.turn = false 
            : this.turn = true
    }
}