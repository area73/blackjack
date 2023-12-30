import { defineStore } from 'pinia'
import { computed, reactive, ref } from 'vue'
import { useGameStore } from './game'



export const useGlobalStateStore = defineStore('globalState', () => {
  const gameStore = useGameStore()
  const errorCode = ref(0)
  const controls = reactive({
    hit: computed(() => gameStore.gameState === "playerTurn"),
    stand: computed(() => gameStore.gameState === "playerTurn"),
    newGame: computed(() => gameStore.gameState === "finished" || gameStore.gameState === "init"),
  })


  return { errorCode, controls }
})
