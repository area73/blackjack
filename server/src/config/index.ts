export const NUMBER_OF_DECKS = 6 as const;
// Spades, Hearts, Diamonds, Clubs
const DECK_COLORS = ["S", "H", "D", "C"] as const;
const DECK_VALUES = [
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
] as const;

export const DECK = DECK_COLORS.map((color) =>
  DECK_VALUES.flatMap((value) => `${color}-${value}`)
).flat();


export const STATUS_CODES = {
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
