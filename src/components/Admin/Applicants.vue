<script setup>
import ApplicantsListDesktop from "./ApplicantsListDesktop.vue";

const {name} = defineProps(['name']);
</script>

<template>
  <div class="applicants">
    <div class="applicants__heading">Соискатели вакансии “{{name}}”</div>
    <div class="applicants__columns">
      <div class="applicants__column">ID</div>
      <div class="applicants__column">Имя</div>
      <div class="applicants__column">E-mail</div>
      <div class="applicants__column">Телефон</div>
      <div class="applicants__column">Отправлен</div>
      <div class="applicants__column">Статус</div>
    </div>
    <ApplicantsListDesktop />
  </div>
</template>

<style lang="scss" scoped>
.applicants {
  box-sizing: border-box;

  .applicants__heading {
    font-size: 18px;
    font-weight: 700;
    line-height: 21.6px;
    margin-bottom: 28px;
    color: #122130;

    @media screen and (max-width: 1000px) {
      margin-bottom: 22px;
    }

    @media screen and (max-width: 750px) {
      font-size: 16px;
      line-height: 19.2px;
      margin: 0 12px;
    }
  }

  .applicants__columns {
    display: grid;
    gap: 16px;
    grid-template-columns: 50px 270px 170px 170px 130px 130px;
    margin-bottom: 16px;

    .applicants__column {
      font-size: 14px;
      font-weight: 600;
      line-height: 19.6px;
    }

    @media screen and (max-width: 1200px) {
      display: none;
    }
  }
}
</style>