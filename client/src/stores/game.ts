import type { CardPlay, PlayState } from '@@/shared'
import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'


export const useGameStore = defineStore('game', () => {
  const token = ref('')
  const userMessage = ref<PlayState>({ code: 0, message: 'game not started' })
  const dealerHand = reactive<CardPlay>({
    cards: [],
    score: [],
    state: 'not-started',
  })
  const playerHand = reactive<CardPlay>({
    cards: [],
    score: [],
    state: 'not-started',
  })



  const $reset = () => {
    token.value = '';
    userMessage.value = { code: 0, message: 'game not started' };
    dealerHand.cards = [];
    playerHand.cards = [];
  }

  return { token, userMessage, dealerHand, playerHand, $reset }
})
