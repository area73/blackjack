<script setup lang="ts">
import BJControls from '@/components/BJControls.vue';
import BJDialog from '@/components/BJDialog.vue';
import BJGameMat from '@/components/BJGameMat.vue';
import BJHand from '@/components/BJHand.vue';
import BJMarquee from '@/components/BJMarquee.vue';
import BJMessageBoard from '@/components/BJMessageBoard.vue';
import { useGameStore } from '@/stores/game';
import { useGlobalStateStore } from '@/stores/globalState';
import { ref } from 'vue';

const modal = ref<InstanceType<typeof BJDialog>>();
const gameStore = useGameStore();
const globalStateStoreStore = useGlobalStateStore();
const { dealerHand, playerHand } = gameStore;

globalStateStoreStore.$subscribe((_mutation, state) => {
  state.errorCode > 0 ? modal.value?.showModal() : modal.value?.close;
});
</script>

<template>
  <header>
    <div class="wrapper">
      <h1 class="game__title">Black Jack</h1>
    </div>
  </header>
  <main class="playingCards faceImages">
    <BJGameMat>
      <template #news>
        <BJMarquee :msg="gameStore.userMessage.message" :code="gameStore.userMessage.code" />
      </template>
      <template #controls>
        <BJControls />
      </template>
      <template #dealer>
        <BJHand owner="dealer" :score="dealerHand.score" :cards="dealerHand.cards" />
      </template>
      <template #player>
        <BJHand owner="user" :score="playerHand.score" :cards="playerHand.cards" />
      </template>
    </BJGameMat>
    <BJDialog ref="modal">
      <template #content>
        <BJMessageBoard :code="globalStateStoreStore.errorCode" />
      </template>
    </BJDialog>
  </main>
</template>

<style lang="scss">
.game {
  &__title {
    font-size: 6rem;
    font-family: 'Carattere',
      sans-serif;
    margin: 0 0 0 0;
    padding: 0.3em 0 0 0;
    text-align: center;
    line-height: 1;
    text-shadow: 0px 1px 9px rgba(1, 6, 20, 0.61);

    &::first-letter {
      font-size: 8rem;
    }
  }
}
</style>
