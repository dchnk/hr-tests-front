<script setup>
import {computed, ref, watchEffect} from "vue";
import {iqTestQuestions} from "../../vendor/iq-test.js";

const {test, questions, opened} = defineProps(['test', 'questions', 'opened']);

const isOpen = ref(false);

watchEffect(() => {
  if (opened) isOpen.value = true;
})

const started = computed((data) => {
  const started = test?.started;

  // Проверка на наличие значения
  if (!started) {
    console.error("createdAt is not defined or is invalid");
    return null; // Или любое другое значение по умолчанию
  }

  const date = new Date(started);
  if (isNaN(date.getTime())) {
    console.error("Invalid date format:", started);
    return null; // Или любое другое значение по умолчанию
  }

  const pad = (num) => (num < 10 ? '0' + num : num);

  // Получаем компоненты даты
  const day = pad(date.getDate()); // Используем getDate() для локального дня
  const month = pad(date.getMonth() + 1); // Используем getMonth() для локального месяца
  const year = date.getFullYear(); // Используем getFullYear() для локального года
  const hours = pad(date.getHours()); // Используем getHours() для локальных часов
  const minutes = pad(date.getMinutes()); // Используем getMinutes() для локальных минут

  return `${day}.${month}.${year} ${hours}:${minutes}`;
});

const ended = computed((data) => {
  const ended = test?.ended;

  // Проверка на наличие значения
  if (!ended) {
    console.error("createdAt is not defined or is invalid");
    return null; // Или любое другое значение по умолчанию
  }

  const date = new Date(ended);
  if (isNaN(date.getTime())) {
    console.error("Invalid date format:", ended);
    return null; // Или любое другое значение по умолчанию
  }

  const pad = (num) => (num < 10 ? '0' + num : num);

  // Получаем компоненты даты
  const day = pad(date.getDate()); // Используем getDate() для локального дня
  const month = pad(date.getMonth() + 1); // Используем getMonth() для локального месяца
  const year = date.getFullYear(); // Используем getFullYear() для локального года
  const hours = pad(date.getHours()); // Используем getHours() для локальных часов
  const minutes = pad(date.getMinutes()); // Используем getMinutes() для локальных минут

  return `${day}.${month}.${year} ${hours}:${minutes}`;
});

const rightAnswers = ref(0);

function handleOpenToggle() {
  isOpen.value = !isOpen.value;
}

function prepareTest() {
  for (let index in test.result) {

    if (index == 22) {
      test.result[index].input_1

      if (['ребенок', 'ребёнок'].some((arg) => arg === test.result[index].input_1)) {
        rightAnswers.value++;
      }

      continue;
    }

    if (iqTestQuestions[index].input_1) {

      if (iqTestQuestions[index].input_1.answer === test.result[index].input_1) {
        rightAnswers.value++;
      }

      if (iqTestQuestions[index].input_2 && test.result[index].input_2) {
        if (iqTestQuestions[index].input_2.answer !== test.result[index].input_2) {
          rightAnswers.value--;
        }
      }
    }

    if (iqTestQuestions[index].radio) {
      if (iqTestQuestions[index].radio.answer === test.result[index]) {
        rightAnswers.value++;
      }
    }

    if (iqTestQuestions[index].selects) {
      if (iqTestQuestions[index].selects.answer == test.result[index]) {
        rightAnswers.value++;
      }
    }

  }
}


const iqResult = computed(() => {
  if (rightAnswers.value <= 6) {
    return 90;
  }

  if (rightAnswers.value >= 8 && rightAnswers.value < 10) {
    return 90;
  }

  if (rightAnswers.value === 10) {
    return 100;
  }

  if (rightAnswers.value > 10) {
    return (rightAnswers.value - 10) / 2 * 5 + 100;
  }
})

const resultDescription = computed(() => {
  console.log(iqResult.value)

  if(iqResult.value < 70) return 'Очень низкий'
  if(iqResult.value >= 70 && iqResult.value <= 80) return 'Низкий'
  if(iqResult.value > 80 && iqResult.value <= 90) return 'Очень низкий'
  if(iqResult.value > 90 && iqResult.value <= 110) return 'Средний'
  if(iqResult.value > 110 && iqResult.value <= 125) return 'Высше среднего'
  if(iqResult.value > 125 && iqResult.value <= 140) return 'Очень низкий'
  if(iqResult.value > 140) return 'Очень высокий'
})

prepareTest()

</script>

