import type { Game } from "@@/shared";
import { getConnection } from "../db";
import { literals } from "../lang";

export type CreateGameParams = {
  token: string;
  deck: string[];
};
/**
 *
 * @param {CreateGameParams}
 * @returns {Game}
 * Giving a token with a deck of cards, this function will create a new game
 */
export const createGame = ({
  token,
  deck,
}: CreateGameParams): Game => {
  const db = getConnection();
  const { games } = db.data;
  games.push({
    id: token,
    deck,
    user: { cards: [], score: [0], state: 'not-started' },
    dealer: { cards: [], score: [0], state: 'not-started' },
  });
  // if we want to persist data in file system we need to save it or else will be persisted only in memory
  // await db.write();
  const game = games.find((game) => game.id === token);
  if (game == null) {
    throw new Error(literals.en.error.gameInit);
  }
  return game;
};

export const getGame = (token: string): Game => {
  const db = getConnection();
  const { games } = db.data;
  const game = games.find((game) => game.id === token);
  if (game == null) {
    throw new Error(literals.en.error.gameNotFound);
  }
  return game;
};
