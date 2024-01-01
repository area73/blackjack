<script setup lang="ts">

type BJMessageBoardProps = {
  code: number,
}

import { ERROR_MESSAGES } from '@/utils/const';
defineProps<BJMessageBoardProps>()
</script>

<template>
  <div class="bj-message-board">
    <div class="bj-message-board__code">
      {{ code }}
    </div>
    <div class="bj-message-board__message">
      {{ ERROR_MESSAGES[code as keyof typeof ERROR_MESSAGES] || 'Unknown Error' }}
    </div>
  </div>
</template>

<style lang="scss">
.bj-message-board {}
</style>
