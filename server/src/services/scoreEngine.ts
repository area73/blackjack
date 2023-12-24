import { type Game } from "../db";

type UserTurn = "user" | "dealer";

export const scoreEngine = (gameParam: Game) => {
  const game = gameParam;
  /**
   * Checking if the next user is the player or the dealer
   */
  const userTurn: UserTurn = game.user.finished ? "dealer" : "user";

  /**
   * Adding a new card to the player or the dealer, based on the game state
   */
  /*
  const nextCard = () => {
    const card = game.deck.pop();
    if (card == null) {
      throw new Error(literals.en.error.noMoreCards);
    }
    game[userTurn].cards.push(card);
    game[userTurn].finished = checkBust();
    game[userTurn].score = calculateScore(userTurn);
  };

  const hit = () => {};

  const stand = () => {};
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

  const calculateScore = (userTurn: UserTurn): number[] => {
    // const score = game[userTurn].score;
    const cards = game[userTurn].cards;
    const hasAce = cards.some((card) => card.substring(2) === "A");
    const score = cards.reduce((acc, card) => {
      const cardScore = getCardScore(card);
      return acc + cardScore;
    }, 0);

    const combinedScore = hasAce ? [score, score + 10] : [score];
    return combinedScore.filter(isValidScore);
  };

  const isValidScore = (score: number): boolean => score <= 21;

  return {
    // b hit,
    // stand,
    // checkWinner,
    calculateScore,
  };
};
