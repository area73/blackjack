import supertest from "supertest";
import { describe, expect, it } from "vitest";
import { app } from "../../app";

describe("new-game endpoint", () => {
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  const req = supertest(app.callback());
  it("should return a ok response", async () => {
    await req.get("/new-game").expect(200);
  });
  it("should return a json file containing a game", async () => {
    const response = await req.get("/new-game");
    expect("Content-Type", "json");
    expect(response.body).toHaveProperty("game");
  });

  it("should return a json file containing a game with 2 card on user's hand", async () => {
    const response = await req.get("/new-game");
    expect("Content-Type", "json");
    const numOfCards = response.body.game.user.cards.length;
    expect(numOfCards).toBe(2);
  });

  it("should return a json file containing a game with 2 card on dealer's hand", async () => {
    const response = await req.get("/new-game");
    expect("Content-Type", "json");
    const numOfCards = response.body.game.dealer.cards.length;
    expect(numOfCards).toBe(2);
  });

  it("should return a json file containing a game with user's core", async () => {
    const response = await req.get("/new-game");
    expect("Content-Type", "json");
    const score = response.body.game.user.score[0];
    expect(score).toBeGreaterThan(0);
  });

  it("should return a json file containing a game with dealer's core", async () => {
    const response = await req.get("/new-game");
    expect("Content-Type", "json");
    const score = response.body.game.dealer.score[0];
    expect(score).toBeGreaterThan(0);
  });

  it("should return a json file containing a message", async () => {
    const response = await req.get("/new-game");
    expect("Content-Type", "json");
    expect(response.body).toHaveProperty("message");
  });
  it("should return a json file containing a token to be used in future calls", async () => {
    const response = await req.get("/new-game");
    expect("Content-Type", "json");
    expect(response.body).toHaveProperty("token");
  });
});
