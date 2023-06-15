let containerDiv = document.querySelector('#container');

const mainDivInit = () => {
    //create main content div
    const mainDiv = document.createElement('div');
    mainDiv.classList.add('main');
    containerDiv.appendChild(mainDiv);

    const playerBoardContainer = document.createElement('div');
    playerBoardContainer.classList.add('playerBoardContainer', 'boardContainer');
    mainDiv.appendChild(playerBoardContainer);

    console.log(playerBoardContainer)

    const aiBoardContainer = document.createElement('div');
    aiBoardContainer.classList.add('aiBoardContainer', 'boardContainer');
    mainDiv.appendChild(aiBoardContainer);

    const playerNameDiv = document.createElement('div');
    playerNameDiv.classList.add('playerNameDiv', 'nameDiv');
    playerBoardContainer.appendChild(playerNameDiv);

    const aiNameDiv = document.createElement('div');
    aiNameDiv.classList.add('aiNameDiv', 'nameDiv');
    aiBoardContainer.appendChild(aiNameDiv);
    
    const playerBoardDiv = document.createElement('div');
    playerBoardDiv.classList.add('playerBoardDiv', 'boardDiv');
    playerBoardContainer.appendChild(playerBoardDiv);

    const aiBoardDiv = document.createElement('div');
    aiBoardDiv.classList.add('aiBoardDiv', 'boardDiv');
    aiBoardContainer.appendChild(aiBoardDiv);
}

export default mainDivInit