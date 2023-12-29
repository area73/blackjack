<script setup lang="ts">
import BJCard from './BJCard.vue';

defineProps<{ cards: string[], score: number[], owner: string }>()
</script>

<template>
  <div class="bj-hand">
    <ul class="hand">
      <li v-for="(card, index) in cards" :value="card" :key="index">
        <BJCard :value="card" />
      </li>
    </ul>
    <div class="bj-hand__score">{{ owner }} Score: <span class="bj-hand__number">{{ score.join(' / ') }}</span></div>
  </div>
</template>

<style lang="scss">
.bj-hand {
  &__score {
    font-size: 2rem;
    font-weight: bold;
  }

  &__number {
    font-family: 'Montserrat', sans-serif;
    font-size: 1.5rem;
  }
}
</style>
