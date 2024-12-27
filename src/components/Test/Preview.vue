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
        <div class="hello">
          Здравствуйте!
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
          Вопросов в тесте: 200
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
    margin: 3em 0;
    flex-direction: column;
    padding: 0 2em;
    box-sizing: border-box;
    color: #122130;

    @media screen and (max-width: 820px) {
      margin: 40px 0 auto;
    }

    @media screen and (max-width: 770px) {
      margin: 40px 0 auto;
      padding: 0 1em;
    }

    .greeting {
      display: flex;
      flex-direction: column;
      padding-bottom: 2em;
      border-bottom: 1px solid #0000001A;
      margin-bottom: 28px;

      @media screen and (max-width: 820px) {
        padding-bottom: 28px;
      }

      @media screen and (max-width: 770px) {
        padding-bottom: 24px;
        margin-bottom: 24px;
      }

      .hello {
        font-size: 144%;
        line-height: 29px;
        font-weight: 600;
        margin-bottom: 16px;

        @media screen and (max-width: 820px) {
          font-size: 20px;
          line-height: 24px;
          margin-bottom: 12px;
        }

        @media screen and (max-width: 770px) {
          font-size: 17px;
          line-height: 21.6px;
          margin-bottom: 10px;
        }
      }

      .description {
        font-size: 96%;
        max-width: 96%;
        line-height: 24px;

        @media screen and (max-width: 820px) {
          line-height: 25.6px;
          max-width: 100%;
        }

        @media screen and (max-width: 770px) {
          font-size: 14px;
          line-height: 22.4px;
        }
      }
    }
  }

  .guide {

    .heading {
      font-size: 144%;
      font-weight: 600;
      line-height: 29px;
      margin-bottom: 16px;

      @media screen and (max-width: 820px) {
        font-size: 20px;
        line-height: 24px;
      }

      @media screen and (max-width: 770px) {
        font-size: 17px;
        line-height: 21.6px;
        margin-bottom: 10px;
      }
    }

    .text {
      font-size: 96%;
      line-height: 25.6px;
      margin-bottom: 16px;

      @media screen and (max-width: 820px) {
        line-height: 25.6px;
      }

      @media screen and (max-width: 770px) {
        font-size: 14px;
        line-height: 22.4px;
      }
    }

    .impotent {
      font-size: 95%;
      font-weight: 700;
      line-height: 25.6px;
      margin-bottom: 10px;

      @media screen and (max-width: 820px) {
        line-height: 25.6px;
      }

      @media screen and (max-width: 770px) {
        font-size: 14px;
        line-height: 22.4px;
      }
    }

    .answer {
      font-size: 94%;
      font-weight: 400;
      line-height: 25.6px;

      @media screen and (max-width: 770px) {
        font-size: 14px;
        line-height: 22.4px;
      }

      .bold {
        font-weight: 700;
      }

    }
  }

  .start {
    display: flex;
    margin-top: 36px;
    justify-content: space-between;

    @media screen and (max-width: 820px) {
      margin-top: 52px;
    }

    @media screen and (max-width: 770px) {
      margin-top: 32px;
      flex-direction: column;
    }

    .option {
      padding: 15px 20px;
      box-sizing: border-box;
      background-color: #F8F8F8;
      border-radius: 10px;
      font-size: 84%;
      font-weight: 400;
      line-height: 22.4px;
      color: #5F5E5E;
      margin-right: 12px;

      &:last-of-type {
        margin-right: auto;
      }

      @media screen and (max-width: 770px) {
        margin-right: 0;
        margin-bottom: 12px;
        padding: 15px 0;
        width: 100%;
        text-align: center;
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
      cursor: pointer;

      @media screen and (max-width: 770px) {
        font-size: 15px;
        margin-bottom: 1em;
      }
    }
  }


}

</style>