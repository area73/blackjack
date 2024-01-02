
export const BASE_URL_API: string = import.meta.env.VITE_BASE_URL_API

export type API_URL = typeof API_URL[keyof typeof API_URL]

export const API_URL = {
  newGame: `${BASE_URL_API}/new-game/`,
  hit: `${BASE_URL_API}/hit/`,
  dealer: `${BASE_URL_API}/dealer/`,
  stand: `${BASE_URL_API}/stand/`
} as const
