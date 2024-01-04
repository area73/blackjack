<script setup lang="ts">
import type { CustomError } from '@/composables/useBlackJackFetch';
import { useBlackJackFetch } from '@/composables/useBlackJackFetch';
import { useGameStore } from '@/stores/game';
import { useGlobalStateStore } from '@/stores/globalState';
import { APIMapper } from '@/utils/APIMapper';
import { API_URL } from '@/utils/const';
import type { APIResponse } from "@@/shared";
import { ref, watch } from 'vue';
import BJButton from './BJButton.vue';

const globalStateStoreStore = useGlobalStateStore()
const gameStore = useGameStore()
const apiUrl = ref<API_URL>(API_URL.newGame)
const canHit = ref(false)
const canStand = ref(false)
const canStart = ref(true)

globalStateStoreStore.$subscribe((_mutation, state) => {
  canHit.value = state.controls.hit
  canStand.value = state.controls.stand
  canStart.value = state.controls.newGame
})

const { error, data, execute } = useBlackJackFetch(apiUrl, {
  immediate: false
}).json<APIResponse>()

watch(error, (errorState?: CustomError) => {
  if (errorState?.code && errorState?.code !== 200) {
    globalStateStoreStore.$patch({
      errorCode: errorState.code,
    })
  } else {
    globalStateStoreStore.$patch({
      errorCode: 1,
    })
  }
})

watch(data, (dataState) => {
  if (dataState) {
    // update game state
    gameStore.$patch(APIMapper.fromAPI(dataState))
    //  if user has finish and dealer not then dealer will play
    if (dataState.game.user.state === 'stand' && dataState.game.dealer.state === 'playing') {
      apiUrl.value = API_URL.hit
      execute()
    }
  }
})

const onNewGame = () => {
  gameStore.$reset()
  apiUrl.value = API_URL.newGame
  execute()
}

const onHit = () => {
  apiUrl.value = API_URL.hit
  execute()
}

const onStand = () => {
  apiUrl.value = API_URL.stand
  execute()
}
</script>

<template>
  <div class="bj-controls">
    <BJButton label="Hit" name="Hit" :disabled="!canHit" :onClick="onHit" />
    <BJButton label="Stand" name="Stand" :disabled="!canStand" :onClick="onStand" />
    <BJButton label="New Game" name="New Game" :disabled="!canStart" :onClick="onNewGame" />
  </div>
</template>

<style lang="scss">
.bj-controls {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}
</style>
