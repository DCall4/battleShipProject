import shipFactory from "./ship";

const gameBoardFactory = () => {

    let width = 10;
    let shipPlacement = [];
    let shots = [];

    let shipTracker = [];

    const initialize = () => {
        for (let i = 0; i < width; i++) {
            shipPlacement[i] = [];
            shots[i] = [];
            for (let j = 0; j < width; j++ ) {
                shipPlacement[i][j] = null;
                shots[i][j] = false;
            }
        }
    }

    initialize();

    const placeShip = (ship, row, col, isVert) => {
        if(isPlacePossible(ship, row, col, isVert)) {
            if(isVert) {
                for (let i = 0; i < ship.length; i++) {
                    shipPlacement[row + i][col] = ship;
                }
            } else {
                for (let i = 0; i < ship.length; i++) {
                    shipPlacement[row][col + i] = ship;
                }
            }
            shipTracker.push(ship);
            return true
        } else {
            return false
        }
    }

    const isPlacePossible = (ship, row, col, isVert) => {
        if(isVert) {
            // check if ship can fit
            if (row + ship.length > width) return false
            //check if spaces are empty
            for (let i = 0; i < ship.length; i++) {
                if (shipPlacement[row + i][col]) return false
            }
        } else {
            //repeat for horizontal ships
            if (col + ship.length > width) return false

            for (let i = 0; i < ship.length; i++) {
                if (shipPlacement[row][col + i]) return false
            }
        }

        return true
    }

    const placeShipsRandom = () => {
        initialize();
        shipTracker = [];

        const carrier = shipFactory(5);
        const battleShip = shipFactory(4);
        const destroyer = shipFactory(3);
        const submarine = shipFactory(3);
        const patrolBoat = shipFactory(2);

        shipTracker.push(carrier, battleShip, destroyer, submarine, patrolBoat);

        let i = 0;

        while(i < 5) {
            let row = Math.floor(Math.random() * 10);
            let col = Math.floor(Math.random() * 10);
            let isVert = Math.floor(Math.random() * 2);

            if(placeShip(shipTracker[i], row, col, isVert)) {
                i++
            }
        }
    }

    const receiveAttack = (row, col) => {
        if(!shipPlacement[row][col] && !shots[row][col]) {
            shots[row][col] = true;
            return true
        } else if (shots[row][col]) {
            return false
        } else if (shipPlacement[row][col]) {
            shipPlacement[row][col].hit();
            shots[row][col] = true;
            return true
        } else {
            return false
        }
    }

    const isOver = () => {
        for (let i = 0; i < shipTracker.length; i++) {
            if (!shipTracker[i].isSunk()) {
                return false
            }
        }
        return true
    }

    return {
        shipPlacement: shipPlacement,
        shots: shots,
        initialize,
        placeShip,
        isPlacePossible,
        receiveAttack,
        isOver,
        placeShipsRandom
    }
}

export default gameBoardFactory