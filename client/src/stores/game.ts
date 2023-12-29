import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

export type Hand = {
  cards: string[]
  score: number[]
  finished: boolean
}

export const useGameStore = defineStore('game', () => {
  const token = ref('')
  const userMessage = ref('')
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

  return {token, userMessage, dealerHand, playerHand }
})
