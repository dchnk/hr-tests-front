<script setup>
import {useDepartmentsStore} from "../../stores/departments.js";
import { storeToRefs } from 'pinia';

import Greeting from "./Greeting.vue";
import Balance from "./Balance.vue";
import Departments from "./Departments.vue";
import Carousel from "./Carousel.vue";
import Panel from "./Panel.vue";
import VacancyList from "./VacancyList.vue";
import { ref } from 'vue';

const {user} = defineProps(["user"]);

const departmentsStore = useDepartmentsStore();
const {departments, selected} = storeToRefs(departmentsStore);
const emit = defineEmits(['openModal'])

departmentsStore.get()

</script>

<template>
  <main class="main">
    <section class="info">
      <Greeting :user="user" />
      <Balance :user="user"/>
    </section>
    <section class="groups">
      <Departments @openModal="emit('openModal')"/>
      <Carousel />
    </section>
    <section class="vacancies" v-if="selected">
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