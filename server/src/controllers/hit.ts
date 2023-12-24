import { type Middleware } from "koa";
import { getGame } from "../services/game";
import { scoreEngine } from "../services/scoreEngine";

export const hit: Middleware = async (ctx, _next) => {
  const game = await getGame(String(ctx.headers.authorization));
  const gameScore = scoreEngine(game);

  ctx.body = { message: "New Game started" };
};