<template>
  <div class="test-item-questionnaire" :class="isOpen && 'open'">
    <div class="heading" @click="handleOpenToggle">
      <div class="name" :class="isOpen && 'open'">Тест IQ</div>
      <div v-if="!opened" class="btn arrow" :class="isOpen && 'open'" @click.stop="handleOpenToggle">
        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="7" viewBox="0 0 10 7" fill="none">
          <path d="M9 1.5L5 5.5L1 1.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <div class="tooltip">{{ isOpen ? 'Скрыть результаты' : 'Показать результаты' }}</div>
      </div>
    </div>
    <div class="container" v-if="isOpen">
      <div class="test-info">
        <div class="test-name">Тест IQ</div>
        <div class="info">
          <div class="item">
            <div class="item-name">Начало</div>
            <div class="value">{{ test?.started && started || "Не начат" }}</div>
          </div>
          <div class="item">
            <div class="item-name">Завершение</div>
            <div class="value">{{ test?.ended && ended || "-" }}</div>
          </div>
        </div>
      </div>
      <div class="results">
        <div class="results__heading">
          Результаты
        </div>
        Всего верных ответов: {{ rightAnswers }} из 40
        <div>
          Итоговый результат: {{ iqResult }} ({{ resultDescription }})
        </div>
      </div>
      <div class="results-description">
        <div class="__heading">Описание результатов:</div>
        <div class="__item">
          <div class="__score-value">Балл: < 70</div>
          <div class="__score-description">Очень низкий</div>
        </div>
        <div class="__item">
          <div class="__score-value">Балл: 70 - 80</div>
          <div class="__score-description">Низкий</div>
        </div>
        <div class="__item">
          <div class="__score-value">Балл: 81 - 90</div>
          <div class="__score-description">Ниже среднего</div>
        </div>
        <div class="__item">
          <div class="__score-value">Балл: 91 - 110</div>
          <div class="__score-description">Средний</div>
        </div>
        <div class="__item">
          <div class="__score-value">Балл: 111 - 125</div>
          <div class="__score-description">Выше среднего</div>
        </div>
        <div class="__item">
          <div class="__score-value">Балл: 126 - 140</div>
          <div class="__score-description">Высокий</div>
        </div>
        <div class="__item">
          <div class="__score-value">Балл: > 141</div>
          <div class="__score-description">Очень высокий</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.test-item-questionnaire {
  display: flex;
  flex-direction: column;
  margin-bottom: 8px;

  .container {
    display: none;
    flex-direction: column;
    margin: 24px 24px 44px;

    @media screen and (max-width: 900px) {
      margin: 24px 24px 32px;
    }

    @media screen and (max-width: 750px) {
      margin: 22px 12px 28px;
    }
  }

  .test-info {
    background-color: #F4F5F7;
    border-radius: 10px;
    padding: 24px;

    .test-name {
      font-family: Manrope;
      font-size: 16px;
      font-weight: 700;
      line-height: 19.2px;
      color: #122130;
    }

    .info {
      margin-top: 1em;
      display: flex;
      gap: 1em;

      .item {


        .item-name {
          font-family: Manrope;
          font-size: 14px;
          font-weight: 400;
          line-height: 22.4px;
          text-align: left;
          color: #686B74;
        }

        .value {
          font-family: Manrope;
          font-size: 14px;
          font-weight: 400;
          line-height: 22.4px;
          text-align: left;
          color: #122130;
        }
      }
    }
  }

  .heading {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    padding: 14.5px 24px;
    box-sizing: border-box;
    background-color: #F4F5F7;
    border-radius: 10px;
    cursor: pointer;


    @media screen and (max-width: 750px) {
      padding: 8px 12px;
    }

    .notification {
      display: flex;
      justify-content: center;
      align-items: center;
      color: #FFFFFF;
      font-size: 13px;
      font-weight: 700;
      line-height: 18.2px;
      height: 24px;
      min-width: 24px;
      background-color: #8F47FF;
      border-radius: 50%;
    }

    .name {
      margin: 0 auto 0 12.5px;
      font-size: 14px;
      font-weight: 600;
      line-height: 19.6px;

      @media screen and (max-width: 750px) {
        font-size: 12px;
        line-height: 16.8px;
      }
    }

    .btn {
      position: relative;
      display: flex;
      height: 32px;
      min-width: 32px;
      background-color: #FFFFFF;
      border-radius: 10px;
      cursor: pointer;

      svg {
        stroke: #122130;
        margin: auto;
      }

      &.arrow {
        margin-left: 16px;

        &.open {

          svg {
            transform: rotate(180deg);
          }

        }
      }


      &.more {
        display: none;

        .content {
          z-index: 2;
          position: absolute;
          width: max-content;
          right: 0;
          top: 120%;
          background-color: #FFFFFF;
          border: 1px solid #E6E6E6;
          border-radius: 10px;
          color: #686B74;
          padding: 16px 14px;
          box-sizing: border-box;
          visibility: hidden;
          opacity: 0;
          transition: opacity .2s ease-in-out, visibility .2s ease-in-out;

          &.open {
            visibility: visible;
            opacity: 1;
          }

          .item {
            cursor: pointer;
            display: flex;
            align-items: center;
            margin-bottom: 12px;
            justify-content: flex-start;

            svg {
              height: 18px;
              width: 18px;
              margin: 0 8px 0 0;
            }

            &:last-of-type {
              margin-bottom: 0;
            }

            &.delete {
              svg {
                stroke: #D01408;
              }

              .text {
                color: #D01408;
              }
            }

            .text {
              font-size: 12px;
              font-weight: 600;
              line-height: 16.8px;
              text-align: left;
              margin: 0;
            }
          }
        }
      }

      .tooltip {
        z-index: 10;
        position: absolute;
        width: max-content;
        right: 0;
        top: -50%;
        color: #FFFFFF;
        background-color: #000000;
        border-radius: 10px;
        padding: 6px 12px;
        box-sizing: border-box;
        visibility: hidden;
        opacity: 0;
        font-size: 12px;
        font-weight: 500;
        line-height: 19.2px;

        &:after {
          transform: rotate(-45deg);
          content: "";
          z-index: 9;
          display: block;
          position: absolute;
          top: 10px;
          right: 10px;
          height: 10px;
          width: 10px;
          border-radius: 0px 4px 0px 0px;
          background-color: #000000;
          visibility: hidden;
          opacity: 0;
        }
      }

      @media (hover: hover) {
        &:hover {
          svg {
            stroke: #8F47FF;
          }

          .tooltip {
            visibility: visible;
            opacity: 1;
            top: 125%;

            &:after {
              visibility: visible;
              opacity: 1;
              top: -5px;
            }
          }
        }
      }

      @media screen and (max-width: 750px) {
        svg {
          //height: 17px;
        }

        &.edit, &.archive, &.delete {
          display: none;
        }

        &.arrow {
          margin-left: 7px;
        }

        &.more {
          display: flex;
        }
      }
    }
  }

  .results {
    margin: 2em 0;

    @media screen and (max-width: 1200px) {
      font-size: 14px;
    }

    .results__heading {
      text-align: start;
      font-size: 22px;
      font-weight: 700;
      line-height: 24px;
      color: #122130;
      margin-bottom: 1em;
    }

    .results-list {

      .result-item {
        margin-bottom: 2em;
        padding: 2em;
        background-color: #F4F5F7;
        border-radius: 10px;

        &:last-child {
          margin-bottom: 0;
        }

        .result__question {
          font-family: Manrope;
          font-size: 16px;
          font-weight: 700;
          line-height: 19.2px;
          color: #122130;
          margin-bottom: 1em;

          @media screen and (max-width: 1200px) {
            font-size: 14px;
          }
        }

        .result__answer {
          font-family: Manrope;
          font-size: 16px;
          font-weight: 400;
          line-height: 19.2px;
          color: #122130;

          @media screen and (max-width: 1200px) {
            font-size: 14px;
          }
        }

        .result__description {
          border-radius: 10px;
          padding: 1em;
          margin-top: 1em;
          font-family: Manrope;
          font-size: 16px;
          font-weight: 400;
          line-height: 19.2px;
          color: #ffffff;
          background-color: #9974d2;

          @media screen and (max-width: 1200px) {
            font-size: 14px;
          }
        }


      }
    }
  }

  .results-description {

    .__heading{
      margin-bottom: 1em;
      font-size: 20px;
    }

    .__item{
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #E6E6E6;
      max-width: 400px;
      margin-bottom: 0.5em;

      .__score-value {
        font-size: 14px;
        font-weight: 600;
        margin-right: 1em;
      }
      .__score-description {
        font-size: 16px;
      }
    }
  }

  &.open {
    background-color: #FFFFFF;
    border-radius: 10px;
    border: 1px solid #E6E6E6;

    .heading {
      background-color: #8F47FF;
    }

    .name {
      color: #FFFFFF;
    }

    .container {
      display: flex;
    }
  }


}
</style>