import { type Game } from "../db";
import { literals } from "../lang";

export type Player = "user" | "dealer";

const DEALER_MIN_SCORE = 17;

export type ScoreEngine = {
  game: Game;
  stand: () => boolean;
  calculateScore: (player: Player) => number[];
  hit: () => string;
  initGame: () => Game;
};

export const scoreEngine = (gameParam: Game): ScoreEngine => {
  const game = gameParam;
  /**
   * Checking if the current user is the player or the dealer
   */
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
   */
  const hit = (): string => {
    if (notAllowedToHit()) {
      throw new Error(literals.en.error.notAllowed);
    } else {
      // get card from deck
      const card = getCardFromDeck();
      // add it to player
      addCardToPlayer(card);
      // calculate score for player
      game[actualPlayer()].score = calculateScore(actualPlayer());
      return card;
    }
  };

  const isDealerNotAllowToStand = (): boolean => !notAllowedToHit();

  const stand = (): boolean => {
    if (actualPlayer() === "dealer" && isDealerNotAllowToStand()) {
      throw new Error(literals.en.error.notAllowedToStand);
    } else {
      game[actualPlayer()].finished = true;
      return true;
    }
  };

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
    return combinedScore.filter(isValidScore);
  };

  const isValidScore = (score: number): boolean => score <= 21;

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

  return {
    game,
    stand,
    calculateScore,
    hit,
    initGame,
  };
};
