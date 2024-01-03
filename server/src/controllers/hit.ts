import type { APIResponse } from "@@/shared";
import { type Middleware } from "koa";
import { getGame } from "../services/game";
import { scoreEngine } from "../services/scoreEngine";

export const hit: Middleware = async (ctx, _next) => {
  try {
    const game = getGame(String(ctx.headers.authorization));
    const gameScore = scoreEngine(game);
    gameScore.hit();
    const apiResponse: APIResponse = { game: gameScore.getAPIGame(), message: gameScore.getPlayState(), token: game.id }
    console.log(`${JSON.stringify(apiResponse)}`.yellow)
    ctx.body = apiResponse;
  } catch (error) {
    ctx.throw(401, { message: String(error) });
  }
};
