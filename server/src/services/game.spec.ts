import { describe, expect, it } from "vitest";
import { literals } from "../lang";
import { createGame, getGame } from "./game";

describe(" game", () => {
  describe("createGame", () => {
    /**
     * Since we are using a in-memory database, we decide not to mock the getConnection function
     * since the is on side effect of the function and we want to test the whole flow
     */
    it("should create a new game", async () => {
      const game = await createGame({
        token: "test",
        deck: ["a", "b", "c"],
      });
      expect(game.id).toBe("test");
      expect(game.deck).toEqual(["a", "b", "c"]);
      expect(game.user).toEqual({ cards: [], score: [0], finished: false });
      expect(game.dealer).toEqual({
        cards: [],
        score: [0],
        finished: false,
      });
    });
  });
  describe("getGame", () => {
    it("should return a game", async () => {
      const game = await createGame({
        token: "test",
        deck: ["a", "b", "c"],
      });
      const gameFound = await getGame("test");
      expect(gameFound).toEqual(game);
    });
    it("should throw an error if game is not found", async () => {
      await expect(getGame("other token")).rejects.toThrowError(
        literals.en.error.gameNotFound
      );
    });
  });
});
