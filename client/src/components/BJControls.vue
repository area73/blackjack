<script setup lang="ts">
import type { CustomError } from '@/composables/useBlackJackFetch';
import { useBlackJackFetch } from '@/composables/useBlackJackFetch';
import { useGameStore } from '@/stores/game';
import { APIMapper } from '@/utils/APIMapper';
import { API_URL } from '@/utils/const';
import type { APIResponse } from "@@/shared";
import { ref, watch } from 'vue';
import BJButton from './BJButton.vue';
import BJDialog from './BJDialog.vue';
import BJMessageBoard from './BJMessageBoard.vue';

const modal = ref<InstanceType<typeof BJDialog>>();

const gameStore = useGameStore()
const apiUrl = ref<API_URL>(API_URL.newGame)

const { error, data, execute } = useBlackJackFetch(apiUrl, {
  immediate: false
}).json<APIResponse>()

watch(error, (errorState?: CustomError) => {
  if (errorState?.code && errorState?.code !== 200) {
    console.error('errorState: ', errorState?.message);
  }
})

watch(data, (dataState) => {
  if (dataState) {
    // update game state
    gameStore.$patch(APIMapper.fromAPI(dataState))

    console.log('dataState =>', dataState);
  }
})


const onNewGame = () => {
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

const onTest = () => {
  modal.value?.showModal()
}

</script>

<template>
  <div class="bj-controls">
    <BJDialog ref="modal">
      <template #content>
        <BJMessageBoard :code="'428'" />
      </template>
    </BJDialog>

    <BJButton label="Hit" :disabled="false" :onClick="onHit" />
    <BJButton label="Stand" :disabled="false" :onClick="onStand" />
    <BJButton label="New Game" :disabled="false" :onClick="onNewGame" />
    <BJButton label="test" :disabled="false" :onClick="onTest" />
  </div>
</template>

<style lang="scss">
.bj-controls {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}
</style>
