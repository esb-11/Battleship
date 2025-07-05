import Game from "../Game.js";

test("Change the current player after each attack", () => {
  Game.attack([0, 0]);
  expect(Game.getCurrentPlayer()).toBe("Computer");
  Game.attack([0, 1]);
  expect(Game.getCurrentPlayer()).toBe("Player");
});
