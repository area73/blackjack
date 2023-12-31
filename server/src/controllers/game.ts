import type { APIResponse } from "@@/shared";
import "colors";
import { type Middleware } from "koa";
import { DECK } from "../config";
import { shuffleDeck } from "../services/deck";
import { createGame } from "../services/game";
import { scoreEngine } from "../services/scoreEngine";
import { generateToken } from "../services/token";

export const getNewGame: Middleware = async (ctx, _next) => {
  const token = generateToken();
  // set token into header to use it for our front end app
  ctx.set("Authorization", token);
  // get a deck and shuffle
  const deck = shuffleDeck(DECK);
  // generate a new game
  const game = createGame({ token, deck });
  const gameScore = scoreEngine(game);
  gameScore.initGame();
  // For security we will remove the deck from the response
  const apiResponse: APIResponse = { message: gameScore.getPlayState(), game: gameScore.getAPIGame(), token };
  // only for debugging purposes
  console.log(`${JSON.stringify(apiResponse)}`.yellow)
  ctx.body = apiResponse;
};
