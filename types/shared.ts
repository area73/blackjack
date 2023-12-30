/**
 * @description
 * Shared types for the project are defined here.
 * These types will be used in the client and server code.
 *
 * Ideally we should publish our API types in a npm package and install it in both client and server.
 */

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

export type APIResponse = {
  message: string;
  token: string
} & { game: Omit<Game, "deck"> };
