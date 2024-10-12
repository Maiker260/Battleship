
const player1Board = [];
const player2Board = [];

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
                // In this case the rows will be named 'j' and columns 'i'. ONLY THE NAME
            columnElem.dataset.row = j + 1;
            columnElem.dataset.column = String.fromCharCode(97 + i);
            
            columnElem.classList.add('game_cell');

            row.push(column);
            rowElem.appendChild(columnElem);
        }

        if (playerBoard === 'player1Board') {
            player1Board.push(row);
            gameboard.appendChild(rowElem);
        } else {
            player2Board.push(row);
            gameboard.appendChild(rowElem);
        }
    }
}


createPlayerBoard('player1Board');
createPlayerBoard('player2Board');

// Need to split the code into modules
//////////////////////////////////////////

// ----------------
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

// ---------------------
function assignBoard(owner) {
    if (owner === 'player1') {
        return player1Board;
    }
    
    return player2Board;
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
        if (rotation === 'Horizontal') {
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
            ship.hit();
            this.shots.push({ row, column });

            if (ship.isSunk()) {
                console.log('Ship Sunk!');
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
            if (this.owner === 'player1') {
                alert('Player2 Wins!!');
            } else {
                alert('Player1 Wins!!');
            }
        }
    }
}

// ---------------------------
class Player {
    constructor(owner) {
        this.owner = owner;
        this.turn = false;
        this.gameboard = new Gameboard(owner);
    }

    placeShips(row, column, length, rotation) {
        this.gameboard.placeShip(row, column, length, rotation);
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

// ----------------
const boards = {
    player1: document.querySelector('#player1Board'),
    player2: document.querySelector('#player2Board'),
}

function playGame() {
    let board;

    if (player2Game.turn) {
        board = boards.player1;
        player2Game.changeTurn();
    } else {
        board = boards.player2;
        player1Game.changeTurn();
    }

    console.log(player1Game.turn);
    console.log(player2Game.turn);

    board.addEventListener('click', (e) => {

        const cellContainer = e.target;
        const cell = e.target.dataset;

        let currentPlayer = player1Game;
        let opponent = player2Game;

        if (cell.board === 'player1Board' || cell.board === 'player2Board') {

            if (cell.board === 'player1Board') {
                currentPlayer = player2Game;
                opponent = player1Game;
            }

            if (opponent.alreadyHits(cell.row, cell.column)) {
                alert('Already Hit!');
                return
            }

            currentPlayer.attack(opponent, cell.row, cell.column)

            const marker = document.createElement('div');

            if (opponent.MissShot(cell.row, cell.column)) {
                marker.classList.add('marker_miss');
            } else {
                marker.classList.add('marker_hit');
            }

            cellContainer.appendChild(marker);

            currentPlayer.changeTurn();
            opponent.changeTurn();
        }
    })
    console.log(player1Game.turn);
    console.log(player2Game.turn);
}

const player1Game = new Player('player1');
const player2Game = new Player('player2');



player2Game.placeShips(3, 'f', 3, 'Horizontal')
player1Game.placeShips(3, 'a', 3, 'Horizontal')

player2Game.placeShips(1, 'a', 3, 'Vertical')
player1Game.placeShips(1, 'j', 3, 'Vertical')

const play = playGame();
