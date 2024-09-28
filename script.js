
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
        this.sink = false;
    }

    hit() {
        if (this.damage < this.length - 1) {
            this.damage += 1;
        }
    }

    isSunk() {
        if (this.damage === this.length - 1) {
            this.sink = true;
        }
    }
}

class Gameboard {
    constructor() {
        this.userSunkenShips = 0;
        this.oponentSunkenShips = 0;
        this.gameOver = false;
    }

    placeShip(row, column, length) {
        const newColumnValue = column.charCodeAt(0) - 97;
        const newShip = new Ship(length);        

        if (!userBoard[row - 1][newColumnValue].value) {
            for (let i = 0; i < length; i++ ) {
                userBoard[row - 1][newColumnValue + i].value = newShip;
            }
        }
    }

    receiveAttack(row, column) {
        const newColumnValue = column.charCodeAt(0) - 97;
        const coordinates = userBoard[row - 1][newColumnValue].value;
        
        if (coordinates && coordinates.damage < coordinates.length) {
            for (let i = 0; i < coordinates.length; i++ ) {
                //  Execute Ship Hit Function
            }
        }


    }

    

}

const gameboard = new Gameboard();

gameboard.placeShip(3, "f", 3)
gameboard.receiveAttack(3, "f");

console.table(userBoard)
// console.table(oponentBoard)