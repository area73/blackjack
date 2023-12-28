<script setup lang="ts">
defineProps<{ msg: String }>()
</script>

<template>
  <div class="bj-game-mat">
    <div class="bj-game-mat__news"><slot name="news" /></div>
    <div class="bj-game-mat__dealer"><slot name="dealer" /></div>
    <div class="bj-game-mat__player"><slot name="player"/></div>
    <div class="bj-game-mat__controls"><slot name="controls"/></div>
  </div>
</template>

<style lang="scss" scoped>
.bj-game-mat {
  * {
    border:1px solid #ccc;
  }
  &__news {}
  &__dealer {}
  &__player {}
  &__controls {}
}
</style>
