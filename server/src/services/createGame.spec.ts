import { describe, expect, it } from "vitest";
import { createGame } from "./createGame";

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
