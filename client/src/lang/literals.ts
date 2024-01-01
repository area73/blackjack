/**
 * This file is ment to centralize all the literal that we have on the app.
 * This is a good practice to avoid typos and to have a central place to change the literals.
 *
 * In a more elaborated app, we could have a literal file for each lang (JSON) and use an external service for
 * translations like Phrase.
 */
export const literals = {
  en: {
    error: {
      1: {
        reason: "Unknown error, probably a network error.",
        hint: 'Did you start the server?'
      },
      401: {
        reason: "You are trying to acces to a resource that you are not authorized.",
        hint: 'Are you trying to cheat?'
      },
      404: {
        reason: 'Resource not found',
        hint: 'This is like Jhon Travolta in Pulp Fiction, you know?'
      },
      500: {
        reason: "Internal server error",
        hint: 'Who knows what happened?'
      }
    }
  },

} as const;
