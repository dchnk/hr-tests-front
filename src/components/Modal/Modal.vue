<script setup>
import {useModalStore} from "../../stores/modal.js";
import {storeToRefs} from "pinia";

import ModalDelete from './ModalDelete.vue';
import ModalCreate from "./ModalCreate.vue";
import ModalEdit from "./ModalEdit.vue";
import ModalArchive from "./ModalArchive.vue";

const modalStore = useModalStore();
const {modal} = storeToRefs(modalStore);

</script>

<template>
  <div class="modal" :class="modal && 'open'" @click.self="modalStore.closeModal">
    <div class="modal__container">
      <ModalDelete :modal="modal" v-if="modal === 'deleteDepartment' || modal === 'deleteVacancy'" @closeModal="modalStore.closeModal"/>
      <ModalCreate :modal="modal" v-if="modal === 'createDepartment' || modal === 'createVacancy'" @closeModal="modalStore.closeModal"/>
      <ModalEdit :modal="modal" v-if="modal === 'editDepartment' || modal === 'editVacancy'" @closeModal="modalStore.closeModal"/>
      <ModalArchive :modal="modal" v-if="modal === 'archiveDepartment' || modal === 'archiveVacancy' || modal === 'unzipVacancy'" @closeModal="modalStore.closeModal"/>
      <div class="modal__close" @click="modalStore.closeModal">
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M1.05025 1.05021L10.9497 10.9497M10.9497 1.05021L1.05025 10.9497" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

.modal {
  position: fixed;
  z-index: 6;
  top: 0;
  bottom: 0;
  width: 100%;
  background-color: #12213080;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  pointer-events: none;
  visibility: hidden;
  opacity: 0;

  &.open {
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
    transition: all .3s ease-in-out;
  }

  @media screen and (max-width: 500px) {
    justify-content: flex-end;
  }

  .modal__container {
    position: relative;
    padding: 45px 24px;
    box-sizing: border-box;
    background-color: #FFFFFF;
    border-radius: 10px;

    @media screen and (max-width: 500px) {
      border-radius: 12px 12px 0 0;
      padding: 21px 12px 32px;
      width: 100%;
    }

    .modal__close {
      cursor: pointer;
      position: absolute;
      top: -20px;
      right: -15px;

      svg {
        stroke: #FFFFFF;
      }

      @media screen and (max-width: 500px) {
        height: 32px;
        min-width: 32px;
        display: flex;
        background-color: #F4F5F7;
        border-radius: 10px;
        top: 20px;
        right: 15px;

        svg {
          margin: auto;
          stroke: #122130;
          width: 10px;
          height: 10px;
        }
      }
    }
  }
}
</style>