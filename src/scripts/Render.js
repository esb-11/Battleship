import PubSub from "./PubSub.js";

const Render = (() => {
  PubSub.on("playerBoardChanged", updatePlayerBoard);
  PubSub.on("enemyBoardChanged", updateEnemyBoard);

  const leftBoard = document.querySelector("#left-board");
  const rightBoard = document.querySelector("#right-board");

  leftBoard.addEventListener("click", moveShip);
  rightBoard.addEventListener("click", attackBoard);

  let gameRunning = false;

  function startGame() {
    gameRunning = true;
  }

  function endGame() {
    gameRunning = false;
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
    const cell = event.target;
    const x = parseInt(cell.dataset.x);
    const y = parseInt(cell.dataset.y);
    PubSub.emit("enemyBoardAttacked", [x, y]);
  }
})();

export default Render;
