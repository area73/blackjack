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
      unauthorized:  'You are not authorized to access this resource.',
      unknownError: 'Unknown error',
      forbidden: 'Forbidden',
      notFound: 'Not found',
      internalServerError: 'Internal server error'
    },



  },

} as const;
