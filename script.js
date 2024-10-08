
const userBoard = [];
const oponentBoard = [];

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
            userBoard.push(column);
            gameboard.appendChild(columnElem);
        } else {
            oponentBoard.push(column);
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

class Gameboard {
    constructor() {
        this.ships = [];
        this.shots = [];
        this.missedAttacks = [];
    }

    placeShip(row, column, length, rotation) {
        const columnIndex = column.charCodeAt(0) - 97;
        const ship = new Ship(length);     

        // Place the Ship depending on the rotation
        if (rotation == "Horizontal") {
            for (let i = 0; i < length; i++) {
                if (userBoard[row - 1][columnIndex + i].value) {
                    console.log('Space already occupied');
                    return false;
                } else {
                    userBoard[row - 1][columnIndex + i].value = ship;
                }
            }
        } else {
            for (let i = 0; i < length; i++) {
                if (userBoard[(row - 1) + i][columnIndex].value) {
                    console.log('Space already occupied');
                    return false;
                } else {
                    userBoard[(row - 1) + i][columnIndex].value = ship;
                }
            }
        }

        this.ships.push(ship);
        return true
    }

    receiveAttack(row, column) {
        const columnIndex = column.charCodeAt(0) - 97;
        const targetCell = userBoard[row - 1][columnIndex];
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

        } else {
            this.missedAttacks.push({ row, column });
            console.log("Miss!");
        }


    }

    

}

const userGameboard = new Gameboard();

userGameboard.placeShip(3, "f", 3, "Horizontal")

console.table(userBoard)
userGameboard.receiveAttack(3, "f");
userGameboard.receiveAttack(3, "f");
userGameboard.receiveAttack(3, "f");



// console.table(oponentBoard)