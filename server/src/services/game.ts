import { getConnection, type Game } from "../db";
import { literals } from "../lang";

export type CreateGameParams = {
  token: string;
  deck: string[];
};

export const createGame = async ({
  token,
  deck,
}: CreateGameParams): Promise<Game> => {
  const db = await getConnection();
  const { games } = db.data;
  // we need to give one card to the dealer and one to the user
  games.push({
    id: token,
    deck,
    user: { cards: [], score: [0], finished: false },
    dealer: { cards: [], score: [0], finished: false },
  });
  // if we want to persist data in file system we need to save it or else will be persisted only in memory
  // await db.write();
  const game = games.find((game) => game.id === token);
  if (game == null) {
    throw new Error(literals.en.error.gameInit);
  }
  return game;
};

export const getGame = async (token: string): Promise<Game> => {
  const db = await getConnection();
  const { games } = db.data;
  const game = games.find((game) => game.id === token);
  if (game == null) {
    throw new Error(literals.en.error.gameNotFound);
  }
  return game;
};
