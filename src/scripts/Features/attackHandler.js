import createMarker from "../DOM/createMarker";

// Function to initiate the Attack depending on the Player
export default function attackHandler(currentPlayer, opponent, row, column, cellContainer) {
    currentPlayer.attack(opponent, row, column);
    
    const marker = createMarker(opponent, row, column);
    cellContainer.appendChild(marker);
}