import "colors";
import { type Middleware } from "koa";
import { DECK } from "../config";
import { shuffleDeck } from "../services/deck";
import { createGame } from "../services/game";
import { generateToken } from "../services/token";

export const getNewGame: Middleware = async (ctx, _next) => {
  const token = generateToken();
  // set token into header to use it for our front end app
  ctx.set("Authorization", token);
  // get a deck and shuffle
  const deck = shuffleDeck(DECK);
  // generate a new game
  const game = await createGame({ token, deck });
  console.log(`${JSON.stringify(game)}`.green.bgBlack);
  ctx.body = { message: "New Game started" };
};
