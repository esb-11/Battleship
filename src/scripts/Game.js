import Gameboard from "./Gameboard.js";
import Player from "./Player.js";
import PubSub from "./PubSub.js";

const Game = (() => {
  PubSub.on("init", init);

  const player = Player.createPlayer();
  const computer = Player.createCPU();

  function init() {
    PubSub.emit("playerBoardChanged", player.board.getBoard());
    PubSub.emit("enemyBoardChanged", computer.board.getBoard());
    PubSub.on("enemyBoardAttacked", playerAttack);
  }

  function playerAttack(coord) {
    if (!Gameboard.isCoordValid(coord)) {
      return;
    }

    try {
      computer.board.receiveAttack(coord);
    } catch (error) {
      return;
    }

    PubSub.emit("enemyBoardChanged", computer.board.getBoard());

    if (computer.board.isEmpty()) {
      PubSub.emit("playerWon");
    }
  }

  function computerAttack() {
    const coord = computer.makeAtack();
    player.board.receiveAttack(coord);
    PubSub.emit("playerBoardChanged", player.board.getBoard());
  }

  function reset() {
    player.board.reset();
    computer.board.reset();
  }

  return { playerAttack, computerAttack, reset };
})();

export default Game;
