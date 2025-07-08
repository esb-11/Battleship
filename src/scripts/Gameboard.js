// Gameboard consists of a 10 X 10 grid
// Ships cannot overlap
// Ships cannot be placed near another ship

const Gameboard = (() => {
  const BOARD_SIZE = 10;

  function createBoard() {
    const ships = [];
    let board = generateBoard();
    let attacks = {};

    function placeX(ship, coord) {
      // Place a ship along the X axis (horizontally)
      canPlaceX(coord, ship.length);
      const [x, y] = coord;

      for (let i = 0; i < ship.length; i++) {
        board[x][y + i] = ship;
      }

      ships.push(ship);
    }

    function placeY(ship, coord) {
      // Place a ship along the Y axis (vertically)
      canPlaceY(coord, ship.length);

      const [x, y] = coord;

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

      if (attacks[coord]) {
        throw new Error("Coordinate already attacked!");
      } else if (gridCell) {
        gridCell.hit();
        attacks[coord] = "hit";
      } else {
        attacks[coord] = "miss";
      }
    }

    function isEmpty() {
      // The game is lost when all ships have been sunk
      return ships.every((ship) => {
        return ship.isSunk();
      });
    }

    function getBoard() {
      const boardClone = [];

      for (let i = 0; i < board.length; i++) {
        const rowClone = [];
        for (let j = 0; j < board[i].length; j++) {
          const coord = [i, j];
          rowClone.push(attacks[coord] ? attacks[coord] : null);
        }
        boardClone.push(rowClone);
      }

      return boardClone;
    }

    function revealBoard() {
      const boardClone = [];

      for (let i = 0; i < board.length; i++) {
        const rowClone = [];
        for (let j = 0; j < board[i].length; j++) {
          const coord = [i, j];
          if (attacks[coord]) {
            rowClone.push(attacks[coord]);
          } else if (board[i][j]) {
            rowClone.push("ship");
          } else {
            rowClone.push(null);
          }
        }
        boardClone.push(rowClone);
      }

      return boardClone;
    }

    function canPlaceX(coord, length = 0) {
      const [x, y] = coord;

      if (!isCoordValid(coord)) {
        throw new Error("Invalid coordinate!");
      } else if (board[x][y]) {
        throw new Error("Coordinates are not empty!");
      } else {
        const start = x - 1;
        const end = x + length + 2;

        for (
          let i = start < 0 ? 0 : start;
          i < (end > BOARD_SIZE ? BOARD_SIZE : end);
          i++
        ) {
          if (
            (x - 1 >= 0 && board[x - 1][i]) ||
            (x + 1 < BOARD_SIZE && board[x + 1][i])
          ) {
            throw new Error("Ships cannot be placed close to others ships!");
          }
        }
      }
    }

    function canPlaceY(coord, length) {
      const [x, y] = coord;

      if (!isCoordValid(coord)) {
        throw new Error("Invalid coordinate!");
      } else if (board[x][y]) {
        throw new Error("Coordinates are not empty!");
      } else {
        const start = y - 1;
        const end = y + length + 2;

        if (
          (x - 1 >= 0 && board[x - 1][y]) ||
          (x + 1 < BOARD_SIZE && board[x + 1][y])
        ) {
          throw new Error("Ships cannot be placed close to others ships!");
        }

        for (
          let i = start < 0 ? 0 : start;
          i < (end > BOARD_SIZE ? BOARD_SIZE : end);
          i++
        ) {
          if (
            (y - 1 >= 0 && board[i][y - 1]) ||
            (y + 1 < BOARD_SIZE && board[i][y + 1])
          ) {
            throw new Error("Ships cannot be placed close to others ships!");
          }
        }
      }
    }

    function reset() {
      ships.forEach((ship) => (ship.hits = 0));
      attacks = {};
    }

    return { placeX, placeY, receiveAttack, isEmpty, getBoard, reset, revealBoard };
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

  return { createBoard, isCoordValid };
})();

export default Gameboard;
