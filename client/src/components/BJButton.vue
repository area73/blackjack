<script setup lang="ts">

type BJButtonProps = {
  label: String,
  disabled: boolean,
  onClick: () => void
}

defineProps<BJButtonProps>()
</script>

<template>
  <button class="bj-button" :disabled="disabled" @click="onClick">
    {{ label }}
  </button>
</template>

<style lang="scss">
.bj-button {
  font-family: 'Montserrat', sans-serif;
  display: inline-block;
  padding: 10px 20px;
  margin: 1em;
  background-color: #0b2a15;
  border: 2px solid hsl(139, 58%, 20%);
  color: hsl(143, 30%, 88%);
  box-shadow: 0 1px 5px rgba(1, 6, 20, 0.61);
  font-size: 20px;
  font-weight: bold;
  text-decoration: none;
  transition: background-color 0.2s ease;

  &:hover,
  &.hover {
    background-color: hsl(139, 58%, 20%);
    cursor: pointer;
  }

  &:disabled {
    box-shadow: none;
    border: 1px solid hsl(139, 28%, 30%);
    background-color: hsl(139, 28%, 50%);
    color: hsl(143, 30%, 73%);
    cursor: not-allowed;
    ;
  }

}
</style>
