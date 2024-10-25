// Function to create the DOM Board
export default function createDOMBoard(playerBoard, row, column, rowElem) {
    const columnElem = document.createElement('div');
    columnElem.dataset.board = playerBoard;

        // In this case the rows will be named 'j' and columns 'i'. ONLY THE NAME
    columnElem.dataset.row = row + 1;
    columnElem.dataset.column = String.fromCharCode(97 + column);

    columnElem.classList.add('game_cell');

    rowElem.appendChild(columnElem);
}