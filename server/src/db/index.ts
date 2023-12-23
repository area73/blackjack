import { type Low } from "lowdb";
import { JSONPreset } from "lowdb/node";
import { literals } from "../lang";

import { join } from "path";

export type CardPlay = {
  cards: string[];
  punctuation: number;
  finished: boolean;
};

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
