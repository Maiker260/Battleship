
let player1Board = [];
let player2Board = [];
let activeGame = false;

function createBoard(playerBoard) {
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

        if (playerBoard === 'dialog_placement_board') {
            player1Board.push(row);
        } else if (playerBoard === 'player2Board') {
            player2Board.push(row);
        }
        gameboard.appendChild(rowElem);
    }
}


createBoard('player1Board');
createBoard('player2Board');

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
    if (owner === 'Player 1') {
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
    
    placeShip(row, column, length, rotation, computer) {
        const columnIndex = column.charCodeAt(0) - 97;
        const ship = new Ship(length);
        
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
                if ((columnIndex + i) > 9 || (columnIndex + i) < 0) {return false}
            
                // console.log(this.board[(row - 1)][(columnIndex + i)]);
                if (this.board[(row - 1)][(columnIndex + i)].value) {
                    // if (!computer) {
                    //     alert('Horizontal Space already occupied');
                    // }
                    // console.log(this.board);
                    return false;

                } else {
                    this.board[(row - 1)][(columnIndex + i)].value = ship;
                }
            }
        } else {
            // Do not allow to put a ship outside the grid
            if ((row - 1) > 6 ) {return false}

            for (let i = 0; i < length; i++) {
                if ((row - 1 + i) > 9 || (row - 1 + i) < 0) {return false}

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
            if (this.owner === 'Player 1') {
                alert('Player 2 Wins!!');
            } else {
                alert('Player 1 Wins!!');
            }
            activeGame = false;
        }
    }
}

