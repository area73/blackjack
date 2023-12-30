import type { Game } from "@@/shared";
import { literals } from "../lang";

export type Player = "user" | "dealer";

const DEALER_MIN_SCORE = 17;

export type ScoreEngine = {
  game: Game;
  stand: () => boolean;
  calculateScore: (player: Player) => number[];
  hit: () => string | null;
  initGame: () => Game;
  playState: () => PlayState;
};

export type PlayState = {
  code: number;
  message: string;
};

export const scoreEngine = (gameParam: Game): ScoreEngine => {
  const game = gameParam;
  // Checking if the current user is the player or the dealer
  const actualPlayer = (): Player =>
    game.user.finished || checkIfBusted("user") ? "dealer" : "user";

  const checkIfBusted = (player: Player): boolean => {
    const playerScore = game[player].score;
    return playerScore.every((score) => score > 21);
  };

  const notAllowedToHit = (): boolean =>
    actualPlayer() !== "user" &&
    game.dealer.score.every((score) => score >= DEALER_MIN_SCORE);

  const getCardFromDeck = (): string => {
    const card = game.deck.shift();
    if (card == null) {
      throw new Error(literals.en.error.noMoreCards);
    }
    return card;
  };

  const addCardToPlayer = (card: string, player?: Player): void => {
    const selectedPlayer = player ?? actualPlayer();
    game[selectedPlayer].cards.push(card);
  };
  /**
   * Adding a new card to the player or the dealer, based on the game state
   * @returns {string | null} the new card
   */
  const hit = (): string | null => {
    if (notAllowedToHit()) {
      throw new Error(literals.en.error.notAllowed);
    } else {
      if (!game[actualPlayer()].finished) {
        const player = actualPlayer();
        // get card from deck
        const card = getCardFromDeck();
        // add it to player
        addCardToPlayer(card, player);
        // calculate score for player
        game[player].score = calculateScore(player);
        // set player as finished if busted
        checkIfBusted(player) && (game[player].finished = true);
        return card;
      }
      return null;
    }
  };

  const isDealerNotAllowToStand = (): boolean => !notAllowedToHit();

  /**
   * If the player is the dealer, he can stand only if he has a score greater than 17
   * If the player is the user, he can stand only if he has not busted
   * @returns {boolean} true if the player can stand, false otherwise
   */
  const stand = (): boolean => {
    if (actualPlayer() === "dealer" && isDealerNotAllowToStand()) {
      throw new Error(literals.en.error.notAllowedToStand);
    } else {
      game[actualPlayer()].finished = true;
      return true;
    }
  };

  /**
   * Giving a card, this function will return the score of the card
   * @param {string} cardParam
   * @returns {number} the score of the card
   */

  const getCardScore = (cardParam: string): number => {
    const card = cardParam.substring(2);
    if (card === "A") {
      return 1;
    }
    if (["J", "Q", "K"].includes(card)) {
      return 10;
    }
    return Number(card);
  };

  const calculateScore = (player: Player): number[] => {
    const cards = game[player].cards;
    const hasAce = cards.some((card) => card.substring(2) === "A");
    const score = cards.reduce((acc, card) => {
      const cardScore = getCardScore(card);
      return acc + cardScore;
    }, 0);
    const combinedScore = hasAce ? [score, score + 10] : [score];
    return combinedScore;
  };

  /**
   * When a game is initialize we need to give 2 cards to each dealer and  player
   */
  const initGame = (): Game => {
    addCardToPlayer(getCardFromDeck(), "user"); // hand one card to user
    addCardToPlayer(getCardFromDeck(), "user"); // hand one card to user
    addCardToPlayer(getCardFromDeck(), "dealer"); // hand one card to dealer
    addCardToPlayer(getCardFromDeck(), "dealer"); // hand one card to dealer
    // calculate score for each player
    game.user.score = calculateScore("user");
    game.dealer.score = calculateScore("dealer");
    return game;
  };

  /**
   * This function will return the state of the game
   * @returns {PlayState} the state of the game
   */
  const playState = (): PlayState => {
    // if user busted, dealer win
    if (checkIfBusted("user")) {
      return {
        code: 4000,
        message: literals.en.game.dealerWin,
      };
    }
    // if dealer busted, user win
    if (checkIfBusted("dealer")) {
      return {
        code: 2000,
        message: literals.en.game.dealerWin,
      };
    }
    const { user, dealer } = game;
    const { finished: userFinished, score: userScore } = user;
    const { finished: dealerFinished, score: dealerScore } = dealer;

    // if user stand, dealer play
    if (userFinished && dealerFinished) {
      const lastUserScore = userScore[userScore.length - 1];
      const lastDealerScore = dealerScore[dealerScore.length - 1];

      if (lastUserScore === lastDealerScore) {
        return {
          code: 3000,
          message: literals.en.game.draw,
        };
      }

      const userWins = lastUserScore > lastDealerScore;

      return {
        code: userWins ? 2000 : 4000,
        message: userWins
          ? literals.en.game.userWin
          : literals.en.game.dealerWin,
      };
    }
    // any other state is an active game
    return {
      code: 1000,
      message: literals.en.game.ongoing,
    };
  };

  return {
    playState,
    game,
    stand,
    calculateScore,
    hit,
    initGame,
  };
};
