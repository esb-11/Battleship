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
    STARTING_FLEET.forEach((shipType) => {
      const ship = new Ship(shipType);      
      board.randomPlace(ship);
    });
  }

  return { createPlayer };
})();

export default Player;
