<script setup lang="ts">
import { ref } from 'vue';

const dialog = ref<HTMLDialogElement>();


const visible = ref(false);

const showModal = () => {
  dialog.value?.showModal();
  visible.value = true;
};

// expose bindings on instance
defineExpose({
  showModal,
  close: (returnVal?: string): void => dialog.value?.close(returnVal),
  visible,
});
</script>

<template>
  <dialog ref="dialog" @close="visible = false" class="bj-dialog">
    <form v-if="visible" method="dialog" class="bj-dialog__form">
      <button class="bj-dialog__close" aria-label="close" type="submit">✕</button>
      <div class="bj-dialog__content">
        <slot name="content" />
      </div>
    </form>
  </dialog>
</template>
<style lang="scss">
.bj-dialog {
  width: 400px;
  height: 300px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 5px 30px 0 rgb(0 0 0 / 10%);
  animation: fadeIn 1s ease both;
  padding: 48px;

  &::backdrop {
    animation: fadeIn 1s ease both;
    // background: rgb(255 255 255 / 40%);
    background: radial-gradient(hsla(0, 52%, 43%, 0.2), hsl(0, 52%, 30%, 0.6));
    z-index: 2;
    backdrop-filter: blur(10px);
  }

  &__form {}

  &__header {}

  &__close {
    font-weight: bold;
    font-size: 2rem;
    background: none;
    cursor: pointer;
    height: 50px;
    width: 50px;
    display: grid;
    align-items: end;
    position: absolute;
    right: 0;
    top: 0;
    border: none;
  }

  &__content {}


  @keyframes fadeIn {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }

}
</style>


