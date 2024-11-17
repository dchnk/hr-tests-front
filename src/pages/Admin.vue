<script setup>
import {computed, reactive, ref} from "vue";
import Header from "../components/Admin/Header.vue";
import Main from "../components/Admin/Main.vue";
import Modal from "../components/Modal/Modal.vue"

import {useUserStore} from "../stores/user.js";
import { storeToRefs } from 'pinia';

const userStore = useUserStore();
const {user} = storeToRefs(userStore);

const modal = ref('');

function openModal(modalName) {
  modal.value = modalName;
}

function closeModal() {
  modal.value = null;
}

</script>()

<template>
  <Header />
  <Main @openModal="openModal" :user="user" />
  <Modal :modal="modal" @closeModal="closeModal"/>
</template>

<style lang="scss" scoped>

</style>