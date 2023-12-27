<script setup lang="ts">
defineProps<{ msg: String }>()
</script>

<template>
  <div class="bj-marquee">
    <h1 class="bj-marquee__message">{{ msg }}</h1>
  </div>
</template>

<style lang="scss" scoped>
.bj-marquee {

  &__message {
    font-weight: 500;
    font-size: 2.6rem;
    position: relative;
    top: -10px;
  }
}
</style>
