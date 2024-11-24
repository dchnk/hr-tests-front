<script setup>
import {computed, reactive, ref} from "vue";
import Header from "../components/Header/Header.vue";
import Main from "../components/Admin/Main.vue";
import Modal from "../components/Modal/Modal.vue"

import {useUserStore} from "../stores/user.js";
import { storeToRefs } from 'pinia';
import NotActiveted from "../components/Admin/NotActiveted.vue";
import ModerPage from "../components/Admin/Moder/ModerPage.vue";

const userStore = useUserStore();
const {user, isAdmin} = storeToRefs(userStore);

const modal = ref('');

function openModal(modalName) {
  modal.value = modalName;
}

function closeModal() {
  modal.value = null;
}

</script>

<template>
  <Header :isAdmin="isAdmin"/>
  <ModerPage v-if="isAdmin"/>
  <Main @openModal="openModal" :user="user" v-if="user?.activated && !isAdmin"/>
  <NotActiveted v-if="!user?.activated && !isAdmin" :user="user"/>
  <Modal :modal="modal" @closeModal="closeModal" v-if="user?.activated"/>


</template>

<style lang="scss" scoped>

</style>