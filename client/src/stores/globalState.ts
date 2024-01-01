import { defineStore } from 'pinia'
import { computed, reactive, ref } from 'vue'
import { useGameStore } from './game'



export const useGlobalStateStore = defineStore('globalState', () => {
  const gameStore = useGameStore()
  const errorCode = ref(0)
  const controls = reactive({
    hit: computed(() => gameState.value === "playerTurn"),
    stand: computed(() => gameState.value === "playerTurn"),
    newGame: computed(() => gameState.value === "finished" || gameState.value === "init"),
  })

  const gameState = computed(() => {
    if (gameStore.dealerHand.cards.length === 0 && gameStore.playerHand.cards.length === 0) {
      return "init";
    }
    if (gameStore.playerHand.finished) {
      return gameStore.dealerHand.finished ? "finished" : "dealerTurn";
    }
    return "playerTurn";
  })

  return { errorCode, controls }
})
