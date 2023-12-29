<script setup lang="ts">
import type { CustomError } from '@/composables/useBlackJackFetch';
import { useBlackJackFetch } from '@/composables/useBlackJackFetch';
import { API_URL } from '@/utils/const';
import { watch } from 'vue';
import BJButton from './BJButton.vue';

type ResponseBody = {}
const { error, data, isFetching, execute } = useBlackJackFetch(API_URL.newGame, {
  immediate: false
}).json<ResponseBody>()

watch(error, (errorState?: CustomError) => {
  console.log('errorState: ', errorState);
})


watch(data, (dataState) => {
  console.log('data: ', data, dataState);
  if (dataState) {
    console.log('dataState =>', dataState);
  }
})

watch(isFetching, (fetchState) => {
  console.log('isFetching: ', fetchState);
})

const onNewGame = () => {
  console.log('New Game');
  execute()
}

const onHit = () => {
  console.log('New Game');
}

const onStand = () => {
  console.log('New Game');
}

</script>

<template>
  <div class="bj-controls">
    <BJButton label="Hit" :disabled="true" :onClick="onHit" />
    <BJButton label="Stand" :disabled="false" :onClick="onStand" />
    <BJButton label="New Game" :disabled="false" :onClick="onNewGame" />
  </div>
</template>

<style lang="scss">
.bj-controls {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}
</style>
