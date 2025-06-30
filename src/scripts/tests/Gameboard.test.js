import Gameboard from "../Gameboard.js";

test("Initial gameboard is empty", () => {
  const gameboard = new Gameboard();
  const board = JSON.parse(gameboard.board);

  expect(board.length).toBe(10);
  board.every((row) => expect(row.length).toBe(10));
});

test("Can place ships at specific coordinates", () => {
  const gameboard = new Gameboard();

  gameboard.placeShip(0, 0, 5);

  let board = JSON.parse(gameboard.board);
  for (let i = 0; i < 5; i++) {
    expect(board[0][i]).toBeTruthy();
  }
});

test("Ships cannot overlap", () => {
  const gameboard = new Gameboard();

  gameboard.placeShip(0, 0, 5);
  expect(() => gameboard.placeShip(0, 0, 1)).toThrow();
});

test("Ships cannot surpass board limit", () => {
  const gameboard = new Gameboard();

  expect(() => gameboard.placeShip(0, 8, 3)).toThrow();
  expect(() => gameboard.placeShip(11, 7, 3)).toThrow();
});
