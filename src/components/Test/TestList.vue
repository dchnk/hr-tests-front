<script setup>

import axios from "axios";

const emit = defineEmits(['startTest'])

const {tests, testStatus} = defineProps(['tests', 'testStatus'])
const testList = {};

for (const test of tests.test) {
  testList[test.name] = {
    test,
    questions: tests.questions[test.name]
  };
}


</script>

<template>
  <section class="container">
    <div class="header">
      <div class="logo"></div>
      <p class="heading">Онлайн-оценка сотрудников</p>
    </div>
    <div class="content">
      <div class="heading">
        Тесты, которые вам предложили пройти
      </div>
      <div class="test-list flex-wrap">
        <div class="test-container" v-if="testList.oxford">
          <div class="test-name">Базовый тест</div>
          <div class="test-text questions-count">Вопросов в тесте: 225</div>
          <div class="test-text time-to-pass">Время прохождения: ~30 минут</div>
          <div class="start-test mt-4"
               :class="testList.oxford.test.ended && ' ended'"
               @click="emit('startTest', 'oxford')"
          >
            {{ testList.oxford.test.ended ? 'Завершен' : 'Начать тестирование' }}
          </div>
        </div>
        <div class="test-container" v-if="testList.questionnaire">
          <div class="test-name">Опросник</div>
          <div class="test-text questions-count">Вопросов в тесте: 20</div>
          <div class="test-text time-to-pass">Время прохождения: ~10 минут</div>
          <div class="start-test mt-4"
               :class="testList.questionnaire.test.ended && ' ended'"
               @click="emit('startTest', 'questionnaire')">
            {{ testList.questionnaire.test.ended ? 'Завершен' : 'Начать тестирование' }}
          </div>
        </div>
        <div class="test-container" v-if="testList.iq">
          <div class="test-name">Тест IQ</div>
          <div class="test-text questions-count">Вопросов в тесте: 40</div>
          <div class="test-text time-to-pass">Макс. время прохождения: <span class="text-red">30 минут </span></div>
          <div class="start-test mt-4"
               :class="testList.iq.test.ended && ' ended'"
               @click="emit('startTest', 'iq')">
            {{ testList.iq.test.ended ? 'Завершен' : 'Начать тестирование' }}
          </div>
        </div>
      </div>
      <div class="bottom-text text-center">
        Для завершения тестирования необходимо пройти все тесты, в любом порядке.
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
      text-align: center;
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
      }
    }
  }

  .content {
    display: flex;
    margin: 2em 0;
    flex-direction: column;
    padding: 0 1em;
    box-sizing: border-box;
    color: #122130;

    @media screen and (max-width: 820px) {
      margin: 40px 0 auto;
    }

    @media screen and (max-width: 770px) {
      margin: 40px 0 auto;
      padding: 0 1em;
    }

    .heading {
      font-size: 144%;
      line-height: 29px;
      font-weight: 600;
      text-align: center;
      margin-bottom: 1em;


      @media screen and (max-width: 820px) {
        font-size: 20px;
        line-height: 24px;
      }

      @media screen and (max-width: 770px) {
        font-size: 17px;
        line-height: 21.6px;
      }
    }

    .test-list {
      display: flex;
      justify-content: center;
      margin: auto auto 2em;
      gap: 1em;

      .test-container {
        padding: 1em 2em;
        background-color: #F8F8F8;
        border-radius: 10px;

        .test-name {
          font-weight: 600;
          font-size: 18px;
          line-height: 25.2px;
          color: #122130;
          margin-bottom: 1em;

          @media screen and (max-width: 820px) {
            font-size: 16px;
            line-height: 21.6px;
          }
        }

        .test-text {
          margin-bottom: 6px;
          font-weight: 400;
          font-size: 14px;
          line-height: 22.4px;
          color: #5F5E5E;

          @media screen and (max-width: 820px) {
            font-size: 12px;
          }
        }

        .start-test {
          cursor: pointer;
          padding: 1em 0;
          width: 100%;
          font-weight: 700;
          font-size: 16px;
          line-height: 19.2px;
          text-align: center;
          color: #FFFFFF;
          background-color: #8F47FF;
          border-radius: 10px;

          @media screen and (max-width: 820px) {
            font-size: 14px;
            line-height: 21.6px;
          }

          &.ended {
            background-color: #1f813b;
            opacity: .2;
            cursor: not-allowed;
          }
        }
      }

      .bottom-text {
        font-weight: 400;
        font-size: 14px;
        line-height: 25.6px;
        color: #122130;
        text-align: center;

      }
    }
  }
}

</style>