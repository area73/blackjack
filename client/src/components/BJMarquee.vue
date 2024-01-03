<script setup lang="ts">
import { watch } from 'vue';

const props = defineProps<{ msg: string, code: number }>()

watch(() => props.code, (appCode) => {
  // Easter egg
  // @ts-expect-error
  if (appCode === 9999 && !window.Cypress) {
    // @ts-expect-error
    confetti({
      particleCount: 100,
      spread: 360,
      origin: { y: 0.5, x: 0.5 },
      ticks: 150,
      gravity: 0.7,
      decay: 0.95,
      startVelocity: 30,
    });
  }
})


</script>

<template>
  <div class="bj-marquee">
    <h2 class="bj-marquee__message" role="status">{{ msg }}</h2>
  </div>
</template>

<style lang="scss" scoped>
.bj-marquee {

  &__message {
    font-weight: 600;
    font-size: 4rem;
    padding: 0;
    margin: 0;
  }
}
</style>
