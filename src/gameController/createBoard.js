const createBoard = (user, boardContainer) => {
    const container = document.createElement('div');
    container.classList.add('gameBoard');
    container.id = user;

    for (let i = 0; i < 100; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell', user);
        cell.id = i;
        container.append(cell);
    }

    boardContainer.append(container);
}

export default createBoard