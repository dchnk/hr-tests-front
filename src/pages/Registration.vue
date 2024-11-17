<script setup>
import About from "../components/Auth/About.vue";
import Signup from "../components/Auth/Signup.vue";

</script>

<template>
  <main class="main">
    <About />
    <Signup />
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