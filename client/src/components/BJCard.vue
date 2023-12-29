<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{ value: string }>()

const value = props.value

const suit = computed(() => {
  const suit = value.split('-')[0]
  switch (suit) {
    case 'C':
      return '&clubs;'
    case 'D':
      return '&diams;'
    case 'H':
      return '&hearts;'
    case 'S':
      return '&spades;'
    default:
      return ''
  }
})

const rank = computed(() => value.split('-')[1])

const cssClass = computed(() => {
  const selectedSuit = value.split('-')[0] as 'C' | 'D' | 'H' | 'S'
  const rank = value.split('-')[1]
  const suitList = {
    C: 'clubs',
    D: 'diams',
    H: 'hearts',
    S: 'spades',
  }
  return `rank-${rank.toLowerCase()} ${suitList[selectedSuit]}`
})

</script>

<template>
  <span class="bj-card card back" v-if="value === '*'" />
  <span v-else class="bj-card card" :class="cssClass">
    <span class="rank">{{ rank.toUpperCase() }}</span>
    <span class="suit" v-html="suit" />
  </span>
</template>

<style lang="scss">
.bj-card {}
</style>
