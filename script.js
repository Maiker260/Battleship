
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
        const targetCell = this.board[row - 1][columnIndex];
        const ship = targetCell.value;
        
        if (ship) {
            // Avoid hitting the same cell more than once
            if (this.alreadyHit(row, column)) {
                console.log("Already Hit!");
                return;
            }

            ship.hit();
            this.shots.push({ row, column });
            console.log('Hit!');

            if (ship.isSunk()) {
                console.log("Ship Sunk!");
            }

            // Check if the game is over.
            this.gameOver();
            return true
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
        this.turn = false;
        this.gameboard = new Gameboard(owner);
    }

    placeShips(row, column, length, rotation) {
        this.gameboard.placeShip(row, column, length, rotation)
    }

    alreadyHits(row, column) {
        return this.gameboard.alreadyHit(row, column);
    }

    MissShot(row, column) {
        return this.gameboard.MissShot(row, column);
    }

    attack(oponent, row, column) {
        oponent.gameboard.receiveAttack(row, column)
    }
}

const userBoard = document.querySelector('#oponent_board');

userBoard.addEventListener('click', (e) => {
    const cellContainer = e.target;
    const cell = e.target.dataset;

    if (cell.board === 'oponent_board') {

        if (computerGame.alreadyHits(cell.row, cell.column)) {
            alert('Already Hit!');
            return
        }

        humanGame.attack(computerGame, cell.row, cell.column)

        const marker = document.createElement('div');

        if (computerGame.MissShot(cell.row, cell.column)) {
            marker.classList.add('marker_miss');
        }

        marker.classList.add('marker_hit');
        
        cellContainer.appendChild(marker);
    }
})


const humanGame = new Player("human");
const computerGame = new Player("computer");


computerGame.placeShips(3, "f", 3, "Horizontal")
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