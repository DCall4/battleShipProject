let containerDiv = document.querySelector('#container');

const headerDivInit = () => {
    //create header
    const headerDiv = document.createElement('div');
    headerDiv.classList.add('header');
    containerDiv.appendChild(headerDiv);

    const titleDiv = document.createElement('div');
    titleDiv.classList.add('title');
    headerDiv.appendChild(titleDiv);

    titleDiv.textContent = 'BATTLESHIP';

}

export default headerDivInit