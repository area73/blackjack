import { defineStore } from 'pinia'
import { computed, reactive, ref } from 'vue'

export type Hand = {
  cards: string[]
  score: number[]
  finished: boolean
}

export type GameState = 'init' | 'playerTurn' | 'dealerTurn' | 'finished'

export const useGameStore = defineStore('game', () => {
  const token = ref('')
  const userMessage = ref('')
  // const gameState = ref<GameState>('init')
  const dealerHand = reactive<Hand>({
    cards: [],
    score: [],
    finished: false
  })
  const playerHand =reactive<Hand>({
    cards: [],
    score: [],
    finished: false
  })

  const gameState= computed(() => {
    if (dealerHand.cards.length === 0 && playerHand.cards.length === 0) {
      return "init";
    }
    if (playerHand.finished) {
      return dealerHand.finished ? "finished" : "dealerTurn";
    }
    return "playerTurn";
  })

  return {gameState, token, userMessage, dealerHand, playerHand }
})
