
const humanBoard = [];
const computerBoard = [];

function createPlayerBoard(playerBoard) {
    const grid = 10; // Grid Size: 10x10
    const gameboard = document.querySelector(`#${playerBoard}`);

    for (let i = 0; i < grid; i++) {
        const row = [];
        const rowElem = document.createElement('div');

        for (let j = 0; j < grid; j++) {
            const column = {
                row: i + 1,
                column: String.fromCharCode(97 + j),
                value: null,
            };

            const columnElem = document.createElement('div');
            columnElem.dataset.board = playerBoard;
                // In this case the rows will be named "j" and columns "i". ONLY THE NAME
            columnElem.dataset.row = j + 1;
            columnElem.dataset.column = String.fromCharCode(97 + i);
            
            columnElem.classList.add('game_cell');

            row.push(column);
            rowElem.appendChild(columnElem);
        }

        if (playerBoard === "user_board") {
            humanBoard.push(row);
            gameboard.appendChild(rowElem);
        } else {
            computerBoard.push(row);
            gameboard.appendChild(rowElem);
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
    if (owner === "human") {
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
        if (rotation === "Horizontal") {
            for (let i = 0; i < length; i++) {
                if (this.board[row - 1][columnIndex + i].value) {
                    console.log('Horizontal Space already occupied');
                    return false;
                } else {
                    this.board[row -1][columnIndex + i].value = ship; 
                }
            }
        } else {
            for (let i = 0; i < length; i++) {
                if (this.board[(row - 1) + i][columnIndex].value) {
                    console.log('Vertical Space already occupied');
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
            if (this.owner === "human") {
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

const userBoard = document.querySelector('#user_board');

userBoard.addEventListener('click', (el) => {
    const cell = el.target
    if (cell.dataset.board == 'user_board') {
        console.log('row: ' + cell.dataset.row);
        console.log('column: ' + cell.dataset.column);
    }
});


const humanGame = new Player("human");
const computerGame = new Player("computer");


// computerGame.placeShips(3, "f", 3, "Horizontal")
// console.log(computerBoard)

// humanGame.attack(computerGame, 3, "f");
// humanGame.attack(computerGame, 3, "g");
// humanGame.attack(computerGame, 3, "h");

// console.table(humanBoard)
// console.table(computerBoard)


// humanGame.placeShips(3, "a", 3, "Horizontal")

// computerGame.attack(humanGame, 3, "f");
// computerGame.attack(humanGame, 3, "g");
// computerGame.attack(humanGame, 3, "h");