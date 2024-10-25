// Function to create and assign the Marker Color when clicking a cell
export default function createMarker(opponent, row, column) {
    const marker = document.createElement('div');

    if (opponent.MissShot(row, column)) {
        marker.classList.add('marker_miss');
    } else {
        marker.classList.add('marker_hit');
    }

    return marker;
}