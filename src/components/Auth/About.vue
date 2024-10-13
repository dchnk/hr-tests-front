<script setup>

</script>

<template>
  <section class="about">
    <div class="container">
      <div class="logo"/>
      <h1 class="heading">
        Онлайн-оценка персонала для малого и среднего бизнеса
      </h1>
      <p class="description">
        Сервис помогает предпринимателям и HR-специалистам оценить кандидата на работу, измерить вовлечённость ваших
        текущих сотрудников, а также автоматизировать процесс собеседований
      </p>
      <div class="beta">
        <div class="dot" />
        <div class="text">Beta-версия</div>
      </div>
    </div>
    <div class="cover" />
  </section>
</template>

<style lang="scss" scoped>
.about {
  //display: flex;
  //position: relative;
  //flex-direction: column;
  //align-items: center;
  //background-color: #122130;
  //height: 100%;
  //width: 50%;
  //text-align: center;

  display: grid;
  grid-template-rows: minmax(325px, auto) auto;
  position: relative;
  align-items: center;
  background-color: #122130;
  height: 100%;
  width: 50%;
  text-align: center;

  @media screen and (max-width: 820px) {
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .container {
    //height: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;

    .logo {
      //margin-top: 22%;
      width: 100%;
      margin-bottom: 32px;
      max-width: 190px;
      min-height: 44.25px;
      background-image: url("../../img/logo.png");
      background-position: center center;
      background-size: contain;
      background-repeat: no-repeat;
    }

    .heading {
      margin: 0 0 20px;
      font-size: 36px;
      font-weight: 700;
      line-height: 43.2px;
      color: #FFFFFF;
      max-width: 668px;
    }

    .description {
      margin: 0 0 24px;
      font-size: 16px;
      font-weight: 400;
      line-height: 25.6px;
      color: #B9BBC1;
      max-width: 525px;
    }

    .beta {
      display: flex;
      align-items: center;
      padding: 8px 21px;
      border-radius: 60px;
      border: 1px solid #FFFFFF1A;

      .dot {
        height: 6px;
        width: 6px;
        background-color: #8F47FF;
        border-radius: 50%;
        margin-right: 10px;
      }

      .text {
        font-family: Manrope;
        font-size: 14px;
        font-weight: 400;
        line-height: 22.4px;
        color: #B9BBC1;
      }
    }
  }



  .cover {
    background-image: url("../../img/cover.svg");
    background-repeat: no-repeat;
    background-size: contain;
    background-position: bottom;
    height: 100%;
    width: 100%;

    @media screen and (max-width: 820px) {
      display: none;
    }

  }
}
</style>