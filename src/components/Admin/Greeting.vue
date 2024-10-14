<script setup>

</script>

<template>

  <div class="greeting">
    <div class="hello">Добрый день, Username!</div>
    <div class="text">
      Здесь вы можете отправлять тесты соискателям, отслеживать их статус выполнения и анализировать результаты в режиме
      реального времени. Сервис HR TESTS помогает вам принимать решения и оптимизировать процесс найма.
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .greeting {
    margin-right: 74px;

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
      max-width: 640px;
      font-size: 16px;
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