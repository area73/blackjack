<script setup lang="ts">
import { computed } from 'vue';
import BJCard from './BJCard.vue';

const props = defineProps<{ cards: string[], score: number[], owner: 'dealer' | 'user' }>()

const isBusted = computed(() => {
  return props.score.length > 0 && props.score.every((val: number) => val > 21);
})

const cards = computed(() =>
  (props.owner === 'dealer' && props.cards.length === 1)
    ? ['*', ...props.cards]
    : props.cards.filter((card) => card !== '*')
);

</script>

<template>
  <div class="bj-hand">
    <ul class="hand" :name="owner">
      <li v-for="(card, index) in cards" :name="card" :key="index + card">
        <BJCard :value="card" />
      </li>
    </ul>
    <div class="bj-hand__score">{{ owner }} Score: <span class="bj-hand__number"
        :class="{ 'bj-hand__number--busted': isBusted }" :data-testid="`${owner}-score`">{{
          score.length > 0 ? score.join(' / ') : '0' }}</span></div>
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
