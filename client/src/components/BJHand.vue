<script setup lang="ts">
import { computed } from 'vue';
import BJCard from './BJCard.vue';

const props = defineProps<{ cards: string[], score: number[], owner: 'dealer' | 'user' }>()

const isBusted = computed(() => {
  return props.score.every((val: number) => val > 21);
})

const cards = computed(() =>
  (props.owner === 'dealer' && props.cards.length === 1)
    ? ['*', ...props.cards]
    : props.cards.filter((card) => card !== '*')
);

</script>

<template>
  <div class="bj-hand">
    <ul class="hand">
      <li v-for="(card, index) in cards" :value="card" :key="index + card">
        <BJCard :value="card" />
      </li>
    </ul>
    <div class="bj-hand__score">{{ owner }} Score: <span class="bj-hand__number"
        :class="{ 'bj-hand__number--busted': isBusted }">{{
          score.join(' / ') }}</span></div>
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

    &--busted {
      color: #922626;
    }
  }
}
</style>
