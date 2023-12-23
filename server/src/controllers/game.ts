import { type Middleware } from "koa";
import { getConnection } from "../db";
import { generateToken } from "../services/token";

export const getNewGame: Middleware = async (ctx, _next) => {
  const { data } = await getConnection();
  const token = generateToken();
  // set token into header
  ctx.set("Authorization", "Bearer " + token);
  // add token into singleton with deck
  data.games.push({
    id: token,
    deck: ["shuffle deck max of 42"],
    user: { cards: [], punctuation: 0, finished: false },
    dealer: { cards: [], punctuation: 0, finished: false },
  });

  const post = data.games.find((p) => p.id === token);
  ctx.body = { msg: "New Game started", post };
};
