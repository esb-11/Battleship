import Gameboard from "./Gameboard.js";
import Player from "./Player.js";
import PubSub from "./PubSub.js";

const Game = (() => {
  PubSub.on("init", init);

  const player = Player.createPlayer();
  const computer = Player.createCPU();

  function init() {
    PubSub.emit("playerBoardChanged", player.board.getBoard());
    PubSub.emit("computerBoardChanged", computer.board.getBoard());
  }

  function playerAttack(coord) {
    if (!Gameboard.isCoordValid(coord)) {
      return;
    }
    computer.board.receiveAttack(coord);
    PubSub.emit("playerBoardChanged", player.board.getBoard());
  }

  function computerAttack() {
    const coord = -computer.makeAtack();
    player.board.receiveAttack(coord);
    PubSub.emit("computerBoardChanged", computer.board.getBoard());
  }

  function reset() {}

  return { playerAttack, computerAttack, reset };
})();

export default Game;
