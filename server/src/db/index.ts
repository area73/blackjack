import { type Low } from "lowdb";
import { JSONPreset } from "lowdb/node";

import { type Game } from "@@/shared";
import { join } from "path";
import { literals } from "../lang";


export type Schema = {
  games: Game[];
};

const defaultSchema: Schema = { games: [] };

// let db: Low<Schema>;

const getDB = async (): Promise<Low<Schema>> => {
  try {
    const db = await JSONPreset<Schema>(join("src", "db", "game.json"), defaultSchema);
    await db.write();
    return db
  } catch (error) {
    console.error(error);
    throw new Error(literals.en.error.dbInit);
  }
}
const dbOut = await getDB()

export const getConnection = (): Low<Schema> => dbOut;

