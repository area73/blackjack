import { describe, expect, it } from "vitest";
import { DECK } from "../config";
import { shuffleDeck } from "./deck";

describe("shuffleDeck", () => {
  it("should return an array of strings of same length than the one given", () => {
    const deckShuffled = shuffleDeck(["a", "b", "c"]);
    expect(deckShuffled.length).toBe(3);
  });
  it("should shuffle a given array of strings", () => {
    const deckShuffled = shuffleDeck(DECK);
    // Check if the shuffled deck contains all the elements from the original deck
    DECK.forEach((card) => {
      expect(deckShuffled).toContain(card);
    });
    // Check if the shuffled deck is not in the same order as the original
    expect(deckShuffled).not.toEqual(DECK);
  });
});
