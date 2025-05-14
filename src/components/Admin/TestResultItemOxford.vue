<script setup>
import {computed, ref, watchEffect} from "vue";

const {test, opened} = defineProps(['test', 'opened']);

const isOpen = ref(false);

watchEffect(() => {
  if (opened) isOpen.value = true;

  console.log(test)
})

const mainMotivationHeading = computed(() => {
  if (!test.motivation.main) return;
  return test.motivation.main?.length > 1 ? 'Основные мотивации:' : 'Основаная мотивация:';
})

const secondaryMotivationHeading = computed(() => {
  if (!test.motivation.secondary) return;
  return test.motivation?.secondary?.length > 1 ? 'Дополнительные мотивации:' : 'Дополнительная мотивация:';
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

function handleOpenToggle() {
  isOpen.value = !isOpen.value;
}

</script>

<template>
  <div class="test-item" :class="isOpen && 'open'">
    <div class="heading" @click="handleOpenToggle">
      <div class="name" :class="isOpen && 'open'">Базовый тест</div>
      <div v-if="!opened" class="btn arrow" :class="isOpen && 'open'" @click.stop="handleOpenToggle">
        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="7" viewBox="0 0 10 7" fill="none">
          <path d="M9 1.5L5 5.5L1 1.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <div class="tooltip">{{ isOpen ? 'Скрыть результаты' : 'Показать результаты' }}</div>
      </div>
    </div>
    <div class="container" v-if="isOpen">
      <div class="graph">
        <div class="percent percent-100">100</div>
        <div class="percent percent-50">50</div>
        <div class="percent percent-0">0</div>
        <div class="percent percent-50-minus">-50</div>
        <div class="percent percent-100-minus">-100</div>
        <div class="center"/>
        <div class="line-100"/>
        <div class="line-50"/>
        <div class="line-50-minus"/>
        <div class="line-100-minus"/>

        <div class="columns">
          <div class="column">
            <div class="text">У ({{ test.types.a.percent }})</div>
            <div class="diagram" :style="{ height: `${test.types.a.level}%` }"/>
          </div>
          <div class="column">
            <div class="text">С ({{ test.types.b.percent }})</div>
            <div class="diagram" :style="{ height: `${test.types.b.level}%` }"/>
          </div>
          <div class="column">
            <div class="text">Н ({{ test.types.c.percent }})</div>
            <div class="diagram" :style="{ height: `${test.types.c.level}%` }"/>
          </div>
          <div class="column">
            <div class="text">Т ({{ test.types.d.percent }})</div>
            <div class="diagram" :style="{ height: `${test.types.d.level}%` }"/>
          </div>
          <div class="column">
            <div class="text">А ({{ test.types.e.percent }})</div>
            <div class="diagram" :style="{ height: `${test.types.e.level}%` }"/>
          </div>
          <div class="column">
            <div class="text">Р ({{ test.types.f.percent }})</div>
            <div class="diagram" :style="{ height: `${test.types.f.level}%` }"/>
          </div>
          <div class="column">
            <div class="text">П ({{ test.types.g.percent }})</div>
            <div class="diagram" :style="{ height: `${test.types.g.level}%` }"/>
          </div>
          <div class="column">
            <div class="text">К ({{ test.types.h.percent }})</div>
            <div class="diagram" :style="{ height: `${test.types.h.level}%` }"/>
          </div>
          <div class="column">
            <div class="text">О ({{ test.types.i.percent }})</div>
            <div class="diagram" :style="{ height: `${test.types.i.level}%` }"/>
          </div>
          <div class="column">
            <div class="text">Щ ({{ test.types.j.percent }})</div>
            <div class="diagram" :style="{ height: `${test.types.j.level}%` }"/>
          </div>
        </div>
      </div>
      <div class="test-info">
        <div class="test-name">Базовый тест</div>
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
      <div class="characteristics">
        <div class="characteristics__heading">
          Характеристики
        </div>
        <div class="characteristic-list">
          <div class="characteristic">
            <div class="characteristic__group">
              <div class="characteristic__name">Точка У - Устойчивость/непредсказуемость</div>
              <div class="characteristic__score" :class="test.types.a.rait">
                {{ `Балл: ${test.types.a.percent} (${test.types.a.raitName})` }}
              </div>
            </div>
            {{ test.types.a.text }}
          </div>
          <div class="characteristic">
            <div class="characteristic__group">
              <div class="characteristic__name">Точка С - Счастье/подавленность</div>
              <div class="characteristic__score" :class="test.types.b.rait">
                {{ `Балл: ${test.types.b.percent} (${test.types.b.raitName})` }}
              </div>
            </div>
            {{ test.types.b.text }}
          </div>
          <div class="characteristic">
            <div class="characteristic__group">
              <div class="characteristic__name">Точка Н - Спокойствие/нервозность </div>
              <div class="characteristic__score" :class="test.types.c.rait">
                {{ `Балл: ${test.types.c.percent} (${test.types.c.raitName})` }}
              </div>
            </div>
            {{ test.types.c.text }}
          </div>
          <div class="characteristic">
            <div class="characteristic__group">
              <div class="characteristic__name">Точка Т - Твердость характера/сомнение</div>
              <div class="characteristic__score" :class="test.types.d.rait">
                {{ `Балл: ${test.types.d.percent} (${test.types.d.raitName})` }}
              </div>
            </div>
            {{ test.types.d.text }}
          </div>
          <div class="characteristic">
            <div class="characteristic__group">
              <div class="characteristic__name">Точка А - Активность</div>
              <div class="characteristic__score" :class="test.types.e.rait">
                {{ `Балл: ${test.types.e.percent} (${test.types.e.raitName})` }}
              </div>
            </div>
            {{ test.types.e.text }}
          </div>
          <div class="characteristic">
            <div class="characteristic__group">
              <div class="characteristic__name">Точка Р - Настойчивость/робость</div>
              <div class="characteristic__score" :class="test.types.f.rait">
                {{ `Балл: ${test.types.f.percent} (${test.types.f.raitName})` }}
              </div>
            </div>
            {{ test.types.f.text }}
          </div>
          <div class="characteristic">
            <div class="characteristic__group">
              <div class="characteristic__name">Точка П - Объективность/предубежденность</div>
              <div class="characteristic__score" :class="test.types.g.rait">
                {{ `Балл: ${test.types.g.percent} (${test.types.g.raitName})` }}
              </div>
            </div>
            {{ test.types.g.text }}
          </div>
          <div class="characteristic">
            <div class="characteristic__group">
              <div class="characteristic__name">Точка К - Адекватность оценки/критичность</div>
              <div class="characteristic__score" :class="test.types.h.rait">
                {{ `Балл: ${test.types.h.percent} (${test.types.h.raitName})` }}
              </div>
            </div>
            {{ test.types.h.text }}
          </div>
          <div class="characteristic">
            <div class="characteristic__group">
              <div class="characteristic__name">Точка О - Открытость</div>
              <div class="characteristic__score" :class="test.types.i.rait">
                {{ `Балл: ${test.types.i.percent} (${test.types.i.raitName})` }}
              </div>
            </div>
            {{ test.types.i.text }}
          </div>
          <div class="characteristic">
            <div class="characteristic__group">
              <div class="characteristic__name">Точка Щ - Общение</div>
              <div class="characteristic__score" :class="test.types.j.rait">
                {{ `Балл: ${test.types.j.percent} (${test.types.j.raitName})` }}
              </div>
            </div>
            {{ test.types.j.text }}
          </div>
        </div>
      </div>
      <div class="syndromes ">
        <div class="syndromes__heading">
          Синдромы
        </div>
        <div class="syndrome-list">
          <div class="syndrome keep-together" v-for="syndrome in test.syndromes">
            {{ syndrome.text }}
          </div>
        </div>
      </div>
      <div class="characteristics no-page-break" v-if="test.motivation.main">
        <div class="characteristics__heading">
          {{ mainMotivationHeading }}
        </div>
        <div class="characteristic-list no-page-break">
          <div class="characteristic no-page-break" v-for="motivation in test.motivation.main">
            <div class="characteristic__group">
              <div class="characteristic__name">{{ motivation.name }}</div>
              <div class="characteristic__score high">{{ `Балл: ${motivation.value}` }}</div>
            </div>
            {{ motivation.text }}
          </div>
        </div>
      </div>
      <div class="motivation_description" v-if="test.motivation.main">
        Тип мотивации, получивший самое большое количество баллов, будет является ведущим. Второй по количеству тип
        будет являться дополнительным.
      </div>
      <div class="motivation_description last" v-if="test.motivation.main">
        <span class="bold">Важно!</span>
        Необходимо помнить, что практически не бывает людей с одним (чистым) типом мотивации. Бывает, что 2 и более
        типов мотивации набирают одинаковое количество баллов. В таком случае считается, что все эти типы мотивации
        являются ведущими.
      </div>
      <div class="characteristics no-page-break" v-if="test.motivation.secondary.length > 0">
        <div class="characteristics__heading">
          {{ secondaryMotivationHeading }}
        </div>
        <div class="characteristic-list" >
          <div class="characteristic-list">
            <div class="characteristic no-page-break" v-for="motivation in test.motivation.secondary">
              <div class="characteristic__group">
                <div class="characteristic__name">{{ motivation.name }}</div>
                <div class="characteristic__score middle">{{ `Балл: ${motivation.value}` }}</div>
              </div>
              {{ motivation.text }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.no-page-break {
  page-break-inside: avoid;
  break-inside: avoid;
}

.test-item {
  display: flex;
  flex-direction: column;
  margin-bottom: 8px;

  .motivation_description {
    background-color: #f8f8f8;
    font-size: 90%;
    padding: 1em 1em .5em;
    border-top: 1px solid #e7e7e7;

    &.last {
      padding: 0 1em 1em;
      border-top: none;
      border-bottom: 1px solid #e7e7e7;
    }

    .bold {
      font-weight: bold;
    }
  }

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

    .columns {
      position: relative;
      display: flex;
      gap: 1%;
      width: 92%;
      height: 100%;
      margin: 0 0 auto;
      justify-content: space-between;
      align-items: end;

      .column {
        position: relative;
        display: flex;
        flex-direction: column-reverse;
        justify-content: flex-start;
        text-align: center;
        width: 10%;
        max-width: 44px;
        height: 100%;
        page-break-inside: avoid;
        break-inside: avoid;

        .diagram {
          background-color: #7987FF;
          min-height: 1%;
        }

        .text {
          position: absolute;
          left: 50%;
          bottom: -40px;
          transform: translate(-50%, 0);
          font-family: Manrope;
          font-size: 12px;
          font-weight: 500;
          line-height: 16.39px;
          color: #122130;
        }
      }
    }


    .characteristics {
      margin: 2em auto;

      @media screen and (max-width: 1200px) {
        font-size: 14px;
      }

      .characteristics__heading {
        font-family: Manrope;
        font-size: 20px;
        font-weight: 700;
        line-height: 24px;
        color: #122130;
        margin: 1em 0;
      }

      .characteristic-list {

        .characteristic {
          margin: 1em 0;
          page-break-inside: avoid;
          break-inside: avoid;

          &:last-child {
            margin-bottom: 0;
          }

          .characteristic__name {
            font-family: Manrope;
            font-size: 16px;
            font-weight: 700;
            line-height: 19.2px;
            color: #122130;

            @media screen and (max-width: 1200px) {
              font-size: 14px;
            }
          }


          .characteristic__group {
            margin-bottom: 1em;
            display: flex;
            width: 100%;
            justify-content: space-between;

            .characteristic__score {
              font-size: 16px;
              font-weight: 700;
              line-height: 19.2px;
              text-align: end;

              @media screen and (max-width: 1200px) {
                font-size: 14px;
              }

              &.high {
                color: #0BC03E;
              }

              &.middle {
                color: #C9AC12;
              }

              &.low {
                color: #c96412;
              }

              &.veryLow {
                color: #D01408;
              }

            }
          }
        }
      }
    }

    .syndromes {
      margin: 2em 0;

      @media screen and (max-width: 1200px) {
        font-size: 14px;
      }

      .syndromes__heading {
        font-family: Manrope;
        font-size: 20px;
        font-weight: 700;
        line-height: 24px;
        color: #122130;
        margin-bottom: 1em;
      }

      .syndrome-list {

        .syndrome {
          margin-bottom: 2em;

          &:last-child {
            margin-bottom: 0;
          }
        }
      }
    }


    .graph {
      position: relative;
      height: 278px;
      display: flex;
      justify-content: flex-end;

      .percent {
        position: absolute;
        font-family: Manrope;
        font-size: 12px;
        font-weight: 500;
        line-height: 16.39px;
        text-align: center;
      }

      .percent-a {
        bottom: 0;
        left: 10%;
      }

      .percent-b {
        bottom: 0;
        left: 20%;
      }

      .percent-c {
        bottom: 0;
        left: 30%;
      }

      .percent-d {
        bottom: 0;
        left: 40%;
      }

      .percent-e {
        bottom: 0;
        left: 50%;
      }

      .percent-f {
        bottom: 0;
        left: 60%;
      }

      .percent-g {
        bottom: 0;
        left: 70%;
      }

      .percent-h {
        bottom: 0;
        left: 80%;
      }

      .percent-i {
        bottom: 0;
        left: 90%;
      }

      .percent-j {
        bottom: 0;
        left: 100%;
      }

      //.column {
      //  position: absolute;
      //  width: 3%;
      //  background-color: #7987FF;
      //  height: 10%;
      //  bottom: 10px;
      //}

      .a {
        left: 7%;
      }

      .b {
        left: 20%;
      }

      .c {
        left: 30%;
      }

      .d {
        left: 40%;
      }

      .e {
        left: 50%;
      }

      .f {
        left: 60%;
      }

      .g {
        left: 70%;
      }

      .h {
        left: 80%;
      }

      .i {
        left: 90%;
      }

      .j {
        left: 100%;
      }

      .center {
        position: absolute;
        height: 1px;
        top: 50%;
        width: 95%;
        margin: auto 0;
        background-color: #E6E6E6;
      }

      .line-50 {
        position: absolute;
        height: 1px;
        top: 25%;
        width: 95%;
        margin: auto 0;
        background-color: #E6E6E6;
      }

      .line-100 {
        position: absolute;
        height: 1px;
        top: 0;
        width: 95%;
        margin: auto 0;
        background-color: #E6E6E6;
      }

      .line-50-minus {
        position: absolute;
        height: 1px;
        bottom: 25%;
        width: 95%;
        margin: auto 0;
        background-color: #E6E6E6;
      }

      .line-100-minus {
        position: absolute;
        height: 1px;
        bottom: 0;
        width: 95%;
        margin: auto 0;
        background-color: #E6E6E6;
      }

      .percent-100 {
        top: 0;
        left: -5px;
      }

      .percent-50 {
        top: 25%;
        left: -5px;
      }

      .percent-0 {
        top: 50%;
        left: -5px;
      }

      .percent-50-minus {
        bottom: 25%;
        left: -5px;
      }

      .percent-100-minus {
        bottom: 0;
        left: -5px;
      }
    }
  }

  .test-info {
    margin-top: 3em;
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
      z-index: 1;

      &.archived {
        z-index: auto;
      }
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

      &.edit, &.archive, &.delete {
        margin-right: 8px;

        svg {
          height: 17px;
        }
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
        z-index: 2;
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
          z-index: 1;
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