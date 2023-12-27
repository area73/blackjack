<script setup lang="ts">
defineProps<{ msg: String }>()
</script>

<template>
  <div class="bj-game-mat">
    Game Mat {{ msg }}
  </div>
</template>

<style lang="scss" scoped>
.bj-game-mat {}
</style>
