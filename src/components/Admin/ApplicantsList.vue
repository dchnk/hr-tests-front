<script setup>

import ApplicantsItem from "./ApplicantsItem.vue";
import {computed} from "vue";

const {applicants} = defineProps(['applicants']);

// const applicants = [
//   {
//     id: 1,
//     name: 'Константин Константинопольский',
//     email: 'Kostyak@gmail.com',
//     phone: '+7(913) 123-789-4577',
//     date: '30.09.24  00:00',
//     done: false,
//   },
//   {
//     id: 2,
//     name: 'Константин Константинопольский',
//     email: 'Kostyak@gmail.com',
//     phone: '+7(913) 123-789-4577',
//     date: '30.09.24  00:00',
//     done: true,
//   },
// ]


</script>

<template>
  <div class="applicants__list">
    <ApplicantsItem v-for="applicant in applicants" :applicant='applicant' v-if="applicants?.length"/>
    <div class="text" v-else>Соискателей пока нет.</div>
  </div>
</template>

<style lang="scss" scoped>
.list {
  display: flex;
  flex-direction: column;
}
</style>