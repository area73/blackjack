<script setup lang="ts">
</script>

<template>
  <div class="bj-game-mat">
    <div class="bj-game-mat__news">
      <slot name="news" />
    </div>
    <div class="bj-game-mat__dealer">
      <slot name="dealer" />
    </div>
    <div class="bj-game-mat__player">
      <slot name="player" />
    </div>
    <div class="bj-game-mat__controls">
      <slot name="controls" />
    </div>
  </div>
</template>

<style lang="scss">
.bj-game-mat {
  display: grid;
  grid-template-rows: 125px 1fr auto 100px;
  height: 100%;

  &__news {
    text-align: center;
  }

  &__dealer {
    padding-left: 24px;
  }

  &__player {
    padding-left: 24px;
  }
}
</style>
