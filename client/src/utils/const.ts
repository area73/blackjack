import { literals } from "@/lang/literals";

export const BASE_URL_API: string = import.meta.env.VITE_BASE_URL_API

export type API_URL = typeof API_URL[keyof typeof API_URL]

export const API_URL = {
  newGame: `${BASE_URL_API}/new-game/`,
  hit: `${BASE_URL_API}/hit/`,
  dealer: `${BASE_URL_API}/dealer/`,
  stand: `${BASE_URL_API}/stand/`
} as const

export const ERROR_MESSAGES = {
  1: literals.en.error.unknownError,
  401: literals.en.error.unauthorized,
  403: literals.en.error.forbidden,
  404: literals.en.error.notFound,
  500: literals.en.error.internalServerError,
} as const;

