import Gameboard from "../Gameboard.js";
import Ship from "../Ship.js";

test("Can place ships horizontally", () => {
  const testBoard = Gameboard.createBoard();
  const ship = new Ship("submarine");

  testBoard.placeX(ship, [0, 0]);
  const board = JSON.parse(testBoard.getBoard());

  expect(board[0][0]).toBeTruthy();
  expect(board[0][1]).toBeTruthy();
  expect(board[0][2]).toBeTruthy();
  expect(board[0][3]).toBeFalsy();
  expect(board[1][0]).toBeFalsy();
});

test("Can place ships vertically", () => {
  const testBoard = Gameboard.createBoard();
  const ship = new Ship("submarine");

  testBoard.placeY(ship, [0, 0]);
  const board = JSON.parse(testBoard.getBoard());

  expect(board[0][0]).toBeTruthy();
  expect(board[1][0]).toBeTruthy();
  expect(board[2][0]).toBeTruthy();
  expect(board[3][0]).toBeFalsy();
  expect(board[0][1]).toBeFalsy();
});

test("Ships cannot overlap", () => {
  const board = Gameboard.createBoard();
  const ship1 = new Ship("submarine");
  const ship2 = new Ship("submarine");

  board.placeY(ship1, [3, 3]);
  expect(() => board.placeX(ship2, [3, 3])).toThrow();
  expect(() => board.placeY(ship2, [3, 3])).toThrow();
});

test("Ships cannot be placed close to each other", () => {
  const board = Gameboard.createBoard();
  const ship1 = new Ship("submarine");
  const ship2 = new Ship("submarine");

  board.placeY(ship1, [3, 3]);
  expect(() => board.placeX(ship2, [2, 2])).toThrow();
  expect(() => board.placeX(ship2, [3, 6])).toThrow();
  expect(() => board.placeY(ship2, [6, 3])).toThrow();
  expect(() => board.placeY(ship2, [3, 2])).toThrow();
});

test("Ships cannot surpass board limit", () => {
  const board = Gameboard.createBoard();
  const ship1 = new Ship("submarine");

  expect(() => board.placeX(ship1, [10, 10])).toThrow();
  expect(() => board.placeX(ship1, [0, 10])).toThrow();
  expect(() => board.placeX(ship1, [10, 0])).toThrow();
});

test("Can receive attacks", () => {
  const testBoard = Gameboard.createBoard();
  const ship = new Ship("submarine");

  testBoard.placeX(ship, [0, 0]);
  let board = JSON.parse(testBoard.getBoard());
  expect(board[0][0]).toEqual({});

  testBoard.receiveAttack([0, 0]);
  board = JSON.parse(testBoard.getBoard());
  expect(board[0][0]).toBe("hit");
});

test("Detects when all ships have been sunk", () => {
  const testBoard = Gameboard.createBoard();
  const ship = new Ship("submarine");

  testBoard.placeX(ship, [0, 0]);
  testBoard.receiveAttack([0, 0]);
  testBoard.receiveAttack([0, 1]);
  expect(testBoard.isEmpty()).toBeFalsy();
  testBoard.receiveAttack([0, 2]);
  expect(testBoard.isEmpty()).toBeTruthy();
});
