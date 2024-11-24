<script setup>

import Vacancy from "./Vacancy.vue";
import {useDepartmentsStore} from "../../stores/departments.js";
import {storeToRefs} from "pinia";

const departmentsStore = useDepartmentsStore();
const {selected} = storeToRefs(departmentsStore);

</script>

<template>
  <div class="list">
    <Vacancy v-for="vacancy in selected.vacancies" :text="vacancy.name" :key="vacancy.id"/>
    <div class="empty" v-if="selected.vacancies.length === 0">Вакансии еще не были добавлены.</div>
  </div>

</template>

<style lang="scss" scoped>
  .list {
    display: flex;
    flex-direction: column;
  }
</style>