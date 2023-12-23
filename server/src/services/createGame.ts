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

  games.push({
    id: token,
    deck,
    user: { cards: [], punctuation: 0, finished: false },
    dealer: { cards: [], punctuation: 0, finished: false },
  });
  // if we want to persist data in file system we need to save it or else will be persisted only in memory
  await db.write();
  const post = games.find((game) => game.id === token);
  if (post == null) {
    throw new Error(literals.en.error.gameInit);
  }
  return post;
};
