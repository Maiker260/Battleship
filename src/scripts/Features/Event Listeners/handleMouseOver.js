import selectMultipleCells from "../../DOM/selectMultipleCells";

// Function to allow the user to hover over the cells
export default function handleMouseOver(e, currentAxis) {
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