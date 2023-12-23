import { type Middleware } from "koa";
import { DECK } from "../config";
import { createGame } from "../services/createGame";
import { shuffleDeck } from "../services/deck";
import { generateToken } from "../services/token";
export const getNewGame: Middleware = async (ctx, _next) => {
  const token = generateToken();
  // set token into header to use it for our front end app
  ctx.set("Authorization", "Bearer " + token);
  // get a deck and shuffle
  const deck = shuffleDeck(DECK);
  const game = await createGame({ token, deck });
  ctx.body = { msg: "New Game started", game };
};
