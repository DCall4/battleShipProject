import shipFactory from "../factories/ship.js"

describe('shipFactory', () => {

    let ship

    beforeEach(() => {
        ship = shipFactory(3);
    })

    test('Initilizes ship of length 3', () => {
        expect(ship.length).toEqual(3)
        expect(ship.hits.length).toEqual(0)
    });

    test('ship receives hit', () => {
        ship.hit();
        expect(ship.hits.length).toEqual(1)
    })


    test('isSunk after enough hits', () => {
        ship.hit(1);
        ship.hit(1);
        ship.hit(1);
        expect(ship.isSunk()).toBe(true)
    })

})
//test('')