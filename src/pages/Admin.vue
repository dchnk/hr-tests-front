<script setup>
import {computed, reactive, ref} from "vue";
import Header from "../components/Header/Header.vue";
import Main from "../components/Admin/Main.vue";
import Modal from "../components/Modal/Modal.vue";

import {useUserStore} from "../stores/user.js";
import { storeToRefs } from 'pinia';
import NotActiveted from "../components/Admin/NotActiveted.vue";
import ModerPage from "../components/Admin/Moder/ModerPage.vue";
import {useModalStore} from "../stores/modal.js";

const userStore = useUserStore();
const {user, isAdmin} = storeToRefs(userStore);

const modalStore = useModalStore();
const {modal} = storeToRefs(modalStore);


</script>

<template>
  <Header :isAdmin="isAdmin"/>
  <ModerPage v-if="isAdmin"/>
  <Main :user="user" v-if="user?.activated && !isAdmin"/>
  <NotActiveted v-if="!user?.activated && !isAdmin" :user="user"/>
  <Modal v-if="user?.activated"/>


</template>

<style lang="scss" scoped>

</style>