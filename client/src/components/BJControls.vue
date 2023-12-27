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

})


watch(data, (dataState) => {
  if (dataState) {
    console.log(dataState);
  }
})

watch(isFetching, (fetchState) => {
  console.log(fetchState);
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
  <BJButton label="New Game" :disabled="false" :onClick="onNewGame" />
  <BJButton label="Hit" :disabled="false" :onClick="onHit" />
  <BJButton label="Stand" :disabled="false" :onClick="onStand" />
</template>

<style lang="scss" scoped>
</style>