// ---------------------------
class Player {
    constructor(owner) {
        this.owner = owner;
        this.turn = false;
        this.totalShips = 5;
        this.shipLength = 4;
        this.gameboard = new Gameboard(owner);
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

// ----------------
const boards = {
    player1: document.querySelector('#player1Board'),
    player2: document.querySelector('#player2Board'),
}

function playGame() {
    // Player1 starts the game
    player1Game.turn = true;

    boards.player1.addEventListener('click', hitCell);
    boards.player2.addEventListener('click', hitCell);
}

function hitCell(e) {
    const cellContainer = e.target;
    const cell = e.target.dataset;
    const { board, currentPlayer, opponent } = setPlayerTurn();

    if (!activeGame) {
        alert('Game Over, Start a New Game.');
    } else if (cell.board === board.id) {

        if (opponent.alreadyHits(cell.row, cell.column)) {
            alert('Already Hit!');
            return;
        }

        processAttack(currentPlayer, opponent, cell.row, cell.column, cellContainer);
        
        if (opponent.owner === 'Computer' && activeGame) {
            computerTurn(currentPlayer, opponent);
        } else {
            changeCurrentPlayerTurn(currentPlayer, opponent);
        }
        
    } else {
        alert(`${currentPlayer.owner}'s Turn!`);
    }
}

function setPlayerTurn() {
    let board, currentPlayer, opponent;

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

function processAttack(currentPlayer, opponent, row, column, cellContainer) {
    currentPlayer.attack(opponent, row, column);
    
    const marker = createMarker(opponent, row, column);
    cellContainer.appendChild(marker);
}

function createMarker(opponent, row, column) {
    const marker = document.createElement('div');

    if (opponent.MissShot(row, column)) {
        marker.classList.add('marker_miss');
    } else {
        marker.classList.add('marker_hit');
    }

    return marker;
}

function changeCurrentPlayerTurn(currentPlayer, opponent) {
    currentPlayer.changeTurn();
    opponent.changeTurn();

    const currentlyPlaying = document.querySelector('#current_player');
    currentlyPlaying.textContent = 'Current Player: ' + opponent.owner;
}

function computerTurn(user, computer) {
    let randomRow, randomColumn, alreadyHitBefore;

    do {
        randomRow = Math.floor(Math.random() * 10) + 1;
        randomColumn = String.fromCharCode(97 + Math.floor(Math.random() * 10));
        alreadyHitBefore = user.alreadyHits(randomRow, randomColumn)
    } while (alreadyHitBefore);

    computer.attack(user, randomRow, randomColumn);

    const marker = createMarker(user, randomRow, randomColumn);
    const cell = document.querySelector(`[data-board='player1Board'][data-row='${randomRow}'][data-column='${randomColumn}']`);
    cell.appendChild(marker);
}


let player1Game = new Player('Player 1');
// const player2Game = new Player('Player 2');
let player2Game = new Player('Computer');


//-------------------
const dialog = document.querySelector("dialog")
const startGameBtn = document.querySelector("#start_game_btn")
const resetGameBtn = document.querySelector("#reset_game_btn")

// Start Game
startGameBtn.addEventListener('click', startNewGame);

let mouseOverHandler, mouseOutHandler, clickHandler;
function handleDialogEventListeners(currentAxis) {

    const newShipContainer = document.querySelector('#dialog_placement_board');

    // Remove previous event listeners if they exist
    if (mouseOverHandler) newShipContainer.removeEventListener('mouseover', mouseOverHandler);
    if (mouseOutHandler) newShipContainer.removeEventListener('mouseout', mouseOutHandler);
    if (clickHandler) newShipContainer.removeEventListener('click', clickHandler);

    // Define new handlers and store their references
    mouseOverHandler = (e) => handleMouseOver(e, currentAxis);
    mouseOutHandler = (e) => handleMouseOut(e, currentAxis);
    clickHandler = (e) => placeNewShip(e, currentAxis);

    // Add event listeners
    newShipContainer.addEventListener('mouseover', mouseOverHandler);
    newShipContainer.addEventListener('mouseout', mouseOutHandler);
    newShipContainer.addEventListener('click', clickHandler);
    
}

function startNewGame() {
    activeGame = true;

    dialog.showModal();
    createBoard('dialog_placement_board');
    
    let currentAxis = 'Horizontal';

    const axis = document.querySelector('#axis')
    axis.addEventListener('click', () => {
        currentAxis = currentAxis === 'Horizontal' 
            ? 'Vertical' 
            : 'Horizontal';
        axis.textContent = currentAxis;
    })

    handleDialogEventListeners(currentAxis)

    document.querySelector('#done_btn').addEventListener('click', playerReady);
}

function rotationHandler() {
    currentAxis = currentAxis === 'Horizontal' 
            ? 'Vertical' 
            : 'Horizontal';
    axis.textContent = currentAxis;
}

function handleMouseOver(e, currentAxis) {
    const target = e.target.dataset;

    if (!target.board) {
        return
    }

    for (let i = 0; i < 4; i++) {
        let cell = selectMultipleCells(i, target, currentAxis);

        if (cell) {
            cell.classList.add('game_cell_ships_highlight');
        }
    }
}

function handleMouseOut(e, currentAxis) {
    const target = e.target.dataset;

    if (!target.board) {
        return
    }

    for (let i = 0; i < 4; i++) {
        let cell = selectMultipleCells(i, target, currentAxis);

        if (cell) {
            cell.classList.remove('game_cell_ships_highlight');
        }
    }
}

function placeNewShip(e, currentAxis) {
    const target = e.target.dataset;

    if (target.board && player1Game.totalShips > 0) {
        if (!player1Game.placeShips(target.row, target.column, player1Game.shipLength, currentAxis)) {
            return
        }

        for (let i = 0; i < player1Game.shipLength; i++) {
            let cell = selectMultipleCells(i, target, currentAxis);

            if (cell) {
                cell.classList.add('ship_placed');
            }
        }

        player1Game.totalShips -= 1;

        const shipsRemaining = document.querySelector('#ships_remaining');
        shipsRemaining.textContent = `${player1Game.totalShips} Ships Remaining`;

        if (player1Game.totalShips === 0) {
            document.querySelector('#done_btn').removeAttribute('disabled', '');
        }
    }
}

function selectMultipleCells(i, target, currentAxis) {
    if (currentAxis === 'Horizontal') {
        // Get Letter Code Number and sum the loop
        let column = String.fromCharCode(target.column.charCodeAt(0) + i);

        cell = document.querySelector(`[data-board='dialog_placement_board'][data-row='${target.row}'][data-column='${column}']`);
    } else {
        cell = document.querySelector(`[data-board='dialog_placement_board'][data-row='${Number(target.row) + i}'][data-column='${target.column}']`);
    }

    return cell
}

function playerReady() {
    // Computer's Board Generated
    computerPlaceRandomShips();
    
    dialog.close();
    playGame();
    
    // Delete grid when finish placing the ships
    const gridDialog = document.querySelector('#dialog_placement_board')
    gridDialog.textContent = '';

    startGameBtn.setAttribute('disabled', '');
    resetGameBtn.removeAttribute('disabled', '');
}

function computerPlaceRandomShips() {
    const gridSize = 10; // Grid Size: 10x10
    const computerPlayer = true;

    while (player2Game.gameboard.ships.length < 5) {
        const axis = Math.random() < 0.5 ? 'Horizontal' : 'Vertical';
        let randomNum = Math.floor(Math.random() * gridSize);
        let shipPlaced = false;

        if (axis === 'Horizontal') {
            while (!shipPlaced) {
                if (!player2Game.placeShips(randomNum, String.fromCharCode(97 + randomNum), player2Game.shipLength, axis, computerPlayer)) {
                    break
                }
                shipPlaced = true;
            }
        } else {
            while (!shipPlaced) {
                if (!player2Game.placeShips(randomNum, String.fromCharCode(97 + randomNum), player2Game.shipLength, axis, computerPlayer)) {
                    break
                }
                shipPlaced = true;
            }
        }
    }
}

function resetGame() {
    player1Board = [];
    player2Board = [];
    activeGame = false;

    resetGameBtn.setAttribute('disabled', '');
    startGameBtn.removeAttribute('disabled', '');

    const player1BoardElement = document.querySelector('#player1Board');
    const player2BoardElement = document.querySelector('#player2Board');
    player1BoardElement.textContent = '';
    player2BoardElement.textContent = '';

    const allMarkers = document.querySelectorAll('.marker_hit, .marker_miss');
    allMarkers.forEach(marker => marker.remove());

    createBoard('player1Board');
    createBoard('player2Board');

    const gridDialog = document.querySelector('#dialog_placement_board')
    gridDialog.textContent = '';
    
    player1Game = new Player('Player 1');
    player2Game = new Player('Computer');

    // console.log(player1Board);

    const currentlyPlaying = document.querySelector('#current_player');
    currentlyPlaying.textContent = 'Current Player: None';

    const shipsRemaining = document.querySelector('#ships_remaining');
    shipsRemaining.textContent = `${player1Game.totalShips} Ships Remaining`;

    resetDialog();
}

function resetDialog() {
    const gridDialog = document.querySelector('#dialog_placement_board');
    gridDialog.textContent = ''; // Clear the dialog placement board
    dialog.close(); // Ensure the dialog is closed during reset
}

document.querySelector('#reset_game_btn').addEventListener('click', resetGame);