<script setup lang="ts">
defineProps<{ label: String, disabled: boolean, onClick: () => void }>()
</script>

<template>
  <button class="bj-button" :disabled="disabled" @click="onClick">
    {{ label }}
  </button>
</template>

<style lang="scss">
.bj-button {}
</style>
