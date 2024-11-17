<script setup>
import {computed, reactive, ref} from "vue";
import Header from "../components/Admin/Header.vue";
import Main from "../components/Admin/Main.vue";
import Modal from "../components/Modal/Modal.vue"

const modal = ref('delete');

function openModal(modalName) {
  modal.value = modalName;
}

function closeModal() {
  modal.value = null;
}

</script>()

<template>
  <Header />
  <Main @openModal="openModal"/>
  <Modal :modal="modal" @closeModal="closeModal"/>
</template>

<style lang="scss" scoped>

</style>