<script setup lang="ts">
import BJControls from './components/BJControls.vue';
import BJGameMat from './components/BJGameMat.vue';
import BJHand from './components/BJHand.vue';
import BJMarquee from './components/BJMarquee.vue';
</script>

<template>
  <header>
    <div class="wrapper">
      <h1 class="title ">Black Jack</h1>
    </div>
  </header>
  <main class="playingCards faceImages">
    <BJGameMat msg="mate">
      <template #news>
        <BJMarquee msg="You did it!" />
      </template>
      <template #controls>
        <BJControls />
      </template>
      <template #dealer>
        <BJHand owner="Dealer" :score="23" :cards="['*', 'D-9', 'H-K', 'C-K', 'D-K', 'S-K']" />
      </template>
      <template #player>
        <BJHand owner="Player" :score="19" :cards="['S-J', 'C-5', 'H-Q']" />
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
