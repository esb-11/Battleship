import PubSub from "./PubSub.js";

const Render = (() => {
  PubSub.on("playerBoardChanged", updatePlayerBoard);
  PubSub.on("enemyBoardChanged", updateEnemyBoard);
  PubSub.on("playerWon", endGame);

  const leftBoard = document.querySelector("#left-board");
  const rightBoard = document.querySelector("#right-board");
  const startButton = document.querySelector(".start-game-button");

  leftBoard.addEventListener("click", moveShip);
  rightBoard.addEventListener("click", attackBoard);
  startButton.addEventListener("click", startGame);

  let gameRunning = false;

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
        element.dataset.y = j
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

  function moveShip(event) {}

  function attackBoard(event) {
    if (!gameRunning) {
      return;
    }
    const cell = event.target;
    const x = parseInt(cell.dataset.x);
    const y = parseInt(cell.dataset.y);
    PubSub.emit("enemyBoardAttacked", [x, y]);
  }
})();

export default Render;
