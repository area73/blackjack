import type { CardPlay } from '@@/shared'
import { defineStore } from 'pinia'
import { computed, reactive, ref } from 'vue'

export type GameState = 'init' | 'playerTurn' | 'dealerTurn' | 'finished'

export const useGameStore = defineStore('game', () => {
  const token = ref('')
  const userMessage = ref('')
  const dealerHand = reactive<CardPlay>({
    cards: [],
    score: [],
    finished: false
  })
  const playerHand = reactive<CardPlay>({
    cards: [],
    score: [],
    finished: false
  })

  const gameState = computed(() => {
    if (dealerHand.cards.length === 0 && playerHand.cards.length === 0) {
      return "init";
    }
    if (playerHand.finished) {
      return dealerHand.finished ? "finished" : "dealerTurn";
    }
    return "playerTurn";
  })

  const $reset = () => {
    token.value = '';
    userMessage.value = '';
    dealerHand.cards = [];
    playerHand.cards = [];
  }

  return { gameState, token, userMessage, dealerHand, playerHand, $reset }
})
