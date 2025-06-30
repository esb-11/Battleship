import Ship from "../Ship.js";

test("Ship correctly registers hits", () => {
  const ship = new Ship(3);

  expect(ship.hits).toBe(0);

  ship.hit();
  expect(ship.hits).toBe(1);

  ship.hit();
  expect(ship.hits).toBe(2);

  ship.hit();
  expect(ship.hits).toBe(3);
});

test("Ship is sunk when enough hits are received", () => {
  const ship = new Ship(3);

  expect(ship.isSunk()).toBe(false);

  ship.hit();
  expect(ship.isSunk()).toBe(false);

  ship.hit();
  expect(ship.isSunk()).toBe(false);

  ship.hit();
  expect(ship.isSunk()).toBe(true);
});
