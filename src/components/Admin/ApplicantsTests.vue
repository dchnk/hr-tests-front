<script setup>
import ApplicantsTest from "./ApplicantsTest.vue";

const {applicant} = defineProps(['applicant']);

</script>

<template>
  <section class="applicants__tests" v-if="applicant.status">
    <div class="heading">Тестирование</div>
    <ApplicantsTest :applicant='applicant'/>
  </section>
</template>

<style lang="scss" scoped>
.applicants__tests {
  margin-top: 37px;

  .heading{
    font-family: Manrope;
    font-size: 18px;
    font-weight: 700;
    line-height: 21.6px;
    color: #122130;
  }

  .applicants__columns {
    margin-top: 1em;
    display: grid;
    gap: 16px;
    grid-template-columns: 150px 100px;
    margin-bottom: 16px;

    .applicants__column {
      font-size: 14px;
      font-weight: 400;
      line-height: 22.4px;
      color: #686B74;
    }
  }
}
</style>