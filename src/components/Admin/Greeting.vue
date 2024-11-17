<script setup>
const {user} = defineProps(["user"]);
</script>

<template>

  <div class="greeting">
    <div class="hello">Добрый день, {{user?.name}}! </div>
    <div class="text">
      Здесь вы можете отправлять тесты соискателям, отслеживать их статус выполнения и анализировать результаты в режиме
      реального времени. Сервис HR TESTS помогает вам принимать решения и оптимизировать процесс найма.
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .greeting {
    margin-right: 74px;

    @media screen and (max-width: 950px) {
      margin-right: 0;
      margin-bottom: 34px;
    }

    @media screen and (max-width: 820px) {
      margin-bottom: 20px;
    }

    .hello {
      margin-bottom: 12px;
      font-size: 24px;
      font-weight: 700;
      line-height: 28.8px;
      color: #122130;

      @media screen and (max-width: 770px) {
        font-size: 18px;
        line-height: 21.6px;
      }
    }

    .text {
      max-width: 626px;
      font-size: 91%;
      font-weight: 400;
      line-height: 25.6px;
      color: #686B74;

      @media screen and (max-width: 770px) {
        font-size: 14px;
        line-height: 22.4px;
      }
    }
  }
</style>