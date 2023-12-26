import { describe, expect, it } from "vitest";
import { type Game } from "../db";
import { literals } from "../lang";
import { scoreEngine } from "./scoreEngine";

describe("scoreEngine", () => {
  describe("calculateScore", () => {
    it("should calculate the score of the current play for the user", () => {
      const game: Game = {
        id: "abc",
        deck: ["S-2", "S-5", "H-10"],
        user: {
          cards: ["H-4", "D-3", "C-5", "D-9"],
          score: [0],
          finished: false,
        },
        dealer: {
          cards: [],
          score: [0],
          finished: false,
        },
      };
      const currentEngine = scoreEngine(game);
      const score = currentEngine.calculateScore("user");

      expect(score).toStrictEqual([21]);
    });
    it("should calculate the score of the current play for the dealer", () => {
      const game: Game = {
        id: "abc",
        deck: ["S-2", "S-5", "H-10"],
        user: {
          cards: ["H-9", "D-9", "D-9"],
          score: [0],
          finished: false,
        },
        dealer: {
          cards: ["H-4", "D-3", "C-5", "D-9"],
          score: [0],
          finished: false,
        },
      };
      const currentEngine = scoreEngine(game);
      const score = currentEngine.calculateScore("dealer");

      expect(score).toStrictEqual([21]);
    });
    it("should return an array of 2 possible score when there is an Ace on the hand and both scores are not busted", () => {
      const game: Game = {
        id: "abc",
        deck: ["S-2", "S-5", "H-10"],
        user: {
          cards: ["H-3", "D-A", "C-5", "D-2"],
          score: [0],
          finished: false,
        },
        dealer: {
          cards: ["c"],
          score: [0],
          finished: false,
        },
      };
      const currentEngine = scoreEngine(game);
      const score = currentEngine.calculateScore("user");

      expect(score).toStrictEqual([11, 21]);
    });
    it("should return an array of 2 possible score when there are more than 1 Ace on the hand and none score is busted", () => {
      const game: Game = {
        id: "abc",
        deck: ["S-2", "S-5", "H-10"],
        user: {
          cards: ["S-A", "H-A", "D-A", "C-2", "H-6"],
          score: [0],
          finished: false,
        },
        dealer: {
          cards: ["c"],
          score: [0],
          finished: false,
        },
      };
      const currentEngine = scoreEngine(game);
      const score = currentEngine.calculateScore("user");

      expect(score).toStrictEqual([11, 21]);
    });
    it("should return an array of 1 possible score when there are more than 1 Ace on the hand and some score is busted", () => {
      const game: Game = {
        id: "abc",
        deck: ["S-2", "S-5", "H-10"],
        user: {
          cards: ["S-A", "H-A", "D-A", "C-5", "H-6"],
          score: [0],
          finished: false,
        },
        dealer: {
          cards: ["c"],
          score: [0],
          finished: false,
        },
      };
      const currentEngine = scoreEngine(game);
      const score = currentEngine.calculateScore("user");

      expect(score).toStrictEqual([14]);
    });
  });
  describe("hit", () => {
    it("should remove the card from the beginning of the deck and add it to the player hand", () => {
      const game: Game = {
        id: "abc",
        deck: ["S-2", "S-5", "H-10"],
        user: {
          cards: [],
          score: [0],
          finished: false,
        },
        dealer: {
          cards: [],
          score: [0],
          finished: false,
        },
      };
      const currentEngine = scoreEngine(game);
      currentEngine.hit();
      expect(game.deck).toStrictEqual(["S-5", "H-10"]);
      expect(game.user.cards).toStrictEqual(["S-2"]);
    });
    it("should throw an error if there are no more cards", () => {
      const game: Game = {
        id: "abc",
        deck: [],
        user: {
          cards: [],
          score: [0],
          finished: false,
        },
        dealer: {
          cards: [],
          score: [0],
          finished: false,
        },
      };
      const currentEngine = scoreEngine(game);
      expect(() => {
        currentEngine.hit();
      }).toThrowError(literals.en.error.noMoreCards);
    });
    it("should add a new card to the player hand", () => {
      const game: Game = {
        id: "abc",
        deck: ["S-2", "S-5", "H-10"],
        user: {
          cards: ["S-3"],
          score: [0],
          finished: false,
        },
        dealer: {
          cards: [],
          score: [0],
          finished: false,
        },
      };
      const currentEngine = scoreEngine(game);
      currentEngine.hit();
      expect(game.deck).toStrictEqual(["S-5", "H-10"]);
      expect(game.user.cards).toStrictEqual(["S-3", "S-2"]);
    });
    it("should not add a new card if the user is busted", () => {
      const game: Game = {
        id: "abc",
        deck: ["S-2", "S-5", "H-10"],
        user: {
          cards: ["S-3", "S-4", "S-5"],
          score: [22, 27],
          finished: false,
        },
        dealer: {
          cards: [],
          score: [0],
          finished: false,
        },
      };
      const currentEngine = scoreEngine(game);
      currentEngine.hit();
      expect(game.deck).toStrictEqual(["S-5", "H-10"]);
      expect(game.user.cards).toStrictEqual(["S-3", "S-4", "S-5"]);
    });
    it("should not add a new card if the user has already finished", () => {
      const game: Game = {
        id: "abc",
        deck: ["S-2", "S-5", "H-10"],
        user: {
          cards: ["S-3", "S-4", "S-5"],
          score: [12],
          finished: true,
        },
        dealer: {
          cards: [],
          score: [0],
          finished: false,
        },
      };
      const currentEngine = scoreEngine(game);
      currentEngine.hit();
      expect(game.deck).toStrictEqual(["S-5", "H-10"]);
      expect(game.user.cards).toStrictEqual(["S-3", "S-4", "S-5"]);
    });
    it("should add a new card to the dealer if the user has finish his turn", () => {
      const game: Game = {
        id: "abc",
        deck: ["S-2", "S-5", "H-10"],
        user: {
          cards: ["S-3", "S-4", "S-5"],
          score: [12],
          finished: true,
        },
        dealer: {
          cards: ["S-9"],
          score: [0],
          finished: false,
        },
      };
      const currentEngine = scoreEngine(game);
      currentEngine.hit();
      expect(game.deck).toStrictEqual(["S-5", "H-10"]);
      expect(game.dealer.cards).toStrictEqual(["S-9", "S-2"]);
    });
    it("should not add a new card if the dealer's score is higher than 16", () => {
      const game: Game = {
        id: "abc",
        deck: ["S-2", "S-5", "H-10"],
        user: {
          cards: ["S-3", "S-4", "S-5"],
          score: [12],
          finished: true,
        },
        dealer: {
          cards: ["S-9", "S-8"],
          score: [17],
          finished: false,
        },
      };
      const currentEngine = scoreEngine(game);
      expect(() => {
        currentEngine.hit();
      }).toThrowError(literals.en.error.notAllowed);
    });
  });
  describe("stand", () => {
    it("should set the user as finished", () => {
      const game: Game = {
        id: "abc",
        deck: ["A-2", "A-5", "A-10"],
        user: {
          cards: ["A-3", "S-9", "A-5"],
          score: [18],
          finished: false,
        },
        dealer: {
          cards: ["H-7"],
          score: [7],
          finished: false,
        },
      };
      const currentEngine = scoreEngine(game);
      const isFinished = currentEngine.stand();
      expect(isFinished).toBe(true);
    });
    it("should set the dealer as finished", () => {
      const game: Game = {
        id: "abc",
        deck: ["A-2", "A-5", "A-10"],
        user: {
          cards: ["A-3", "S-9", "A-5"],
          score: [18],
          finished: true,
        },
        dealer: {
          cards: ["H-9", "S-9"],
          score: [18],
          finished: false,
        },
      };
      const currentEngine = scoreEngine(game);
      currentEngine.stand();
      expect(game.dealer.finished).toBe(true);
    });
    it("should NOT set the dealer as finished because is under minimun number", () => {
      const game: Game = {
        id: "abc",
        deck: ["A-2", "A-5", "A-10"],
        user: {
          cards: ["A-3", "S-9", "A-5"],
          score: [18],
          finished: true,
        },
        dealer: {
          cards: ["H-8", "S-8"],
          score: [16],
          finished: false,
        },
      };
      const currentEngine = scoreEngine(game);
      expect(() => {
        currentEngine.stand();
      }).toThrowError(literals.en.error.notAllowedToStand);
    });
  });
  describe("get state of the play", () => {
    it("should return a 2000 code if the user wins", () => {
      const game: Game = {
        id: "abc",
        deck: ["A-2", "A-5", "A-10"],
        user: {
          cards: ["A-2", "A-3", "S-9", "A-5"],
          score: [20],
          finished: true,
        },
        dealer: {
          cards: ["H-8", "S-8", "A-3"],
          score: [19],
          finished: true,
        },
      };
      const currentEngine = scoreEngine(game);
      const state = currentEngine.playState();
      expect(state.code).toBe(2000);
    });
    it("should return a 4000 code if the dealer wins", () => {
      const game: Game = {
        id: "abc",
        deck: ["A-2", "A-5", "A-10"],
        user: {
          cards: ["A-3", "S-9", "A-5"],
          score: [18],
          finished: true,
        },
        dealer: {
          cards: ["H-8", "S-8", "A-3"],
          score: [19],
          finished: true,
        },
      };
      const currentEngine = scoreEngine(game);
      const state = currentEngine.playState();
      expect(state.code).toBe(4000);
    });
    it("should return a 3000 if there is a tie", () => {
      const game: Game = {
        id: "abc",
        deck: ["A-2", "A-5", "A-10"],
        user: {
          cards: ["A-1", "S-8"],
          score: [9, 19],
          finished: true,
        },
        dealer: {
          cards: ["H-8", "S-8", "A-3"],
          score: [19],
          finished: true,
        },
      };
      const currentEngine = scoreEngine(game);
      const state = currentEngine.playState();
      expect(state.code).toBe(3000);
    });
  });
});
