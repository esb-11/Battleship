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
      if (!canPlaceX(coord, ship.length)) {
        return;
      }
      const [x, y] = coord;

      for (let i = 0; i < ship.length; i++) {
        board[x][y + i] = ship;
      }

      ships.push(ship);
    }

    function placeY(ship, coord) {
      // Place a ship along the Y axis (vertically)
      if (!canPlaceY(coord, ship.length)) {
        return;
      }

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
        return false;
      } else if (board[x][y]) {
        return false;
      } else {
        const start = y - 1 < 0 ? 0 : y - 1;
        const end = y + length + 1 > BOARD_SIZE ? BOARD_SIZE : y + length + 1;

        for (let i = start; i < end; i++) {
          if (
            (x - 1 >= 0 && board[x - 1][i]) ||
            (x + 1 < BOARD_SIZE && board[x + 1][i]) ||
            board[x][i]
          ) {
            return false;
          }
        }
      }

      return true;
    }

    function canPlaceY(coord, length = 0) {
      const [x, y] = coord;

      if (!isCoordValid(coord)) {
        return false;
      } else if (board[x][y]) {
        return false;
      } else {
        const start = x - 1 < 0 ? 0 : x - 1;
        const end = x + length + 1 > BOARD_SIZE ? BOARD_SIZE : x + length + 1;

        for (let i = start; i < end; i++) {
          if (
            (y - 1 >= 0 && board[i][y - 1]) ||
            (y + 1 < BOARD_SIZE && board[i][y + 1]) ||
            board[i][y]
          ) {
            return false;
          }
        }
      }

      return true;
    }

    function reset() {
      ships.forEach((ship) => (ship.hits = 0));
      attacks = {};
    }

    function canAttack(coord) {
      return !attacks[coord];
    }

    function randomPlace(ship) {
      const direction = Math.floor(Math.random() * 2);
      if (direction === 1) {
        const coord = randomX(ship.length);
        placeX(ship, coord);
      } else {
        const coord = randomY(ship.length);
        placeY(ship, coord);
      }
    }

    function randomX(length = 1) {
      let x = Math.floor(Math.random() * BOARD_SIZE);
      const sizeLimit = BOARD_SIZE - length;

      for (let i = 0; i < BOARD_SIZE - length + 1; i++) {
        let y = Math.floor(Math.random() * sizeLimit);
        for (let j = 0; j < sizeLimit; j++) {
          const coord = [x, y];
          if (canPlaceX(coord, length)) {
            return coord;
          }
          y = y + 1 >= sizeLimit ? 0 : y + 1;
        }
        x = x + 1 >= BOARD_SIZE ? 0 : x + 1;
      }
    }

    function randomY(length = 1) {
      let y = Math.floor(Math.random() * BOARD_SIZE);
      const sizeLimit = BOARD_SIZE - length;

      for (let i = 0; i < BOARD_SIZE - length + 1; i++) {
        let x = Math.floor(Math.random() * sizeLimit);
        for (let j = 0; j < sizeLimit; j++) {
          const coord = [x, y];
          if (canPlaceY(coord, length)) {
            return coord;
          }
          x = x + 1 >= sizeLimit ? 0 : x + 1;
        }
        y = y + 1 >= BOARD_SIZE ? 0 : y + 1;
      }      
    }

    return {
      placeX,
      placeY,
      receiveAttack,
      isEmpty,
      getBoard,
      reset,
      revealBoard,
      canAttack,
      randomPlace,
    };
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

  function isCoordValid(coord) {
    const [x, y] = coord;

    return (
      x < BOARD_SIZE && y < BOARD_SIZE && x >= 0 && y >= 0
    );
  }

  function randomCoordinate() {
    const x = parseInt(Math.random() * 10);
    const y = parseInt(Math.random() * 10);
    return [x, y];
  }

  return { createBoard, isCoordValid, BOARD_SIZE, randomCoordinate };
})();

export default Gameboard;
