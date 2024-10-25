// Function to change the Player's turn once their turn finishes
export default function changeCurrentPlayerTurn(currentPlayer, opponent, player) {
    document.querySelector('#current_player').textContent = 'Current Player: ' + player.owner;

    currentPlayer.changeTurn();
    opponent.changeTurn();
}