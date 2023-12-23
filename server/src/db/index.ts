import { type Low } from "lowdb";
import { JSONPreset } from "lowdb/node";

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

const db = await JSONPreset<Schema>("game.json", defaultSchema);
/*
export const createConnection = async (): Promise<Low<Schema>> => {
  try {
    db = await JSONPreset<Schema>("game.json", defaultSchema);
  } catch (e) {
    // TODO: handle error
    console.error(e);
  }
  return db;
};
*/
export const getConnection = async (): Promise<Low<Schema>> => db;
