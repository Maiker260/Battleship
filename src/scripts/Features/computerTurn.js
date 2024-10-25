import createMarker from "../DOM/createMarker";

// Function to randomize the Computer's attack
export default function computerTurn(user, computer) {
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