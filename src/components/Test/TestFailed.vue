<script setup>

</script>

<template>
  <section class="container">
    <div class="header">
      <div class="logo"></div>
      <p class="heading">Онлайн-оценка сотрудников</p>
    </div>
    <div class="content">
      <div class="box">
        <div class="icon" />
      </div>
      <div class="congratulations">Тест недоступен или был отменен.</div>
      <div class="text">
        Вы не прошли тест вовремя или он был отменен. Свяжитесь с вашим HR для повтороного тестирования!
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  margin: 4.4% auto auto;
  flex-direction: column;
  max-width: 60em;
  width: 100%;
  border: 1px solid #E8E8E8;
  background-color: #FFFFFF;
  border-radius: 22px;
  overflow: hidden;

  @media screen and (max-width: 820px) {
    border-radius: 0px;
    margin: 0 auto auto;
    border: none;
  }

  .header {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    background-color: #122130;
    height: 100px;
    padding: 0 2em;
    box-sizing: border-box;

    @media screen and (max-width: 820px) {
      height: 83px;
    }

    @media screen and (max-width: 770px) {
      padding: 0 1em;
      height: 66px;
    }

    .logo {
      background-image: url("../../img/logo.png");
      height: 45px;
      width: 190px;
      background-repeat: no-repeat;
      background-position: center center;
      background-size: contain;

      @media screen and (max-width: 820px) {
        height: 35px;
        width: 150px;
      }

      @media screen and (max-width: 770px) {
        height: 30px;
        width: 130px;
      }
    }

    .heading {
      font-weight: 600;
      line-height: 24px;
      font-size: 120%;
      color: #fff;
      margin: 0;

      @media screen and (max-width: 820px) {
        font-size: 18px;
        line-height: 21.6px;
      }

      @media screen and (max-width: 770px) {
        font-size: 14px;
        line-height: 16.8px;
        text-align: end;
        margin-left: 10px;
      }
    }
  }

  .content {
    display: flex;
    flex-direction: column;
    color: #122130;
    min-height: 51vh;
    align-items: center;
    justify-content: center;
    text-align: center;

    @media screen and (max-width: 820px) {
      min-height: max-content;
      line-height: 21.6px;
    }


    .box {
      margin: -52px auto 24px;
      height: 100px;
      width: 100px;
      background-color: #F8F8F8;
      border-radius: 16px;
      display: flex;

      @media screen and (max-width: 820px) {
        margin: 205px auto 20px;
        height: 80px;
        width: 80px;
      }

      @media screen and (max-width: 770px) {
        margin: 210px auto 16px;
        height: 60px;
        width: 60px;
      }

      .icon {
        margin: auto;
        background-image: url("../../img/passed.png");
        width: 42.5px;
        height: 42.5px;
        background-position: center center;
        background-repeat: no-repeat;
        background-size: contain;

        @media screen and (max-width: 820px) {
          width: 35.2px;
          height: 35.2px;
        }

        @media screen and (max-width: 770px) {
          width: 25.5px;
          height: 25.5px;
        }
      }
    }

    .congratulations {
      font-size: 24px;
      font-weight: 600;
      line-height: 28.8px;
      margin-bottom: 16px;

      @media screen and (max-width: 820px) {
        font-size: 20px;
        line-height: 24px;
      }

      @media screen and (max-width: 770px) {
        font-size: 18px;
        line-height: 21.6px;
        margin-bottom: 12px;
      }
    }

    .text {
      font-size: 16px;
      font-weight: 400;
      line-height: 25.6px;
      max-width: 60%;

      @media screen and (max-width: 820px) {
        max-width: 70%;
      }

      @media screen and (max-width: 770px) {
        font-family: Manrope;
        font-size: 14px;
        line-height: 22.4px;
        max-width: 98%;
      }
    }
  }
}

</style>