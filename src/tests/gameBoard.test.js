import gameBoardFactory from "../factories/gameBoard";
import shipFactory from "../factories/ship";

let game
let testObjectArr
let testShotArr 
let ship
let ship2

beforeEach(() => {
    game = gameBoardFactory();
    ship = shipFactory(3);
    ship2 = shipFactory(4);
    testObjectArr = [];
    testShotArr = [];

    for (let i = 0; i < 10; i++) {
        testObjectArr[i] = [];
        testShotArr[i] = [];
        for (let j= 0; j < 10; j++) {
            testObjectArr[i][j] = null;
            testShotArr[i][j] = false;
        }
    }
})

test('Initilizes gameboard', () => {
    expect(game.shipPlacement).toEqual(testObjectArr)
    expect(game.shots).toEqual(testShotArr)
});

test('place ship', () => {
    game.placeShip(ship, 1, 1, true)
    testObjectArr[1][1] = ship;
    testObjectArr[2][1] = ship;
    testObjectArr[3][1] = ship;
    expect(game.shipPlacement).toEqual(testObjectArr);
    expect(game.shots).toEqual(testShotArr);
})

test('Cant place ship over other ship', () => {
    game.placeShip(ship, 1, 1, true);
    game.placeShip(ship2, 1, 1, false);
    testObjectArr[1][1] = ship;
    testObjectArr[2][1] = ship;
    testObjectArr[3][1] = ship;
    expect(game.shipPlacement).toEqual(testObjectArr);
    expect(game.shots).toEqual(testShotArr);
} )

test('Cant place ship outside of gameboard', () => {
    game.placeShip(ship, 11, 11, true)
    expect(game.isPlacePossible(ship, 11, 11, true)).toBe(false);
})

test('ship receives hit', () => {
    game.placeShip(ship, 1, 1, true)
    game.receiveAttack(1, 1)
    //expect(game.shipPlacement[1][1]).toBe('hit')
    expect(game.shipPlacement[1][1].hits.length).toEqual(1)
})

test('ship isSunk', () => {
    game.placeShip(ship, 1, 1, true)
    game.receiveAttack(1, 1)
    game.receiveAttack(2, 1)
    game.receiveAttack(3, 1)
    expect(game.shipPlacement[1][1].isSunk()).toEqual(true)
})

test('missed shots miss', () => {
    game.placeShip(ship, 1, 1, true)
    game.receiveAttack(4, 1)
    testShotArr[4][1] = true;
    expect(game.shots).toEqual(testShotArr)
})

test('Game over when all ships sunk', () => {
    game.placeShip(ship, 1, 1, true)
    game.placeShip(ship2, 1, 3, true)
    game.receiveAttack(1, 1)
    game.receiveAttack(2, 1)
    game.receiveAttack(3, 1)

    game.receiveAttack(1, 3)
    game.receiveAttack(2, 3)
    game.receiveAttack(3, 3)
    game.receiveAttack(4, 3)

    expect(game.isOver()).toBe(true)
})

test('Game not over when not all ships sunk', () => {
    game.placeShip(ship, 1, 1, true)
    game.placeShip(ship2, 1, 3, true)
    game.receiveAttack(1, 1)
    game.receiveAttack(2, 1)
    game.receiveAttack(3, 1)

    expect(game.isOver()).toBe(false)
})

test('Place ships randomly', () => {
    game.placeShipsRandom();
    let counter = 0;
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            if(game.shipPlacement[i][j] !== null) {
                counter++;
            }
        }
    }

    expect(counter).toBe(17)
})