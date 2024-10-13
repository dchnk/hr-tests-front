<script setup>

import About from "../components/Auth/About.vue";
import Signin from "../components/Auth/Signin.vue";
</script>

<template>
  <main class="main">
    <About />
    <Signin />
  </main>
</template>

<style lang="scss" scoped>
  .main {
    display: flex;
    width: 100%;
    height: 100vh;

    @media screen and (max-width: 820px) {
      flex-direction: column;
    }
  }
</style>