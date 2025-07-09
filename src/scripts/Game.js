import Gameboard from "./Gameboard.js";
import Player from "./Player.js";
import PubSub from "./PubSub.js";

const Game = (() => {
  PubSub.on("init", init);

  const player = Player.createPlayer();
  const computer = Player.createPlayer();

  function init() {
    PubSub.emit("playerBoardChanged", player.board.revealBoard());
    PubSub.emit("enemyBoardChanged", computer.board.getBoard());
    PubSub.on("enemyBoardAttacked", playerAttack);
    PubSub.on("gameStarted", reset);
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

    computerAttack();
  }

  function computerAttack() {
    let coord = Player.randomAttack();

    while (!player.board.canAttack(coord)) {
      coord = Player.randomAttack();
    }

    player.board.receiveAttack(coord);
    PubSub.emit("playerBoardChanged", player.board.revealBoard());

    if (player.board.isEmpty()) {
      PubSub.emit("computerWon");
    }
  }

  function reset() {
    player.reset();
    computer.reset();
    PubSub.emit("playerBoardChanged", player.board.revealBoard());
    PubSub.emit("enemyBoardChanged", computer.board.getBoard());
  }

  return { playerAttack, computerAttack, reset };
})();

export default Game;
