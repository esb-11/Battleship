import Ship from "./Ship.js";
import Gameboard from "./Gameboard.js";

const Player = (() => {
  const STARTING_FLEET = [
    "carrier",
    "battleship",
    "destroyer",
    "submarine",
    "patrol boat",
  ];

  function createPlayer(name = "Player") {
    const board = Gameboard.createBoard();
    fillBoard(board);

    function getName() {
      return name.slice();
    }

    function reset() {
      board.reset();
    }

    return { getName, board, reset };
  }

  function fillBoard(board) {
    let index = 0;
    STARTING_FLEET.forEach((ship) => {
      board.placeX(new Ship(ship), [index, 0]);
      index += 2;
    });
  }

  return { createPlayer };
})();

export default Player;
