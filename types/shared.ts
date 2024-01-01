/**
 * @description
 * Shared types for the project are defined here.
 * These types will be used in the client and server code.
 *
 * Ideally we should publish our API types in a npm package and install it in both client and server.
 */


export type PlayerState = 'playing' | 'busted' | 'blackjack' | 'stand' | 'not-started'

/**
 * @typedef {Object} CardPlay
 * @property {string[]} cards list of cards used for the hand
 * @property {number[]} score the score of the picked cards, can be more than one if Ace are on the hand
 * @property {string} state the state of the player, can be 'stand', 'playing', 'busted' or 'blackjack'
 * @property {boolean} finished if the user has finished the game
 */
export type CardPlay = {
  cards: string[];
  score: number[];
  state: PlayerState
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
  message: PlayState;
  token: string
} & { game: Omit<Game, "deck"> };

export type PlayState = {
  code: typeof STATUS_CODES[keyof typeof STATUS_CODES];
  message: string;
};


const STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  USER_WIN: 2000,
  USER_PLAYING: 2100,
  DEALER_WIN: 4000,
  DEALER_PLAYING: 4100,
  DRAW: 3000,
  ONGOING: 1000,
  INIT: 0,
} as const;


export default STATUS_CODES;
