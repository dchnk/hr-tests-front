<script setup>

import Greeting from "./Greeting.vue";
import Balance from "./Balance.vue";
</script>

<template>
  <main class="main">
    <section class="info">
      <Greeting />
      <Balance />
    </section>
  </main>
</template>

<style lang="scss" scoped>
.main {
  max-width: 1180px;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
  height: 100%;

  @media screen and (max-width: 770px) {
    padding: 0 1em;
  }

  .info {
    display: flex;
    justify-content: space-between;
    margin-top: 80px;

    @media screen and (max-width: 770px) {
      margin-top: 66px;
    }
  }
}
</style>