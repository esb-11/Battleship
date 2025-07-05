import Player from "../Player.js";

test("Correctly places the starting fleet", () => {
  const player = Player.createPlayer();
  let board = JSON.parse(player.board.getBoard()); 

  expect(board[0][0]).toBeTruthy();
  expect(board[1][0]).toBeTruthy();
  expect(board[2][0]).toBeTruthy();
  expect(board[3][0]).toBeTruthy();
  expect(board[4][0]).toBeTruthy();
  expect(board[5][0]).toBeFalsy();
});
