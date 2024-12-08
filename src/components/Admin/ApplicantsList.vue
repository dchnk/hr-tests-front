<script setup>

import ApplicantsItem from "./ApplicantsItem.vue";
import {computed} from "vue";

const {applicants} = defineProps(['applicants']);

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