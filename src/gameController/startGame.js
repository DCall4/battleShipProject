import battleShipStart from "..";
import gameBoardFactory from "../factories/gameBoard"
import playerFactory from "../factories/player";
import createBoard from "./createBoard";

const startGame = (playerBoard) => {
    const computerBoard = gameBoardFactory();
    const player = playerFactory('player');
    const computer = playerFactory('computer');

    const playerBoardDiv = document.querySelector('.startPopUp');
    playerBoardDiv.classList.add('playerBoardDiv');
    playerBoardDiv.classList.remove('startPopUp');

    const shipDragContainer = document.querySelector('.shipDragContainer');
    shipDragContainer.classList.add('hidden');

    const flipBtn = document.querySelector('.flipBtn');
    flipBtn.classList.add('hidden');

    const randomBtn = document.querySelector('.randomBtn');
    randomBtn.classList.add('hidden');

    const startBtn = document.querySelector('.startBtn');
    startBtn.classList.add('hidden');

    const container = document.querySelector('#container');
    const computerBoardDiv = document.createElement('div');
    computerBoardDiv.classList.add('boardDiv', 'computerBoardDiv');
    container.appendChild(computerBoardDiv);

    const gameOverBanner = document.createElement('div');
    gameOverBanner.classList.add('hidden');
    container.appendChild(gameOverBanner);

    const resetBtnInit = () => {
        const resetBtn = document.createElement('button');
        resetBtn.classList.add('reset');
        resetBtn.textContent = 'Play Again?';
        gameOverBanner.appendChild(resetBtn);

        resetBtn.addEventListener('click', (e) => {
            e.preventDefault();
            battleShipStart();
        })
    }

    createBoard('computerCell', computerBoardDiv);

    let playerShipArr = [];

    for(let i = 0; i < playerBoard.shipPlacement.length; i++) {
        playerShipArr = playerShipArr.concat(playerBoard.shipPlacement[i]);
    }
    console.log(playerShipArr);
    computerBoard.placeShipsRandom();
    console.log(computerBoard.shipPlacement)
    const allCells = Array.from(document.querySelectorAll('.computerCell'));
    const playerCells = Array.from(document.querySelectorAll('.playercell'));
    allCells.forEach(cell => {
        cell.addEventListener('mouseover', (e) => {
            e.preventDefault();
            e.target.classList.add('highlight');
        })
        cell.addEventListener('mouseleave', (e) => {
            e.preventDefault();
            e.target.classList.remove('highlight');
        })
        cell.addEventListener('click', (e) => {
            e.preventDefault();
            const shot = e.target.id;
            let row = Number(Math.floor(shot / 10));
            let col = Number(shot % 10);
            if(player.attack(row, col, computerBoard)) {
                if(computerBoard.shipPlacement[row][col]) {
                    e.target.classList.add('hit');
                    if(computerBoard.isOver()){
                        gameOverBanner.classList.remove('hidden')
                        gameOverBanner.classList.add('winner', 'banner')
                        gameOverBanner.textContent = "You Won!"
                        resetBtnInit();
                    }
                } else {
                    e.target.classList.add('miss');
                }
            } else {
                return
            }
            let coord = Number(computer.randomAttack(playerBoard));
            console.log(coord)
            if(playerShipArr[coord]){
                playerCells[coord].classList.add('hit');
                if(playerBoard.isOver()){
                    gameOverBanner.classList.remove('hidden')
                    gameOverBanner.classList.add('loser', 'banner')
                    gameOverBanner.textContent = "You Lost!"
                    resetBtnInit();
                }
            } else {
                playerCells[coord].classList.add('miss');
            }
        })
    })
}

export default startGame