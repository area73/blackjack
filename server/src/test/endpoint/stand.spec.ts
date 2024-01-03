import { type Game } from "@@/shared";
import supertest from "supertest";
import { beforeEach, describe, expect, it } from "vitest";
import { app } from "../../app";
import { literals } from "../../lang";

describe("stand endpoint", () => {
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  const req = supertest(app.callback());

  describe("On valid token", () => {
    let token: string;
    beforeEach(async () => {
      const initialResponse = await req.get("/new-game");
      token = initialResponse.body.token;
    });
    it("should stand user", async () => {
      const response = await req.get("/stand").set("Authorization", token);
      const game = response.body.game as Game;
      expect(game.user.state).toBe("stand");
    })
  });

  describe("On invalid token", () => {
    it("should return a not allow response if token not send", async () => {
      const response = await req.get("/stand");
      expect(response.status).toBe(401);
      const errorMessage = response.text;
      expect(errorMessage).toContain(literals.en.error.gameNotFound);
    });
    it("should return a not allow response if token not valid", async () => {
      const response = await req
        .get("/stand")
        .set("Authorization", "not valid token");
      expect(response.status).toBe(401);
      const errorMessage = response.text;
      expect(errorMessage).toContain(literals.en.error.gameNotFound);
    });
  });
});
