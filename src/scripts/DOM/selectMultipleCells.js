// Function to Highlight the multiple cells at the same time.
export default function selectMultipleCells(i, target, currentAxis) {
    let cell;
    
    if (currentAxis === 'Horizontal') {
        // Get Letter Code Number and sum the loop
        let column = String.fromCharCode(target.column.charCodeAt(0) + i);

        cell = document.querySelector(`[data-board='dialog_placement_board'][data-row='${target.row}'][data-column='${column}']`);
    } else {
        cell = document.querySelector(`[data-board='dialog_placement_board'][data-row='${Number(target.row) + i}'][data-column='${target.column}']`);
    }

    return cell
}