function createPlayerBoard(playerBoard) {
    const grid = 10; 
    const gameboard = document.querySelector(`#${playerBoard}`);

    for (let i = 0; i < grid; i++) {
        const column = document.createElement('div');

        for (let j = 0; j < grid; j++) {
            const row = document.createElement('div');
            row.setAttribute('board', playerBoard)
            row.setAttribute('column', i)
            row.setAttribute('row', j)
            row.classList.add('game_cell');
            column.appendChild(row);
        }

        gameboard.appendChild(column);
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

    placeNewShip(length) {
        const newShip = new Ship(length);
    }

}