import gameBoardFactory from "../factories/gameBoard";
import shipFactory from "../factories/ship";
import createBoard from "./createBoard";
import playerShipDragSetUp, { dragOver, dragStart, dropShip } from "./playerShipDragSetUp";
import startGame from "./startGame";

const containerDiv = document.querySelector('#container')

const startScreen = () => {
    const playerBoard = gameBoardFactory();

    const startPopUp = document.createElement('div');
    startPopUp.classList.add('startPopUp');
    containerDiv.appendChild(startPopUp);

    const shipPlacementBoard = document.createElement('div');
    shipPlacementBoard.classList.add('boardDiv', 'startBoardDiv');
    startPopUp.appendChild(shipPlacementBoard);

    const shipDragContainer = document.createElement('div');
    shipDragContainer.classList.add('shipDragContainer');
    startPopUp.appendChild(shipDragContainer);

    playerShipDragSetUp();

    const flipBtn = document.createElement('button');
    flipBtn.classList.add('button', 'flipBtn');
    flipBtn.textContent = 'Flip';
    startPopUp.appendChild(flipBtn);

    const randomBtn = document.createElement('button');
    randomBtn.classList.add('button', 'randomBtn');
    randomBtn.textContent = 'Random';
    startPopUp.appendChild(randomBtn);

    const startBtn = document.createElement('button')
    startBtn.classList.add('button', 'startBtn');
    startBtn.textContent = 'Start';
    startPopUp.appendChild(startBtn);

    createBoard('playercell', shipPlacementBoard);

    const allCells = Array.from(document.querySelectorAll('.playercell'));
    let dragShips = Array.from(shipDragContainer.childNodes);

    const makeDraggable = () => {
        dragShips = Array.from(shipDragContainer.childNodes);
        dragShips.forEach( ship => {
            
            ship.classList.remove('hidden')
        })
    }

    randomBtn.addEventListener('click', () => {
        playerBoard.placeShipsRandom()
        visualizeShips(allCells)
        makeDraggable();
    });

    let counter 
    const visualizeShips = (allCells) => {
        let shipArr = [];
        counter = 0;
        for(let i = 0; i < playerBoard.shipPlacement.length; i++) {
            shipArr = shipArr.concat(playerBoard.shipPlacement[i]);
        }
        for(let i = 0; i < allCells.length; i++) {
            allCells[i].classList.remove('ship');
            if(shipArr[i]) {
                allCells[i].classList.add('ship');
                counter++;
            }
        }
        if(counter > 17) {
            playerBoard.initialize();
            makeDraggable();
            visualizeShips(allCells);
        }
    }

    let isVert = false;

    flipBtn.addEventListener('click', () => {
        isVert = isVert ? false : true;
        if(isVert) {
            dragShips.forEach( dragShip => {
                dragShip.classList.add('vertical')
            })
        } else {
            dragShips.forEach( dragShip => {
                dragShip.classList.remove('vertical')
            })
        }
    })

    let draggedShip

    dragShips.forEach(ship => ship.addEventListener('dragstart', (e) => {
        draggedShip = e.target;
    }))
    allCells.forEach(cell => {
        cell.addEventListener('dragover', (e) => {
            e.preventDefault();
            visualizeShips(allCells);
            const start = e.target.id;
            const num = Number(draggedShip.id);
            let row = Number(Math.floor(start / 10));
            let col = Number(start % 10);
            if(playerBoard.isPlacePossible(shipFactory(num), row, col, isVert)) {
                if(!isVert) {
                    for(let i = 0; i < num; i++) {
                        let highLightCounter = Number(start) + i;
                        allCells[highLightCounter].classList.add('highlight');
                        setTimeout(() => 
                            allCells[highLightCounter].classList.remove('highlight'), 250)
                    }
                } else {
                    for(let i = 0; i < num; i++) {
                        let highLightCounter = Number(start) + i * 10;
                        allCells[highLightCounter].classList.add('highlight');
                        setTimeout(() => 
                            allCells[highLightCounter].classList.remove('highlight'), 250)
                    }
                }
            }
        })
        cell.addEventListener('drop', (e) => {
            const start = e.target.id;
            const num = Number(draggedShip.id);
            let row = Number(Math.floor(start / 10));
            let col = Number(start % 10);
            if(playerBoard.isPlacePossible(shipFactory(num), row, col, isVert)) {
                draggedShip.classList.add('hidden');
                let newDragArr = dragShips.filter(e => e !== draggedShip);
                dragShips = newDragArr;
            }
            playerBoard.placeShip(shipFactory(num), row, col, isVert);
            visualizeShips(allCells)
        })
    })

    startBtn.addEventListener('click', () => {
        if(counter == 17){
            startGame(playerBoard)
        }
    });
    

    return {
        playerBoard, 
        visualizeShips
    }
}

export default startScreen