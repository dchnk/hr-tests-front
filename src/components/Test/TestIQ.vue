<script setup>
import {iqTestQuestions} from '../../vendor/iq-test.js';

import {reactive, toRefs, watch, ref, computed, onMounted} from 'vue';

const emit = defineEmits(['endTest'])
const {pending, questions} = defineProps(['pending', 'questions']);

const questionsLength = Object.keys(questions).length;

let answered = reactive({});
let answeredEnded = reactive({});
let current = ref(1);
const progress = computed(() => {
  return Math.floor((Object.keys(answeredEnded).length / questionsLength) * 100);
})

const nextAnswer = () => {

  if (iqTestQuestions[current.value].input_1) {
    answeredEnded[current.value] = {
      'input_1': answered[current.value + '-input_1'] ? answered[current.value + '-input_1'].toLowerCase() : null
    }

    if (iqTestQuestions[current.value].input_2) {
      answeredEnded[current.value]['input_2'] = answered[current.value + '-input_2'] ? answered[current.value + '-input_2'].toLowerCase() : null
    }

    if (current.value !== questionsLength) {
      current.value++;
    } else {
      if (Object.keys(answeredEnded).length === questionsLength) {
        emit('endTest', 'iq', answered)
      }
    }


    return;
  }

  if (!answered[current.value]) {
    answeredEnded[current.value] = null;
  } else {
    answeredEnded[current.value] = answered[current.value];
  }

  if (current.value !== questionsLength) {
    current.value++;
  } else {
    if (Object.keys(answeredEnded).length === questionsLength) {
      emit('endTest', 'iq', answered)
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
    <div v-if="iqTestQuestions[current].img" :class="`test-img-${iqTestQuestions[current].id}`" class="img"/>
    <div class="num">вопрос {{ current }}</div>
    <div class="text">{{ questions[current].text }}
    </div>
    <div class="description" v-if="iqTestQuestions[current].type === 'input'">{{ questions[current].description }}</div>
    <div class="inputs_group" v-if="iqTestQuestions[current].type.includes('input')">
      <div class="input" v-if="iqTestQuestions[current].input_1">
        <div class="label">{{ iqTestQuestions[current].input_1.label }}</div>
        <input class="iq-input" maxlength="20" type="text" v-model="answered[current + '-input_1']">
      </div>
      <div class="input" v-if="iqTestQuestions[current].input_2">
        <div class="label">{{ iqTestQuestions[current].input_2.label }}</div>
        <input class="iq-input" maxlength="20" type="text" v-model="answered[current + '-input_2']">
      </div>
    </div>
    <div class="radio_group" v-if="iqTestQuestions[current].radio">
      <div class="radio" @click="answered[current] = iqTestQuestions[current].radio[1]">
        <div class="select" :class="answered[current] === iqTestQuestions[current].radio[1] && ' active'"/>
        {{ iqTestQuestions[current].radio[1] }}
      </div>
      <div class="radio" @click="answered[current] = iqTestQuestions[current].radio[2]">
        <div class="select" :class="answered[current] === iqTestQuestions[current].radio[2] && ' active'"/>
        {{ iqTestQuestions[current].radio[2] }}
      </div>
      <div class="radio" @click="answered[current] = iqTestQuestions[current].radio[3]">
        <div class="select" :class="answered[current] === iqTestQuestions[current].radio[3] && ' active'"/>
        {{ iqTestQuestions[current].radio[3] }}
      </div>
      <div class="radio" @click="answered[current] = iqTestQuestions[current].radio[4]">
        <div class="select" :class="answered[current] === iqTestQuestions[current].radio[4] && ' active'"/>
        {{ iqTestQuestions[current].radio[4] }}
      </div>
      <div class="radio" @click="answered[current] = iqTestQuestions[current].radio[5]">
        <div class="select" :class="answered[current] === iqTestQuestions[current].radio[5] && ' active'"/>
        {{ iqTestQuestions[current].radio[5] }}
      </div>
    </div>
    <div class="select_group" v-if="iqTestQuestions[current].selects">
      <div class="select"
           @click="answered[current] = 1"
           :class="answered[current] === iqTestQuestions[current].selects[1] && ' active'"
      >
        <div class="img-select" :class="`test-img-${current}-select-1`"/>
      </div>
      <div class="select"
           @click="answered[current] = 2"
           :class="answered[current] === iqTestQuestions[current].selects[2] && ' active'"
      >
        <div class="img-select" :class="`test-img-${current}-select-2`"/>
      </div>
      <div class="select"
           @click="answered[current] = 3"
           :class="answered[current] === iqTestQuestions[current].selects[3] && ' active'"
      >
        <div class="img-select" :class="`test-img-${current}-select-3`"/>
      </div>
      <div class="select"
           @click="answered[current] = 4"
           :class="answered[current] === iqTestQuestions[current].selects[4] && ' active'"
      >
        <div class="img-select" :class="`test-img-${current}-select-4`"/>
      </div>
      <div class="select"
           @click="answered[current] = 5"
           :class="answered[current] === iqTestQuestions[current].selects[5] && ' active'"
      >
        <div class="img-select" :class="`test-img-${current}-select-5`"/>
      </div>
      <div class="select"
           @click="answered[current] = 6"
           :class="answered[current] === iqTestQuestions[current].selects[6] && ' active'"
           v-if="iqTestQuestions[current].selects[6]"
      >
        <div class="img-select" :class="`test-img-${current}-select-6`"/>
      </div>
    </div>
    <div class="buttons">
      <button class="prev" @click="prevAnswer"><span class="arrow">&#8592;</span>Предудыщий вопрос</button>
      <button class="prev" @click="nextAnswer"><span class="arrow">&#8594;</span>Ответить</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>

@for $i from 1 through 40 {
  .test-img-#{$i} {
    background-image: url("../../img/iq-test/iq-test-question-#{$i}.png");
  }

  @for $j from 1 through 6 {
    .test-img-#{$i}-select-#{$j} {
      background-image: url("../../img/iq-test/select-#{$i}/iq-test-question-#{$i}-select_#{$j}.png");
    }
  }
}

.select_group {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.2em;
  margin-bottom: 1em;

  .select {
    position: relative;
    cursor: pointer;
    border-radius: 10px;
    border: 1px solid #ccc;
    padding-top: 15%;
    min-height: 6em;
    min-width: 6em;
    width: 15%;
    box-sizing: border-box;

    &.active {
      border: 1px solid #8F47FF;
    }

    > .img-select {
      position: absolute;
      bottom: 0;
      background-size: auto;
      background-position: center center;
      height: 100%;
      width: 100%;
    }
  }
}


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


.inputs_group {
  display: flex;
  margin: 0 0 1.5em;
  flex-wrap: wrap;
  gap: 1em;
}

.iq-input {
  margin-top: 0.2em;
  padding: 0.5em 1em;
  border-radius: 10px;
  border: 1px solid #E8E8E8;
}

.img {
  padding-top: 40%;
  width: 100%;
  background-size: contain;
  background-position: center center;
}

.description {
  margin: -1em 0 1em;
}

.radio_group {
  display: flex;
  flex-direction: column;
  margin: -1.5em 0 1em;

  .radio {
    display: flex;
    align-items: center;
    gap: .5em;
    cursor: pointer;

    .select {
      height: 1.2em;
      width: 1.2em;
      border: 1px solid #B9BBC1;
      background-color: #F8F8F8;
      border-radius: 100%;
      display: flex;
      justify-content: center;
      align-items: center;

      &.active {

        &:before {
          content: "";
          height: 0.6em;
          width: 0.6em;
          border-radius: 100%;
          background-color: #8F47FF;
        }
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

  border-radius: 22px;
  box-sizing: border-box;

  .text-area {
    resize: none;
    border: 1px solid #E6E6E6;
    background-color: #FFFFFF;
    padding: 12px 20px;
    box-sizing: border-box;
    font-size: 14px;
    font-weight: 400;
    line-height: 22.4px;
    text-align: left;
    color: #122130;
    border-radius: 10px;
    min-height: 242px;
    margin-bottom: 1em;
  }

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

  .buttons {
    display: flex;
    gap: 1em;
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
