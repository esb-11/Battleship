// Gameboard consists of a 10 X 10 grid

const Gameboard = (() => {
  const BOARD_SIZE = 10;

  function createBoard() {
    const ships = [];
    const board = generateBoard();

    function placeX(ship, coord) {
      // Place a ship along the X axis (horizontally)
      const [x, y] = coord;

      if (!isCoordValid(coord)) {
        throw new Error("Invalid coordinate!");
      } else if (board[x][y]) {
        throw new Error("Coordinates are not empty!");
      }

      for (let i = 0; i < ship.length; i++) {
        board[x][y + i] = ship;
      }

      ships.push(ship);
    }

    function placeY(ship, coord) {
      // Place a ship along the Y axis (vertically)
      const [x, y] = coord;

      if (!isCoordValid(coord)) {
        throw new Error("Invalid coordinate!");
      } else if (board[x][y]) {
        throw new Error("Coordinates are not empty!");
      }

      for (let i = 0; i < ship.length; i++) {
        board[x + i][y] = ship;
      }

      ships.push(ship);
    }

    function receiveAttack(coord) {
      if (!isCoordValid(coord)) {
        throw new Error("Invalid coordinate!");
      }

      const [x, y] = coord;
      const gridCell = board[x][y];

      if (gridCell == "hit" || gridCell == "miss") {
        throw new Error("Coordiante already attacked!");
      } else if (gridCell) {
        gridCell.hit();
        board[x][y] = "hit";
      } else {
        board[x][y] = "miss";
      }
    }

    function isEmpty() {
      // The game is lost when all ships have been sunk
      return ships.every((ship) => {
        return ship.isSunk();
      });
    }

    function getBoard() {
      return JSON.stringify(board);
    }

    return { placeX, placeY, receiveAttack, isEmpty, getBoard };
  }

  function generateBoard() {
    // make a 2d array to represent a 10 X 10 grid,
    // fill it with null elements to represent empty spaces
    const board = [];

    for (let i = 0; i < BOARD_SIZE; i++) {
      const row = [];
      for (let j = 0; j < BOARD_SIZE; j++) {
        row.push(null);
      }

      board.push(row);
    }

    return board;
  }

  function isCoordValid(coord, length = 1) {
    const [x, y] = coord;

    return (
      x + length <= BOARD_SIZE && y + length <= BOARD_SIZE && x >= 0 && y >= 0
    );
  }

  return { createBoard };
})();

export default Gameboard;
