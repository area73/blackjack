<script setup lang="ts">
import BJControls from '../components/BJControls.vue';
import BJGameMat from '../components/BJGameMat.vue';
import BJHand from '../components/BJHand.vue';
import BJMarquee from '../components/BJMarquee.vue';
import { useGameStore } from '../stores/game';

const gameStore = useGameStore();
const { dealerHand, playerHand } = gameStore;
</script>

<template>
  <header>
    <div class="wrapper">
      <h1 class="title ">Black Jack</h1>
    </div>
  </header>
  <main class="playingCards faceImages">
    <BJGameMat>
      <template #news>
        <BJMarquee :msg="gameStore.userMessage" />
      </template>
      <template #controls>
        <BJControls />
      </template>
      <template #dealer>
        <BJHand owner="Dealer" :score="dealerHand.score" :cards="dealerHand.cards" />
      </template>
      <template #player>
        <BJHand owner="Player" :score="playerHand.score" :cards="playerHand.cards" />
      </template>
    </BJGameMat>
  </main>
</template>

<style lang="scss" scoped>
.title {
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
</style>
