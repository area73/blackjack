import type { CardPlay } from '@@/shared'
import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

export type GameState = 'init' | 'playerTurn' | 'dealerTurn' | 'finished'

export const useGameStore = defineStore('game', () => {
  const token = ref('')
  const userMessage = ref('')
  const dealerHand = reactive<CardPlay>({
    cards: [],
    score: [],
    state: {
      code: 0,
      message: 'not-started',
    },
  })
  const playerHand = reactive<CardPlay>({
    cards: [],
    score: [],
    state: {
      code: 0,
      message: 'not-started',
    },
  })



  const $reset = () => {
    token.value = '';
    userMessage.value = '';
    dealerHand.cards = [];
    playerHand.cards = [];
  }

  return { token, userMessage, dealerHand, playerHand, $reset }
})
