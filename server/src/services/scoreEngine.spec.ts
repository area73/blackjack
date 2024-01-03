import { type Game } from "@@/shared";

import { beforeEach, describe, expect, it } from "vitest";
import { STATUS_CODES } from "../config";
import { literals } from "../lang";
import { scoreEngine } from "./scoreEngine";

let sampleGame: Game;
beforeEach(() => {
  sampleGame = {
    id: "abc",
    deck: ["S-2", "S-5", "H-10", "D-J", "H-K"],
    dealer: {
      cards: ["H-4", "D-3"],
      score: [7],
      state: "not-started"
    },
    user: {
      cards: ["H-3", "D-K"],
      score: [13],
      state: "playing"
    },
  };
})

describe("scoreEngine", () => {

  describe("init a game", () => {
    it("should return the given game without modifications", () => {
      const currentEngine = scoreEngine(sampleGame);
      expect(currentEngine.game).toStrictEqual(sampleGame);
    });
    it("should return the given game with new hands for user and dealer", () => {
      const previousGame = {
        user: {
          cards: ["H-3", "D-K"],
          score: [13],
          state: "playing"
        },
        dealer: {
          cards: ["H-4", "D-3"],
          score: [7],
          state: "not-started"
        },
      };
      const currentEngine = scoreEngine(sampleGame);
      currentEngine.initGame();
      expect(currentEngine.game.dealer.cards).not.toStrictEqual(previousGame.dealer.cards);
      expect(currentEngine.game.user.cards).not.toStrictEqual(previousGame.user.cards);
    });

  });
  describe("hit", () => {
    it("should remove the card from the beginning of the deck and add it to the player hand", () => {
      const game = { ...sampleGame }
      const currentEngine = scoreEngine(game);
      currentEngine.hit();
      expect(game.deck).toStrictEqual(["S-5", "H-10", "D-J", "H-K"]);
      expect(game.user.cards).toStrictEqual(["H-3", "D-K", "S-2"]);
    });
    it("should update the score of the user hand", () => {
      const game = { ...sampleGame }
      const currentEngine = scoreEngine(game);
      currentEngine.hit();
      expect(game.user.score).toStrictEqual([15]);
    });
    it("should update the score and split it if the user gets an ace", () => {
      const game = { ...sampleGame, deck: ["S-A", "H-10", "D-J", "H-K"] }
      const currentEngine = scoreEngine(game);
      currentEngine.hit();
      expect(game.user.score).toStrictEqual([14]);
    });
    it("should return an array of 2 possible score when there is an Ace on the hand and both scores are not busted", () => {
      const game: Game = {
        ...sampleGame,
        user: {
          ...sampleGame.user,
          cards: ["H-3", "D-A", "C-5", "D-2"],
        },
      };
      const currentEngine = scoreEngine(game)
      currentEngine.hit();
      expect(currentEngine.game.user.score).toStrictEqual([13]);
    });
    it("should throw an error if there are no more cards", () => {
      const game: Game = {
        ...sampleGame,
        deck: [],
      };
      const currentEngine = scoreEngine(game);
      expect(() => {
        currentEngine.hit();
      }).toThrowError(literals.en.error.noMoreCards);
    });
    it("Should finish user if busted after hit", () => {
      const game: Game = {
        ...sampleGame,
        deck: ["S-K", "S-2", "S-5", "H-10"],
      };
      const currentEngine = scoreEngine(game);
      currentEngine.hit();
      expect(game.user.state).toBe('busted');
    });

    it("should not add a new card to user if the user is busted", () => {
      const game: Game = {
        ...sampleGame,
        user: {
          cards: ["S-K", "D-Q", "H-J"],
          score: [30],
          state: "busted",
        },
      };
      const currentEngine = scoreEngine(game);
      currentEngine.hit();
      expect(game.user.cards).toStrictEqual(["S-K", "D-Q", "H-J"]);
    });
    it("should not add a new card to user if the user has already finished", () => {
      const game: Game = {
        ...sampleGame,
        user: {
          cards: ["S-K", "D-Q", "H-J"],
          score: [30],
          state: "stand",
        },
      };
      const currentEngine = scoreEngine(game);
      currentEngine.hit();
      expect(game.user.cards).toStrictEqual(["S-K", "D-Q", "H-J"],);
    });
    it("should add a new card to the dealer if the user has finish his turn", () => {
      const game: Game = {
        ...sampleGame,
        user: {
          cards: ["D-Q", "H-J"],
          score: [20],
          state: "stand",
        },
      };
      const currentEngine = scoreEngine(game);
      currentEngine.hit();
      expect(game.deck).toStrictEqual(["S-5", "H-10", "D-J", "H-K"]);
      expect(game.dealer.cards).toStrictEqual(["H-4", "D-3", "S-2"]);
    });
    it("should not add a new card if the dealer's score is higher than 16", () => {
      const game: Game = {
        id: "abc",
        deck: ["S-2", "S-5", "H-10"],
        user: {
          cards: ["S-3", "S-4", "S-5"],
          score: [12],
          state: 'stand',
        },
        dealer: {
          cards: ["S-9", "S-8"],
          score: [17],
          state: 'playing',
        },
      };
      const currentEngine = scoreEngine(game);
      expect(() => {
        currentEngine.hit();
      }).toThrowError(literals.en.error.notAllowed);
    });
    it("should return an array of 2 possible score when there are more than 1 Ace on the hand and none score is busted", () => {
      const game: Game = {
        ...sampleGame,
        user: {
          ...sampleGame.user,
          cards: ["S-A", "H-A", "D-A", "C-2"],
        },
      };
      const currentEngine = scoreEngine(game);
      currentEngine.hit();
      expect(currentEngine.game.user.score).toStrictEqual([7, 17]);
    });
    it("should return an array of 1 possible score when there are more than 1 Ace on the hand and some score is busted", () => {
      const game: Game = {
        ...sampleGame,
        user: {
          ...sampleGame.user,
          cards: ["S-A", "H-A", "D-A", "C-5", "H-6"],
        },
      };
      const currentEngine = scoreEngine(game);
      currentEngine.hit();
      expect(currentEngine.game.user.score).toStrictEqual([16]);
    });
  });
  describe("stand", () => {
    it("should set the user as stand", () => {
      const currentEngine = scoreEngine(sampleGame);
      const isFinished = currentEngine.stand();
      expect(isFinished).toBe(true);
      expect(sampleGame.user.state).toBe("stand");
    });
    it("should set the dealer as stand", () => {
      const game: Game = {
        ...sampleGame,
        dealer: {
          cards: ["H-K", "D-5"],
          score: [15],
          state: "playing"
        },
        user: {
          cards: ["A-3", "S-9", "A-5"],
          score: [18],
          state: 'stand',
        },
      };
      const currentEngine = scoreEngine(game);
      currentEngine.hit();
      expect(game.dealer.state).toBe("stand");
    });
    it("should NOT set the dealer as stand because is under minimun number and needs to hit more cards", () => {
      const game: Game = {
        ...sampleGame,
        user: {
          cards: ["A-3", "S-9", "A-5"],
          score: [18],
          state: "stand",
        },
        dealer: {
          cards: ["H-2", "S-2"],
          score: [6],
          state: "playing"
        },
      };
      const currentEngine = scoreEngine(game);
      expect(() => {
        currentEngine.stand();
      }).toThrowError(literals.en.error.notAllowedToStand);
    });
  });
  describe("get state of the play", () => {
    it("should return the state of the play when not started", () => {
      const game: Game = {
        ...sampleGame,
        user: {
          cards: [],
          score: [0],
          state: "not-started",
        },
        dealer: {
          cards: [],
          score: [0],
          state: "not-started",
        },
      };
      const currentEngine = scoreEngine(game);
      const playState = currentEngine.getPlayState();
      expect(playState.code).toBe(STATUS_CODES.INIT);
    });


    it("should return the state of the play", () => {
      const currentEngine = scoreEngine(sampleGame);
      const playState = currentEngine.getPlayState();
      expect(playState.message).toBeDefined();
      expect(playState.code).toBeDefined();
    });
    it("should return the state of the play when dealer is busted and user stand", () => {
      const game: Game = {
        ...sampleGame,
        user: {
          cards: ["S-K", "D-Q"],
          score: [20],
          state: "stand",
        },
        dealer: {
          cards: ["S-J", "D-4", "H-J"],
          score: [24],
          state: "busted",
        },
      };
      const currentEngine = scoreEngine(game);
      const playState = currentEngine.getPlayState();
      expect(playState.code).toBe(STATUS_CODES.USER_WIN);
    });
    it("should return the state of the play when the user is busted", () => {
      const game: Game = {
        ...sampleGame,
        user: {
          cards: ["S-K", "D-Q", "H-J"],
          score: [30],
          state: "busted",
        },
      };
      const currentEngine = scoreEngine(game);
      const playState = currentEngine.getPlayState();
      expect(playState.code).toBe(STATUS_CODES.DEALER_WIN);
    });
    it("should return the state of the play when the user and dealer stand and user's score is higher", () => {
      const game: Game = {
        ...sampleGame,
        user: {
          cards: ["S-K", "D-Q"],
          score: [20],
          state: "stand",
        },
        dealer: {
          cards: ["S-J", "D-4", "H-5"],
          score: [19],
          state: "stand",
        },
      };
      const currentEngine = scoreEngine(game);
      const playState = currentEngine.getPlayState();
      expect(playState.code).toBe(STATUS_CODES.USER_WIN);
    });
    it("should return the state of the play when the user and dealer stand and user's score is lower", () => {
      const game: Game = {
        ...sampleGame,
        user: {
          cards: ["S-K", "D-8"],
          score: [18],
          state: "stand",
        },
        dealer: {
          cards: ["S-J", "D-4", "H-5"],
          score: [19],
          state: "stand",
        },
      };
      const currentEngine = scoreEngine(game);
      const playState = currentEngine.getPlayState();
      expect(playState.code).toBe(STATUS_CODES.DEALER_WIN);
    });
    it("should return the state of the play when the user and dealer stand and user's score is equal", () => {
      const game: Game = {
        ...sampleGame,
        user: {
          cards: ["S-K", "D-9"],
          score: [19],
          state: "stand",
        },
        dealer: {
          cards: ["S-J", "D-4", "H-5"],
          score: [19],
          state: "stand",
        },
      };
      const currentEngine = scoreEngine(game);
      const playState = currentEngine.getPlayState();
      expect(playState.code).toBe(STATUS_CODES.DRAW);
    });
    it("should return the state of the play when the user is playing", () => {
      const currentEngine = scoreEngine(sampleGame);
      const playState = currentEngine.getPlayState();
      expect(playState.code).toBe(STATUS_CODES.USER_PLAYING);
    });
    it("should return the state of the play when the user is stand and dealer can play", () => {
      const game: Game = {
        ...sampleGame,
        user: {
          cards: ["S-K", "D-Q",],
          score: [20],
          state: "stand",
        },
      };
      const currentEngine = scoreEngine(game);
      const playState = currentEngine.getPlayState();
      expect(playState.code).toBe(STATUS_CODES.DEALER_PLAYING);
    });
    it("should return the state of Black Jack and user wins", () => {
      const game: Game = {
        ...sampleGame,
        user: {
          cards: ["S-K", "D-A",],
          score: [11, 21],
          state: "stand",
        },
      };
      const currentEngine = scoreEngine(game);
      const playState = currentEngine.getPlayState();
      expect(playState.code).toBe(STATUS_CODES.BLACK_JACK);
      expect(playState.message).toBe(literals.en.game.userWin);
    });
    it("should return the state of Black Jack and dealer wins", () => {
      const game: Game = {
        ...sampleGame,
        dealer: {
          cards: ["S-K", "D-A",],
          score: [11, 21],
          state: "stand",
        },
      };
      const currentEngine = scoreEngine(game);
      const playState = currentEngine.getPlayState();
      expect(playState.code).toBe(STATUS_CODES.BLACK_JACK);
      expect(playState.message).toBe(literals.en.game.dealerWin);
    });
  });
});




