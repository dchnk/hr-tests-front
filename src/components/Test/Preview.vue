<script setup>

</script>

<template>
  <section class="container">
    <div class="header">
      <div class="logo"></div>
      <p class="heading">Онлайн-оценка сотрудников</p>
    </div>
    <div class="content">
      <div class="greeting">
        <div class="hello">
          Добрый день, Лариса Тестовая!
        </div>
        <div class="description">
          Вы получили ссылку на данное тестирование, так как откликались на вакансию “C++ Teamlead” в ОАО “Росатом”.
          Тут можно написать еще пару вводных строк про тестирование, зачем это нужно соискателю/работадателю.
        </div>
      </div>
      <div class="guide">
        <div class="heading">Как проходить тест?</div>
        <div class="text">
          Убедитесь, что вы понимаете вопрос.
          Не задерживайтесь слишком долго на одном вопросе. Отвечайте на него сразу, как только поняли его, и переходите к следующему.
        </div>
        <div class="impotent">На каждый вопрос можно ответить</div>
        <div class="answer"><span class="bold">«Да»</span> – означает «в основном, да» или твердое «да»,</div>
        <div class="answer"><span class="bold">«Может быть»</span> – означает «может быть, ни да, ни нет, неуверенность»,</div>
        <div class="answer"><span class="bold">«Нет»</span> – означает «нет» или «в основном, нет»</div>
      </div>
      <div class="start">
        <div class="option">
          Вопросов в тесте: 200
        </div>
        <div class="option">
          Время на прохождение: ~30 минут
        </div>
        <button class="button">Начать тест &nbsp; &#8594;</button>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  margin: auto;
  flex-direction: column;
  max-width: 60em;
  width: 100%;
  border: 1px solid #E8E8E8;
  background-color: #FFFFFF;
  border-radius: 1em;
  overflow: hidden;

  .header {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    background-color: #122130;
    height: 100px;
    padding: 0 2em;
    box-sizing: border-box;

    .logo {
      background-image: url("./img/logo.png");
      height: 45px;
      width: 190px;
      background-repeat: no-repeat;
      background-position: center center;
      background-size: contain;
    }

    .heading {
      font-weight: 600;
      line-height: 24px;
      color: #fff;
      margin: 0;
    }
  }

  .content {
    display: flex;
    margin: 3em 0;
    flex-direction: column;
    padding: 0 2em;
    box-sizing: border-box;
    color: #122130;

    .greeting {
      display: flex;
      flex-direction: column;
      padding-bottom: 2em;
      border-bottom: 1px solid #0000001A;
      margin-bottom: 28px;

      .hello {
        font-size: 24px;
        line-height: 29px;
        font-weight: 600;
        margin-bottom: 16px;
      }

      .description {
        font-size: 16px;
        line-height: 24px;
      }
    }
  }

  .guide {

    .heading {
      font-size: 24px;
      font-weight: 600;
      line-height: 29px;
      margin-bottom: 16px;
    }

    .text {
      font-size: 15.6px;
      line-height: 25.6px;
      margin-bottom: 16px;
    }

    .impotent {
      font-size: 16px;
      font-weight: 700;
      line-height: 25.6px;
      margin-bottom: 10px;
    }

    .answer {
      font-size: 16px;
      font-weight: 400;
      line-height: 25.6px;

      .bold {
        font-size: 16px;
        font-weight: 700;
        line-height: 25.6px;
      }

    }
  }
  
  .start {
    display: flex;
    margin-top: 36px;
    justify-content: space-between;

    .option {
      padding: 15px 20px;
      box-sizing: border-box;
      background-color: #F8F8F8;
      border-radius: 10px;
      font-size: 14px;
      font-weight: 400;
      line-height: 22.4px;
      color: #5F5E5E;
      margin-right: 12px;

      &:last-of-type {
        margin-right: auto;
      }
    }

    .button {
      border-radius: 10px;
      border: none;
      padding: 15px 40px;
      background-color: #8F47FF;
      font-size: 18px;
      font-weight: 700;
      line-height: 21.6px;
      color: #FFFFFF;

    }
  }


}

</style>