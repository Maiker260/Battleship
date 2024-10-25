import handleMouseOver from "./Event Listeners/handleMouseOver";
import handleMouseOut from "./Event Listeners/handleMouseOut";
import placeNewShip from "./Event Listeners/placeNewShip";

let mouseOverHandler, mouseOutHandler, addShipHandler;

export default function handleDialogEventListeners(currentAxis) {
    const newShipContainer = document.querySelector('#dialog_placement_board');
    
    // Change the Current Axis in the DOM
    const axis = document.querySelector('#axis')
    axis.textContent = currentAxis;

    // Remove previous event listeners if they exist
    if (mouseOverHandler) newShipContainer.removeEventListener('mouseover', mouseOverHandler);
    if (mouseOutHandler) newShipContainer.removeEventListener('mouseout', mouseOutHandler);
    if (addShipHandler) newShipContainer.removeEventListener('click', addShipHandler);

    // Define new handlers and store their references
    mouseOverHandler = (e) => handleMouseOver(e, currentAxis);
    mouseOutHandler = (e) => handleMouseOut(e, currentAxis);
    addShipHandler = (e) => placeNewShip(e, currentAxis);

    // Add event listeners
    newShipContainer.addEventListener('mouseover', mouseOverHandler);
    newShipContainer.addEventListener('mouseout', mouseOutHandler);
    newShipContainer.addEventListener('click', addShipHandler);
}