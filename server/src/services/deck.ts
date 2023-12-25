/**
 *
 * @param deck string[]
 * @returns deck string[]
 *
 * This function will shuffle the deck of cards using the Fisher-Yates algorithm
 * https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
 *
 */
export const shuffleDeck = (deck: string[]): string[] => {
  const shuffledDeck = [...deck];
  for (let i = shuffledDeck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledDeck[i], shuffledDeck[j]] = [shuffledDeck[j], shuffledDeck[i]];
  }
  return shuffledDeck;
};
