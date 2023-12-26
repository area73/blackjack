/**
 * A function that generate a random string to been used as a token to keep track of the game
 * @returns {string} a random string
 */
export const generateToken = (): string => {
  return Math.random().toString(36).substring(2);
};
