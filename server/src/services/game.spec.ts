import { describe, expect, it } from "vitest";
import { literals } from "../lang";
import { createGame, getGame } from "./game";

describe(" game", () => {
  describe("createGame", () => {
    /**
     * Since we are using an in-memory database, we decide not to mock the getConnection function.
     * Because we are not accessing an external system our database has no side effect
     * and that way we can test the whole flow
     */
    it("should create a new game", () => {
      const game = createGame({
        token: "test",
        deck: ["a", "b", "c"],
      });
      expect(game.id).toBe("test");
      expect(game.deck).toEqual(["a", "b", "c"]);
      expect(game.user).toEqual({ cards: [], score: [0], state: 'not-started' });
      expect(game.dealer).toEqual({
        cards: [],
        score: [0],
        state: 'not-started',
      });
    });
  });
  describe("getGame", () => {
    it("should return a game", () => {
      const game = createGame({
        token: "test",
        deck: ["a", "b", "c"],
      });
      const gameFound = getGame("test");
      expect(gameFound).toEqual(game);
    });
    it("should throw an error if game is not found", () => {
      try {
        getGame("other token");
      } catch (error) {
        expect(error.message).toBe(literals.en.error.gameNotFound);
      }
    });
  });
});
