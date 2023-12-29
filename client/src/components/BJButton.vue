<script setup lang="ts">
defineProps<{ label: String, disabled: boolean, onClick: () => void }>()
</script>

<template>
  <button class="bj-button" :disabled="disabled" @click="onClick">
    {{ label }}
  </button>
</template>

<style lang="scss">
.bj-button {
  display: inline-block;
  padding: 10px 20px;
  margin: 1em;
  background-color: #0b2a15;
  border: 2px solid hsl(139, 58%, 20%);
  color: hsl(143, 30%, 88%);
  box-shadow: 0px 1px 5px rgba(1, 6, 20, 0.61);
  font-size: 24px;
  font-weight: bold;
  text-decoration: none;

  transition: background-color 0.2s ease;


  &:hover {
    background-color: hsl(139, 58%, 20%)
  }

  &:disabled {
    border: 1px solid hsl(139, 28%, 30%);
    background-color: hsl(139, 28%, 50%);
    color: hsl(143, 30%, 73%);
    ;
  }

}
</style>
