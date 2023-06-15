const playerShipDragSetUp = () => {
    let shipDragContainer = document.querySelector('.shipDragContainer');

    const carrier = document.createElement('div');
    carrier.classList.add('ship', 'carrier');
    carrier.setAttribute("draggable", "true");
    carrier.id = 5;
    shipDragContainer.appendChild(carrier);

    const battleShip = document.createElement('div');
    battleShip.classList.add('ship', 'battleShip');
    battleShip.setAttribute("draggable", "true");
    battleShip.id = 4;
    shipDragContainer.appendChild(battleShip);

    const destroyer = document.createElement('div');
    destroyer.classList.add('ship', 'destroyer');
    destroyer.setAttribute("draggable", "true");
    destroyer.id = 3;
    shipDragContainer.appendChild(destroyer);

    const submarine = document.createElement('div');
    submarine.classList.add('ship', 'submarine');
    submarine.setAttribute("draggable", "true");
    submarine.id = 3;
    shipDragContainer.appendChild(submarine);

    const patrolBoat = document.createElement('div');
    patrolBoat.classList.add('ship', 'patrolBoat');
    patrolBoat.setAttribute("draggable", "true");
    patrolBoat.id = 2;
    shipDragContainer.appendChild(patrolBoat);
}

const dragOver = (e) => {
    e.preventDefault()
}

export default playerShipDragSetUp
export { dragOver}