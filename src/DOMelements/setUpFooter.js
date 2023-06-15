let containerDiv = document.querySelector('#container');

const footerDivInit = () => {
    //create footer
    const footerDiv = document.createElement('div');
    footerDiv.classList.add('footer');
    containerDiv.appendChild(footerDiv);

    const attributeDiv = document.createElement('div');
    attributeDiv.classList.add('attribute');
    footerDiv.appendChild(attributeDiv);

    attributeDiv.textContent = 'Website brought to you by David Callahan';
}

export default footerDivInit