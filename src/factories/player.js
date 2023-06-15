import gameBoardFactory from "./gameBoard";

const playerFactory = (name) => {
    //keep track of all shots taken
    let shotTracker = [];

    const attack = (row, col, board) => {
        //check if legal move
        for (let i = 0; i < shotTracker.length; i++){
            if(shotTracker[i].toString() == [row, col].toString()){
                console.log('dub')
                return false
            }
        }
        if(board.receiveAttack(row, col)){
            shotTracker.push([row, col]);
        } else {
            attack(row, col, board);
        }
        return true
    }

    const randomAttack = (game) => {
        //random coordinates
        let row = Math.floor(Math.random() * 10);
        let col = Math.floor(Math.random() * 10);

        //check if legal move
        if(!attack(row, col, game)) {
            console.log('test')
            //run again if illegal move
            return randomAttack(game);
        }
        console.log("" + row + col)
        return "" + row + col 
    }

    return {
        name: name,
        attack,
        shotTracker: shotTracker,
        randomAttack,
    }
}

export default playerFactory