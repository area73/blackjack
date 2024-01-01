import { STATUS_CODES } from '@@/shared'
import { defineStore } from 'pinia'
import { computed, reactive, ref } from 'vue'
import { useGameStore } from './game'



export const useGlobalStateStore = defineStore('globalState', () => {
  const gameStore = useGameStore()
  const errorCode = ref(0)
  const controls = reactive({
    hit: computed(() => gameStore.userMessage.code === STATUS_CODES.USER_PLAYING),
    stand: computed(() => gameStore.userMessage.code === STATUS_CODES.USER_PLAYING),
    newGame: computed(() => gameStore.userMessage.code === STATUS_CODES.USER_WIN || gameStore.userMessage.code === STATUS_CODES.DEALER_WIN || gameStore.userMessage.code === STATUS_CODES.DRAW),
  })



  return { controls, errorCode }
})
