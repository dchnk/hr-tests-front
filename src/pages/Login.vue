<script setup>
import { ref } from 'vue';

import About from "../components/Auth/About.vue";
import Signin from "../components/Auth/Signin.vue";
import Recovery from "../components/Auth/Recovery.vue";

const isRecovery = ref(false);

const openRecoveryWindow = () => {
  isRecovery.value = true;
}

const closeRecoveryWindow = () => {
  isRecovery.value = false;
}

</script>

<template>
  <main class="main">
    <About />
    <Signin @clickRecoveryButton="openRecoveryWindow" v-if="!isRecovery"/>
    <Recovery @clickSigninButton="closeRecoveryWindow" v-if="isRecovery"/>
  </main>
</template>

<style lang="scss" scoped>
  .main {
    display: flex;
    width: 100%;

    @media screen and (max-width: 820px) {
      flex-direction: column;
    }
  }
</style>