import request from "supertest";
import { beforeEach, describe, expect, it } from "vitest";
import { app } from "../../app";
import { type Game } from "../../db";
import { literals } from "../../lang";

describe("hit endpoint", () => {
  const req = request(app.listen(4000));

  describe("On valid token", () => {
    let token: string;
    beforeEach(async () => {
      const initialResponse = await req.get("/new-game");
      token = initialResponse.body.token;
    });
    it("should return a json file containing a game with the new card", async () => {
      const response = await req.get("/hit").set("Authorization", token);
      expect(response.body).toHaveProperty("game");
      const game = response.body.game as Game;
      expect(game.user.cards.length).toBe(3);
    });
    it("should return a not allow response if trying to get more cards than needed", async () => {
      let response = await req.get("/hit").set("Authorization", token);
      console.log(response.body.game.user.finished);
      while (response.status !== 401) {
        response = await req.get("/hit").set("Authorization", token);
      }
      expect(response.status).toBe(401);
    });
  });

  describe("On invalid token", () => {
    it("should return a not allow response if token not send", async () => {
      const response = await req.get("/hit");
      expect(response.status).toBe(401);
      const errorMessage = response.text;
      expect(errorMessage).toContain(literals.en.error.gameNotFound);
    });
    it("should return a not allow response if token not valid", async () => {
      const response = await req
        .get("/hit")
        .set("Authorization", "not valid token");
      expect(response.status).toBe(401);
      const errorMessage = response.text;
      expect(errorMessage).toContain(literals.en.error.gameNotFound);
    });
  });
});
