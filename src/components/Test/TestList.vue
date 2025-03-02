<script setup>

const emit = defineEmits(['startTest'])

</script>

<template>
  <section class="container">
    <div class="header">
      <div class="logo"></div>
      <p class="heading">Онлайн-оценка сотрудников</p>
    </div>
    <div class="content">
      <div class="greeting">
        <div class="heading">
          Тесты которые вам предстоит пройти
        </div>
        <div class="description">
          У вас есть 72 часа с момента получения ссылки, чтобы пройти этот тест. Промежуточные результаты не сохраняются: нужно выбрать время и пройти тест от начала и до конца. Повторное прохождение не предусмотрено.
        </div>
      </div>
      <div class="guide">
        <div class="heading">Как проходить тест?</div>
        <div class="text">
          Не тратьте на один вопрос много времени, отвечайте быстро. Будьте внимательны при чтении. Прочитав и убедившись, что вы правильно поняли вопрос, ответьте на него.
        </div>
        <div class="impotent">Варианты ответов:</div>
        <div class="answer"><span class="bold">ДА</span> – скорее да, чем нет</div>
        <div class="answer"><span class="bold">МОЖЕТ БЫТЬ</span> –  я точно не знаю, не уверен</div>
        <div class="answer"><span class="bold">НЕТ</span> – скорее нет, чем да</div>
      </div>
      <div class="start">
        <div class="option">
          Вопросов в тесте: 225
        </div>
        <div class="option">
          Время на прохождение: ~30 минут
        </div>
        <button class="button" @click="emit('startTest')">Начать тест &nbsp; &#8594;</button>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  margin: 4.4% auto;
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
    //padding: 0 2em;
    box-sizing: border-box;
    color: #122130;

    //@media screen and (max-width: 820px) {
    //  margin: 40px 0 auto;
    //}
    //
    //@media screen and (max-width: 770px) {
    //  margin: 40px 0 auto;
    //  padding: 0 1em;
    //}
  }






}

</style>