<script setup>
import {computed, reactive, ref} from "vue";
import Header from "../components/Admin/Header.vue";
import Main from "../components/Admin/Main.vue";
import Modal from "../components/Modal/Modal.vue"

const modal = ref(null);

function openModal(modalName) {
  modal.value = modalName;
}

function closeModal() {
  modal.value = null;
}

</script>()

<template>
  <Header />
  <Main @openModal="openModal" @closeModal="closeModal"/>
  <Modal />
</template>

<style lang="scss" scoped>

</style>