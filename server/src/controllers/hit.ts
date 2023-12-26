import { type Middleware } from "koa";
import { getGame } from "../services/game";
import { scoreEngine } from "../services/scoreEngine";

export const hit: Middleware = async (ctx, _next) => {
  try {
    const game = await getGame(String(ctx.headers.authorization));
    const gameScore = scoreEngine(game);
    gameScore.hit();
    ctx.body = { game, message: gameScore.playState };
  } catch (error) {
    ctx.throw(401, { message: String(error) });
  }
};
