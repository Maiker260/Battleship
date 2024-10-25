import { gameState } from "../..";
import Ship from "./Ship";

export default class Gameboard {
    constructor(owner, board) {
        this.owner = owner;
        this.ships = [];
        this.shots = [];
        this.missedAttacks = [];
        this.board = board;
    }

    MissShot(row, column) {
        return this.missedAttacks.some(shot => shot.row === row && shot.column === column);
    }

    alreadyHit(row, column) {
        const alreadyHit = this.shots.some(shot => shot.row === row && shot.column === column);
        const AlreadyMiss = this.MissShot(row, column);
        
        if (alreadyHit || AlreadyMiss) {
            return true
        }
    }
    
    placeShip(row, column, length, rotation, computer) {
        const columnIndex = column.charCodeAt(0) - 97;
        const ship = new Ship(length);
        
        // Reset in case that a higher number was received.
        if ((row - 1) > 9 ||
            (row - 1) < 0 ||
            columnIndex > 9 ||
            columnIndex < 0) 
        {return false}
        
        // Place the Ship depending on the rotation
        if (rotation === 'Horizontal') {
            // Do not allow to put a ship outside the grid
            if ((columnIndex) > 6) {return false}

            for (let i = 0; i < length; i++) {
                // Do not allow to put a ship outside the grid
                if ((columnIndex + i) > 9 || (columnIndex + i) < 0) {return false}
            
                // Reject in the new Ship overlaps an old one.
                if (this.board[(row - 1)][(columnIndex + i)].value) {
                    if (!computer) {
                        alert('Horizontal Space already occupied');
                    }
                    return false;

                } else {
                    this.board[(row - 1)][(columnIndex + i)].value = ship;
                }
            }
        } else {
            // Do not allow to put a ship outside the grid
            if ((row - 1) > 6 ) {return false}

            for (let i = 0; i < length; i++) {
                // Do not allow to put a ship outside the grid
                if ((row - 1 + i) > 9 || (row - 1 + i) < 0) {return false}

                // Reject in the new Ship overlaps an old one.
                if (this.board[(row - 1) + i][columnIndex].value) {
                    if (!computer) {
                        alert('Vertical Space already occupied');
                    }
                    return false;
                } else {
                    this.board[(row - 1) + i][columnIndex].value = ship;
                }
            }
        }

        this.ships.push(ship);
        return true
    }

    receiveAttack(row, column) {
        const columnIndex = column.charCodeAt(0) - 97;
        const targetCell = this.board[row - 1][columnIndex];
        const ship = targetCell.value;
        
        if (ship) {
            ship.hit();
            this.shots.push({ row, column });

            if (ship.isSunk()) {
                let player;
                let currentShips = this.ships.filter((ship) => ship.damage == 4).length;

                this.owner === 'Computer' 
                    ? player = 'player2'
                    : player = this.owner

                const shipsRemaining = document.querySelector(`#${player.replace(/\s+/g, '').toLowerCase()}_ships_remaining`);
                shipsRemaining.textContent = `${this.ships.length - currentShips} Ships Remaining`            
            }

            // Check if the game is over.
            this.gameOver();

            return true
        } else {
            this.missedAttacks.push({ row, column });
        }
    }

    // Check if all ships are sunk
    allShipsSunk() {
        return this.ships.every(ship => ship.isSunk());
    }

    gameOver() {
        if (this.allShipsSunk()) {
            alert('Game Over!')
            if (this.owner === 'Player 1') {
                alert('Computer Wins!!');
            } else {
                alert('Player 1 Wins!!');
            }
            // Disable Game
            gameState.activeGame = false;
        }
    }
}