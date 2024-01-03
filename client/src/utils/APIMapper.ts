/**
 * @description This file contains the API Mapper for the client side
 *
 * We are using the Object Mapper pattern to map the API responses to our custom types and vice-versa
 *
 * This is a handy way of centralize external API responses and avoid to have to deal with them in
 * different parts of the code
 */

import type { useGameStore } from "@/stores/game"
import type { APIResponse } from "@@/shared"

type GameStore = ReturnType<typeof useGameStore>

const fromAPI = (apiResponse: APIResponse): GameStore => {
  return {
    token: apiResponse.token,
    dealerHand: apiResponse.game.dealer,
    playerHand: apiResponse.game.user,
    userMessage: apiResponse.message,
  } as GameStore
}



export const APIMapper = { fromAPI }





