import selectMultipleCells from "../../DOM/selectMultipleCells";

// Function to remove the Highlight when clicking outside the cell
export default function handleMouseOut(e, currentAxis) {
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