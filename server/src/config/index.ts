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
