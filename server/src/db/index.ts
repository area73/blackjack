import { type Low } from "lowdb";
import { JSONPreset } from "lowdb/node";

import { type Game } from "@@/shared";
import { join } from "path";


export type Schema = {
  games: Game[];
};

const defaultSchema: Schema = { games: [] };

let db: Low<Schema>;

const getDB = async (): Promise<Low<Schema>> => {
  try {
    db = await JSONPreset<Schema>(join("src", "db", "game.json"), defaultSchema);
    await db.write();
    return db
  } catch (error) {
    console.error(error);
    // throw new Error(literals.en.error.dbInit);
    throw new Error("error");
  }
}

export const getConnection = async (): Promise<Low<Schema>> => await getDB();
