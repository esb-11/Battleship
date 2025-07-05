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

    return { getName, board };
  }

  function createCPU() {
    const name = "Computer";
    const board = Gameboard.createBoard();
    fillBoard(board);
    
    function getName() {
      return name.slice();
    }
    
    return { getName, board };
  }

  function fillBoard(board) {
    let index = 0;
    STARTING_FLEET.forEach((ship) => {
      board.placeX(new Ship(ship), [index, 0]);
      index += 2;
    });
  }

  return { createPlayer, createCPU };
})();

export default Player;
