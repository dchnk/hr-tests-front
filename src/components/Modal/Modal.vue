<script setup>
import ModalDelete from './ModalDelete.vue';

const {currentModal} = defineProps(['currentModal']);

</script>

<template>
  <div class="modal" @click.self="">
    <div class="modal__container">
      <ModalDelete />
      <div class="modal__close" @click="">
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M1.05025 1.05021L10.9497 10.9497M10.9497 1.05021L1.05025 10.9497" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.page {
  overflow: hidden;
  max-height: 100vh;
}

.modal {
  position: absolute;
  z-index: 6;
  top: 0;
  bottom: 0;
  width: 100%;
  background-color: #12213080;
  display: flex;

  .modal__container {
    position: relative;
    margin: auto;
    padding: 45px 24px;
    box-sizing: border-box;
    background-color: #FFFFFF;
    border-radius: 10px;

    .modal__close {
      cursor: pointer;
      position: absolute;
      top: -20px;
      right: -15px;
    }
  }
}
</style>