
const humanBoard = [];
const computerBoard = [];

function createPlayerBoard(playerBoard) {
    const grid = 10; // Grid Size: 10x10
    const gameboard = document.querySelector(`#${playerBoard}`);

    for (let i = 1; i <= grid; i++) {
        const column = [];
        const columnElem = document.createElement('div');

        for (let j = 0; j < grid; j++) {
            const row = {
                row: i,
                column: String.fromCharCode(97 + j),
                value: null,
            };

            const rowElem = document.createElement('div');
            rowElem.setAttribute('board', playerBoard)
            rowElem.setAttribute('row', i)
            rowElem.setAttribute('column', String.fromCharCode(97 + j))
            rowElem.classList.add('game_cell');

            column.push(row);
            columnElem.appendChild(rowElem);
        }

        if (playerBoard == "user_board") {
            humanBoard.push(column);
            gameboard.appendChild(columnElem);
        } else {
            computerBoard.push(column);
            gameboard.appendChild(columnElem);
        }
    }
}


createPlayerBoard('user_board');
createPlayerBoard('oponent_board');

// Need to split the code into modules
//////////////////////////////////////////

class Ship {
    constructor(length) {
        this.length = length;
        this.damage = 0;
    }

    hit() {
       this.damage += 1;
    }

    isSunk() {
        return this.damage >= this.length;
    }
}

function assignBoard(owner) {
    if (owner == "human") {
        return humanBoard;
    }
    
    return computerBoard;
}

class Gameboard {
    constructor(owner) {
        this.owner = owner;
        this.ships = [];
        this.shots = [];
        this.missedAttacks = [];
        this.board = assignBoard(owner);
    }
    
    placeShip(row, column, length, rotation) {
        const columnIndex = column.charCodeAt(0) - 97;
        const ship = new Ship(length);     

        // Place the Ship depending on the rotation
        if (rotation == "Horizontal") {
            for (let i = 0; i < length; i++) {
                // if (userBoard[row - 1][columnIndex + i].value) {
                if (this.board[row - 1][columnIndex + i].value) {
                    console.log('Horizontal Space already occupied');
                    return false;
                } else {
                    // userBoard[row - 1][columnIndex + i].value = ship;
                    this.board[row - 1][columnIndex + i].value = ship;
                }
            }
        } else {
            for (let i = 0; i < length; i++) {
                // if (userBoard[(row - 1) + i][columnIndex].value) {
                if (this.board[(row - 1) + i][columnIndex].value) {
                    console.log('Vertical Space already occupied');
                    return false;
                } else {
                    // userBoard[(row - 1) + i][columnIndex].value = ship;
                    this.board[(row - 1) + i][columnIndex].value = ship;
                }
            }
        }

        this.ships.push(ship);
        return true
    }

    receiveAttack(row, column) {
        const columnIndex = column.charCodeAt(0) - 97;
        // const targetCell = userBoard[row - 1][columnIndex];
        const targetCell = this.board[row - 1][columnIndex];
        const ship = targetCell.value;
        
        if (ship) {
            // Avoid hitting the same cell more than once
            const alreadyHit = this.shots.some(shot => shot.row === row && shot.column === column);
        
            if (alreadyHit) {
                console.log("Already Hit");
                return false;
            }

            ship.hit();
            this.shots.push({ row, column });
            console.log('Hit!');

            if (ship.isSunk()) {
                console.log("Ship Sunk!");
            }

            // Check if the game is over.
            this.gameOver();
        } else {
            this.missedAttacks.push({ row, column });
            console.log("Miss!");
        }
    }

    // Check if all ships are sunk
    allShipsSunk() {
        return this.ships.every(ship => ship.isSunk());
    }

    gameOver() {
        if (this.allShipsSunk()) {
            console.log("Game Over")
            if (this.owner == "human") {
                console.log("Computer Wins!!");
            } else {
                console.log("Human Wins!!");
            }
        }
    }
}

class Player {
    constructor(owner) {
        this.owner = owner;
        this.gameboard = new Gameboard(owner);
    }

    placeShips(row, column, length, rotation) {
        this.gameboard.placeShip(row, column, length, rotation)
    }

    attack(oponent, row, column) {
        oponent.gameboard.receiveAttack(row, column)
    }
}

const humanGame = new Player("human");
const computerGame = new Player("computer");


computerGame.placeShips(3, "f", 3, "Horizontal")

humanGame.attack(computerGame, 3, "f");
humanGame.attack(computerGame, 3, "g");
humanGame.attack(computerGame, 3, "h");

console.table(humanBoard)
console.table(computerBoard)


humanGame.placeShips(3, "a", 3, "Horizontal")

computerGame.attack(humanGame, 3, "f");
computerGame.attack(humanGame, 3, "g");
computerGame.attack(humanGame, 3, "h");