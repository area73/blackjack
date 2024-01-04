<script setup lang="ts">
import { literals } from '@/lang/literals';

type BJMessageBoardProps = {
  code: number,
}

defineProps<BJMessageBoardProps>()
</script>

<template>
  <div class="bj-message-board">
    <div class="bj-message-board__code">
      Error code <span class="bj-message-board__code-number"> {{ code }} </span>
    </div>
    <div class="bj-message-board__message">
      <div class="bj-message-board__reason">
        {{ literals.en.error[code as keyof typeof literals['en']['error']].reason || 'Unknown Error' }}
      </div>
      <div class="bj-message-board__hint">
        Hint: {{ literals.en.error[code as keyof typeof literals['en']['error']].hint }}
      </div>

    </div>
  </div>
</template>

<style lang="scss">
.bj-message-board {
  font-family: 'Montserrat', sans-serif;

  &__code {
    margin: 20px;
    text-align: center;
    font-size: 2rem;
    font-weight: bold;
    color: #922626;
  }

  &__reason {
    font-size: 150%;
    text-align: center;
  }

  &__hint {
    padding: 60px 0 0 0;
    color: rgb(45, 45, 45);
    font-style: italic;
  }
}
</style>
