<script setup lang="ts">

type BJMessageBoardProps = {
  code: number,
}

defineProps<BJMessageBoardProps>()
</script>

<template>
  <div class="bj-message-board">
    <div class="bj-message-board__code">
      {{ code }}
    </div>
    <div class="bj-message-board__message">
      I'm a teapot
    </div>
  </div>
</template>

<style lang="scss">
.bj-message-board {}
</style>
