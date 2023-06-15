import gameBoardFactory from "../factories/gameBoard";
import playerFactory from "../factories/player";
import shipFactory from "../factories/ship";

let player;
let game;
let ship;

beforeEach(() => {
    player = playerFactory('p1')
    game = gameBoardFactory()
    ship = shipFactory(3)
})

test('initializes player object', () => {
    expect(player.name).toEqual('p1')
})

test('attacks work', () => {
    game.placeShip(ship, 1, 1, true)
    player.attack(1, 1, game)
    expect(game.shipPlacement[1][1].hits.length).toEqual(1)
    expect(player.shotTracker[0].toString()).toEqual([1,1].toString())
})

test('computer can attack', () => {
    game.placeShip(ship, 1, 1, true)
    for(let i = 0; i < 100; i++) {
        player.randomAttack(game)
    }
    expect(game.isOver()).toBe(true)
})