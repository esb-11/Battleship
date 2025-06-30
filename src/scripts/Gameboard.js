import Ship from "./Ship.js";

class Gameboard {
  static BOARD_SIZE = 10;

  #board;
  #attacks;
  #ships

  constructor() {
    this.#board = [];
    this.#attacks = [];
    for (let i = 0; i < 10; i++) {
      this.#board.push([]);
      for (let j = 0; j < 10; j++) {
        this.#board[i].push(null);
      }
    }
  }

  placeShip(x, y, length) {
    // check if coordinates are within the board
    if (y + length > Gameboard.BOARD_SIZE || x >= Gameboard.BOARD_SIZE)
      throw new Error("The ships is out of the board");

    // check if coordinates are vacant
    for (let i = 0; i < length; i++) {
      if (this.#board[x][y + i]) throw new Error("Space already occupied");
    }

    const ship = new Ship(length);

    for (let i = 0; i < length; i++) {
      this.#board[x][y + i] = ship;
    }

    this.#ships.push(ship);
  }

  receiveAttack(x, y) {
    const spaceAttacked = this.#board[x][y];

    if (spaceAttacked) spaceAttacked.hit();

    this.#attacks.push([x,y]);
  }

  get board() {
    return JSON.stringify(this.#board);
  }
}

export default Gameboard;
