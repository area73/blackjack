/**
 * @fileoverview Language literals
 * @package
 * @module @lang/index
 * @license MIT
 * @version 0.0.1
 *
 * @typedef {Object} literals
 * @property {Object} error
 *
 * This file contains all the literals used in the application. My intention is to
 * centrallice all the literals in one place in order to make it easy to add new languages
 *
 */
export const literals = {
  en: {
    error: {
      notAllowed: "Not allowed",
      dbInit: "Error loading database",
      gameInit: "Error initializing game",
      gameNotFound: "Game not found",
      noMoreCards: "No more cards",
      notAllowedToStand: "Dealer is not allowed to stand",
    },
    game: {
      finished: "Game finished",
      userWin: "You win",
      userBust: "You bust",
      dealerWin: "Dealer wins",
      dealerBust: "Dealer bust",
      draw: "Draw",
      dealerTurn: "Dealer turn",
      userTurn: "Your turn",
      ongoing: "Game ongoing",
      newGame: "New Game started",
    },
  },
} as const;
