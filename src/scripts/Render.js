import Gameboard from "./Gameboard.js";
import PubSub from "./PubSub.js";

const Render = (() => {
  PubSub.on("playerBoardChanged", updatePlayerBoard);
  PubSub.on("enemyBoardChanged", updateEnemyBoard);
  PubSub.on("playerWon", endGame);
  PubSub.on("computerWon", endGame);

  const leftBoard = document.querySelector("#left-board");
  const rightBoard = document.querySelector("#right-board");
  const startButton = document.querySelector(".start-game-button");

  rightBoard.addEventListener("click", attackBoard);
  startButton.addEventListener("click", startGame);

  let gameRunning;
  let playerBoard;

  function startGame() {
    if (gameRunning) return;
    gameRunning = true;
    PubSub.emit("gameStarted");
  }

  function endGame() {
    gameRunning = false;
    PubSub.emit("gameEnded");
  }

  function updatePlayerBoard(board) {
    const boardElement = renderBoard(board);
    leftBoard.innerHTML = boardElement.innerHTML;
    playerBoard = board;
  }

  function updateEnemyBoard(board) {
    const boardElement = renderBoard(board);
    rightBoard.innerHTML = boardElement.innerHTML;
  }

  function renderBoard(board) {
    const boardElement = document.createElement("div");
    boardElement.classList += "grid";

    for (let i = 0; i < board.length; i++) {
      const rowElement = makeRow();
      for (let j = 0; j < board[i].length; j++) {
        const element = makeCell(board[i][j]);
        element.dataset.x = i;
        element.dataset.y = j;
        rowElement.appendChild(element);
      }
      boardElement.appendChild(rowElement);
    }

    return boardElement;
  }

  function makeRow() {
    const element = document.createElement("div");
    element.classList += "grid-row";

    return element;
  }

  function makeCell(cell) {
    const element = document.createElement("div");
    element.classList += "grid-cell";
    if (cell) {
      element.classList.add(cell);
    }
    return element;
  }

  function getCoordinates(element) {
    const data = element.dataset;
    const x = parseInt(data.x);
    const y = parseInt(data.y);
    const coord = [x, y];
    return coord;
  }

  function attackBoard(event) {
    if (!gameRunning) {
      return;
    }
    const coord = getCoordinates(event.target);
    PubSub.emit("enemyBoardAttacked", coord);
  }
})();

export default Render;
