import PubSub from "./PubSub.js";

const Render = (() => {
  PubSub.on("playerBoardChanged", updatePlayerBoard);
  PubSub.on("computerBoardChanged", updateComputerBoard);

  const leftBoard = document.querySelector("#left-board");
  const rightBoard = document.querySelector("#right-board");

  let gameRunning = false;

  function startGame() {
    gameRunning = true;
  }

  function endGame() {
    gameRunning = false;
  }

  function updatePlayerBoard(board) {
    const boardElement = renderBoard(board);
    addPlayerEventListeners(boardElement);
    leftBoard.innerHTML = boardElement.innerHTML;
  }

  function updateComputerBoard(board) {
    const boardElement = renderBoard(board);
    addComputerEventListeners(boardElement);
    rightBoard.innerHTML = boardElement.innerHTML;
  }

  function renderBoard(board) {
    const boardElement = document.createElement("div");
    boardElement.classList += "board";

    for (const row of board) {
      const rowElement = makeRow();
      for (const cell of row) {
        const element = makeCell(cell);
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
      element.classList += cell;
    }
    return element;
  }

  function addPlayerEventListeners(board) {}

  function addComputerEventListeners(board) {}
})();

export default Render;

