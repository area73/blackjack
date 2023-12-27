<script setup lang="ts">
import BJControls from './components/BJControls.vue';
import BJGameMat from './components/BJGameMat.vue';
import BJMarquee from './components/BJMarquee.vue';
</script>

<template>
  <header>
    <div class="wrapper">
      <BJMarquee msg="You did it!" />
    </div>
  </header>
  <main>
    <BJGameMat msg="mate" />
    <BJControls />
  </main>
</template>

<style lang="scss" scoped>
</style>
