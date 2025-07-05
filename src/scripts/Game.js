import Gameboard from "./Gameboard.js";
import Player from "./Player.js";

const Game = (() => {
  const player = Player.createPlayer();
  const computer = Player.createCPU();
  let currentPlayer = player;

  function attack(coord) {
    if (!Gameboard.isCoordValid(coord)) {
      return;
    }
    const opponent = currentPlayer == player ? computer : player;
    opponent.board.receiveAttack(coord);
    currentPlayer = opponent;
  }

  function reset() {}

  function getCurrentPlayer() {
    return currentPlayer.getName();
  }
  
  return { attack, reset, getCurrentPlayer };
})();

export default Game;
