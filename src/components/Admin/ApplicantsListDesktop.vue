<script setup>

import ApplicantsItemDesktop from "./ApplicantsItemDesktop.vue";

const applicants = [
  {
    id: 1,
    name: 'Константин Константинопольский',
    email: 'Kostyak@gmail.com',
    phone: '+7(913) 123-789-4577',
    date: '30.09.24  00:00',
    done: false,
  },
  {
    id: 2,
    name: 'Константин Константинопольский',
    email: 'Kostyak@gmail.com',
    phone: '+7(913) 123-789-4577',
    date: '30.09.24  00:00',
    done: true,
  },
]
</script>

<template>
  <div class="applicants__list_desktop">
    <ApplicantsItemDesktop v-for="applicant in applicants" :applicant='applicant'/>
  </div>
</template>

<style lang="scss" scoped>
.list {
  display: flex;
  flex-direction: column;
}
</style>