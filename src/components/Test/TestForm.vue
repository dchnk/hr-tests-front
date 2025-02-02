<script setup>
// import {questions} from '../../vendor/oxford-test.js';
import {reactive, toRefs, watch, ref, computed} from 'vue';

const emit = defineEmits(['endTest'])
const {pending, questions} = defineProps(['pending', 'questions']);
const questionsLength = Object.keys(questions).length;

let answered = reactive({});
let current = ref(1);
const progress = computed(() => {
  return Math.floor((Object.keys(answered).length / questionsLength) * 100);
})

const selectAnswer = (answer) => {

  answered[questions[current.value].id] = answer;

  if (current.value !== questionsLength) {
    current.value++;
  } else {
    if (Object.keys(answered).length === questionsLength) {
      emit('endTest', answered)
    }
  }
}

const prevAnswer = () => {
  if (current.value === 1) return;
  current.value--;
}

</script>

<template>
  <section class="container">
    <div class="header">
      <div class="logo"></div>
      <p class="heading">Онлайн-оценка сотрудников</p>
    </div>
    <div class="progress">
      <div class="content">
        <div class="questions">вопрос {{ current }} из {{ questionsLength }}</div>
        <div class="percent">Готово: <span class="num">{{ progress }}%</span></div>
      </div>
      <div class="bar">
        <div class="line" :style='{width: `${progress}%`}'/>
      </div>
    </div>
  </section>
  <div class="question" v-if="!pending">
    <div class="num">вопрос {{ current }}</div>
    <div class="text">{{ questions[current].text }}
    </div>
    <div class="answers">
      <button class="answer" :class="answered[questions[current].id] === 'yes' && 'selected'" @click="selectAnswer('yes')">Да</button>
      <button class="answer" :class="answered[questions[current].id] === 'maybe' && 'selected'" @click="selectAnswer('maybe')">Может быть</button>
      <button class="answer" :class="answered[questions[current].id] === 'no' && 'selected'" @click="selectAnswer('no')">Нет</button>
    </div>
    <button class="prev" @click="prevAnswer"><span class="arrow">&#8592;</span>Предудыщий вопрос</button>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  margin: 4.4% auto 0;
  flex-direction: column;
  max-width: 60em;
  width: 100%;
  border: 1px solid #E8E8E8;
  background-color: #FFFFFF;
  border-radius: 22px;
  overflow: hidden;

  @media screen and (max-width: 820px) {
    border-radius: 0px;
    margin: 0 auto 0;
    border: none;
    border-bottom: 1px solid #E8E8E8;
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

  .progress {
    display: flex;
    margin: 18px 0 22px;
    flex-direction: column;
    box-sizing: border-box;
    padding: 0 2em;
    color: #122130;

    @media screen and (max-width: 770px) {
      margin: 1em 0;
      padding: 0 1em;
    }

    .content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2px;

      .questions {
        font-size: 71%;
        font-weight: 600;
        line-height: 19.2px;
        letter-spacing: 0.02em;
        color: #B9BBC1;
        text-transform: uppercase;
      }

      .percent {
        font-size: 14px;
        font-weight: 400;
        line-height: 22.4px;

        .num {
          font-size: 16px;
          font-weight: 700;
          line-height: 19.2px;
          color: #FFAA2A;

        }

      }
    }

    .bar {
      position: relative;
      width: 100%;
      background-color: #F0F0F0;
      border-radius: 4px;
      height: 10px;
      overflow: hidden;

      @media screen and (max-width: 770px) {
        height: 8px;
      }

      .line {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        width: 10%;
        background-color: #FFAA2A;
        border-radius: inherit;

      }

    }
  }
}

.question {
  display: flex;
  margin: 1.4% auto auto;
  flex-direction: column;
  padding: 48px 2em 52px;
  max-width: 60em;
  width: 100%;
  border: 1px solid #E8E8E8;
  background-color: #FFFFFF;
  border-radius: 22px;
  box-sizing: border-box;

  @media screen and (max-width: 820px) {
    margin: 0 auto auto;
    padding: 36px 2em 52px;
    border: none;
    border-radius: 0;
  }

  @media screen and (max-width: 770px) {
    margin: 0 auto auto;
    padding: 28px 1em 0;
  }

  .num {
    font-size: 12px;
    font-weight: 600;
    line-height: 19.2px;
    letter-spacing: 0.02em;
    text-transform: uppercase;
    color: #B9BBC1;
    margin-bottom: 16px;

    @media screen and (max-width: 770px) {
      margin-bottom: 12px;
    }
  }

  .text {
    font-size: 119%;
    font-weight: 400;
    line-height: 32px;
    margin-bottom: 36px;

    @media screen and (max-width: 820px) {
      line-height: 28.8px;
      margin-bottom: 32px;
    }

    @media screen and (max-width: 770px) {
      font-size: 17px;
      margin-bottom: 28px;
    }
  }

  .answers {
    display: flex;
    width: 100%;
    justify-content: space-between;
    margin-bottom: 24px;

    @media screen and (max-width: 820px) {
      margin-bottom: 16px;
    }

    @media screen and (max-width: 770px) {
      flex-direction: column;
      margin-bottom: 0px;
    }

    .answer {
      padding: 15px 0;
      width: 31.7%;
      margin: 0;
      color: #8F47FF;
      border: 1px solid #8F47FF;
      font-size: 18px;
      font-weight: 700;
      line-height: 21.6px;
      border-radius: 10px;
      background-color: #FFFFFF;
      cursor: pointer;

      &.selected {
        color: #FFFFFF;
        background-color: #8F47FF;
      }

      @media screen and (max-width: 770px) {
        width: 100%;
        margin-bottom: 8px;
        font-size: 15px;
        line-height: 19.2px;
      }
    }
  }

  .prev {
    background-color: #F8F8F8;
    border-radius: 10px;
    padding: 15px 0;
    margin: 0;
    width: 100%;
    border: none;
    font-size: 16px;
    font-weight: 700;
    line-height: 19.2px;
    color: #8F47FF;
    cursor: pointer;
    transition: all .3s ease-in-out;

    &:hover {
      background-color: #8F47FF;
      color: #FFFFFF;
    }

    .arrow {
      display: inline-block;
      font-size: 24px;
      margin-right: 10px;
      transform: translate(0, 2px);
    }
  }
}

</style>
