<script setup lang="ts">
defineProps<{ msg: string }>()
</script>

<template>
  <div class="bj-marquee">
    <h2 class="bj-marquee__message">{{ msg }}</h2>
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
