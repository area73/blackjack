import { type Low } from "lowdb";
import { JSONPreset } from "lowdb/node";
import { literals } from "../lang";

import { join } from "path";
/**
 * @typedef {Object} CardPlay
 * @property {string[]} cards list of cards used for the hand
 * @property {number[]} score the score of the picked cards, can be more than one if Ace are on the hand
 * @property {boolean} finished if the user has finished the game
 */
export type CardPlay = {
  cards: string[];
  score: number[];
  finished: boolean;
};

/**
 * @typedef {Object} Game
 * @property {string} id the id of the game (Token)
 * @property {string[]} deck the deck used for the game
 * @property {CardPlay} user the user play
 * @property {CardPlay} dealer the dealer play
 */
export type Game = {
  id: string;
  deck: string[];
  user: CardPlay;
  dealer: CardPlay;
};

export type Schema = {
  games: Game[];
};

const defaultSchema: Schema = { games: [] };

let db: Low<Schema>;
try {
  db = await JSONPreset<Schema>(join("src", "db", "game.json"), defaultSchema);
  await db.write();
} catch (error) {
  console.error(error);
  throw new Error(literals.en.error.dbInit);
}

export const getConnection = async (): Promise<Low<Schema>> => db;
