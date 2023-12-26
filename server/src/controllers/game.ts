import "colors";
import { type Middleware } from "koa";
import { DECK } from "../config";
import { literals } from "../lang";
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
  const game = await createGame({ token, deck });
  const engine = scoreEngine(game);
  const play = engine.initGame();
  // For security we will remove the deck from the response
  const initialPlay = { ...play, deck: undefined };
  ctx.body = { message: literals.en.game.newGame, game: initialPlay, token };
};
