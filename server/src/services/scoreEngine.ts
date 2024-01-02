import type { Game, PlayerState, PlayState } from "@@/shared";
import { STATUS_CODES } from "../config";
import { literals } from "../lang";

export type Player = "user" | "dealer";

const DEALER_MIN_SCORE = 17;

export type ScoreEngine = {
  game: Game;
  stand: () => boolean;
  hit: () => string | null;
  initGame: () => Game;
  getPlayState: () => PlayState;
};


export const scoreEngine = (gameParam: Game): ScoreEngine => {
  const game = { ...gameParam };
  // Checking if the current user is the player or the dealer
  const actualPlayer = (): Player => game.user.state === "playing" ? "user" : "dealer";

  const checkIfBusted = (player: Player): boolean => {
    const playerScore = game[player].score;
    return playerScore.every((score) => score > 21);
  };

  const checkIfStand = (player: Player): boolean => game[player].state === "stand";

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
      const player = actualPlayer();
      // get card from deck
      const card = getCardFromDeck();
      // add it to player
      addCardToPlayer(card, player);
      // calculate score for player
      game[player].score = updateScore(player);
      // set new state for player
      game[player].state = updateState(player);

      return card;
    }
  };

  const updateState = (player: Player): PlayerState => {
    const playerScore = game[player].score;
    const messageMap: Record<PlayerState, boolean> = {
      busted: playerScore.every((score) => score > 21),
      stand: playerScore.some((score) => score === 21) || player === 'dealer' && playerScore.every((score) => score >= DEALER_MIN_SCORE),
      // black jack is an special case, we need to check if the player has 2 cards and the score is 21
      blackjack: playerScore[0] === 21 && game[player].cards.length === 2,
      playing: game[player].cards.length > 0,
      "not-started": true
    };
    return Object.keys(messageMap).find((state: PlayerState) => messageMap[state]) as PlayerState;
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
      game[actualPlayer()].state = "stand";
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

  const updateScore = (player: Player): number[] => {
    const cards = game[player].cards;
    const hasAce = cards.some((card) => card.substring(2) === "A");
    const score = cards.reduce((acc, card) => {
      const cardScore = getCardScore(card);
      return acc + cardScore;
    }, 0);
    const combinedScore = hasAce
      ? [score, score + 10].filter((score, idx) => idx === 0 || score <= 21)
      : [score];
    return combinedScore;
  };

  /**
   * When a game is initialize we need to give 2 cards to each dealer and  player
   */
  const initGame = (): Game => {
    // reset previous cards
    game.user.cards = [];
    game.dealer.cards = [];
    addCardToPlayer(getCardFromDeck(), "user"); // hand one card to user
    addCardToPlayer(getCardFromDeck(), "user"); // hand one card to user
    addCardToPlayer(getCardFromDeck(), "dealer"); // hand one card to dealer
    // calculate score for each player
    game.user.score = updateScore("user");
    game.dealer.score = updateScore("dealer");
    // set state for each player
    game.user.state = updateState("user");
    game.dealer.state = updateState("dealer");
    return game;
  };

  const removeBustedSplit = (score: number[]): number[] => {
    return score.filter((score) => score <= 21).sort((a, b) => b - a);
  }

  /**
   * This function will return the state of the game
   * @returns {PlayState} the state of the game
   */
  const getPlayState = (): PlayState => {
    // if game not started
    if (game.user.state === "not-started") {
      return {
        code: STATUS_CODES.INIT,
        message: literals.en.game.newGame,
      };
    }
    // if dealer busted and user stand, user win
    if (checkIfStand("user") && checkIfBusted("dealer")) {
      return {
        code: STATUS_CODES.USER_WIN,
        message: literals.en.game.userWin,
      };
    }
    // if user busted, dealer win
    if (checkIfBusted("user")) {
      return {
        code: STATUS_CODES.DEALER_WIN,
        message: literals.en.game.dealerWin,
      };
    }
    // if both players stand, compare score
    if (checkIfStand("user") && checkIfStand("dealer")) {
      const userScore = removeBustedSplit(game.user.score);
      const dealerScore = removeBustedSplit(game.dealer.score);

      if (userScore[0] > dealerScore[0]) {
        return {
          code: STATUS_CODES.USER_WIN,
          message: literals.en.game.userWin,
        };
      }
      if (userScore[0] < dealerScore[0]) {
        return {
          code: STATUS_CODES.DEALER_WIN,
          message: literals.en.game.dealerWin,
        };
      }
      return {
        code: 3000,
        message: literals.en.game.draw,
      };
    }
    // if user not stand and not busted , user playing
    if (!checkIfStand("user") && !checkIfBusted("user")) {
      return {
        code: STATUS_CODES.USER_PLAYING,
        message: literals.en.game.userTurn,
      };
    }
    // if user stand and not busted and allow to hit, dealer playing
    if (checkIfStand("user") && !checkIfBusted("user") && !notAllowedToHit()) {
      return {
        code: STATUS_CODES.DEALER_PLAYING,
        message: literals.en.game.dealerTurn,
      };
    }

    return {
      code: 1000,
      message: literals.en.game.ongoing,
    };


  };

  return {
    game,
    stand,
    hit,
    initGame,
    getPlayState,
  };
};
