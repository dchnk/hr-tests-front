<script setup>

import Greeting from "./Greeting.vue";
import Balance from "./Balance.vue";
import Departments from "./Departments.vue";
import Carousel from "./Carousel.vue";
import Panel from "./Panel.vue";
import VacancyList from "./VacancyList.vue";
import { ref } from 'vue';


const a = ref('123');
</script>

<template>
  <main class="main">
    <section class="info">
      <Greeting />
      <Balance />
    </section>
    <section class="groups">
      <Departments />
      <Carousel />
    </section>
    <section class="vacancies">
      <Panel />
      <VacancyList />
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
    padding: 0 12px;
  }

  .info {
    display: flex;
    justify-content: space-between;
    margin-top: 80px;
    margin-bottom: 80px;

    @media screen and (max-width: 950px) {
      flex-direction: column;
      margin-top: 57px;
      margin-bottom: 64px;
    }

    @media screen and (max-width: 770px) {
      margin-top: 44px;
      margin-bottom: 40px;
    }
  }

  .groups {
    display: flex;
    flex-direction: column;
    margin-bottom: 48px;
  }

  .vacancies {

  }
}
</style>