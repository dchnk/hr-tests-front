<script setup>
import {computed, reactive, ref} from "vue";
import axios from "axios";
import {questions} from "../../../vendor/oxford-test.js";

const {text} = defineProps(['text']);

const isEdit = ref(false);
const pending = ref(false);
const answers = reactive({
  yes: null,
  maybe: null,
  no: null,
})

const question = text.name.split('base-test-question-')[1];

if (question) {
  answers.yes = questions[question].answers.yes;
  answers.maybe = questions[question].answers.maybe;
  answers.no = questions[question].answers.no;
}


const textInputs = reactive({
  description: text.description,
  text: text.text,
})

function clickEdit() {
  isEdit.value = !isEdit.value;
}

const updateTextInfo = async () => {
  if (pending.value) return;

  if (text.description === textInputs.description && text.text === textInputs.text) {
    return isEdit.value = false;
  }

  pending.value = true;

  try {
    const res = await axios.post(`/api/text/update/${text.id}`, {
      description: textInputs.description,
      text: textInputs.text,
    })

    if (res.status === 200) {
      isEdit.value = false;
    }

    text.description = textInputs.description;
    text.text = textInputs.text;

    pending.value = false;
  } catch (err) {
    console.error('Ошибка:', err);
    pending.value = false;
  }
};


</script>

<template>
  <div class="text__item">
    <div class="text_name">Имя: {{ text.name }}</div>
    <div class="answers" v-if="question">
      <div class="answer">Да: {{answers.yes}}</div>
      <div class="answer">Может быть: {{answers.maybe}}</div>
      <div class="answer">Нет: {{answers.no}}</div>
    </div>
    <div class="container">
      <textarea class="area" v-model="textInputs.description" :disabled="!isEdit"/>
      <textarea class="area" v-model="textInputs.text" :disabled="!isEdit"/>
    </div>


    <div class="edit" @click="clickEdit" v-if="!isEdit">
      Редактировать текст
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M9.33317 2.66665L11.2188 4.55227M1 12.9998L1.03163 12.7784C1.14357 11.9948 1.19954 11.603 1.32686 11.2372C1.43983 10.9126 1.59416 10.604 1.78604 10.3189C2.00228 9.99754 2.28213 9.71769 2.84183 9.15799L10.6072 1.39266C11.1279 0.871962 11.9721 0.871961 12.4928 1.39266C13.0135 1.91336 13.0135 2.75758 12.4928 3.27828L4.58496 11.1861C4.0772 11.6939 3.82331 11.9477 3.53413 12.1496C3.27745 12.3289 3.00062 12.4773 2.70932 12.592C2.38114 12.7211 2.02917 12.7922 1.32529 12.9342L1 12.9998Z" stroke="#8F47FF" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
    <button class="edit" type="submit" v-if="isEdit" @click="updateTextInfo">
      Сохранить изменения
    </button>
  </div>
</template>

<style lang="scss" scoped>
  .text__item {
    display: flex;
    flex-direction: column;
    margin-bottom: 1em;
  }

  .container {
    display: flex;
    margin: 1em 0;
    gap: 1em;
  }

  .edit {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    margin-top: 12px;
    font-size: 14px;
    font-weight: 700;
    line-height: 16.8px;
    text-align: center;
    max-width: 233px;
    padding: 13.5px 0;
    color: #8F47FF;
    background-color: #EBE1FC;
    border-radius: 10px;
    cursor: pointer;

    @media screen and (max-width: 750px) {
      max-width: 100%;
    }

  }

  .area {
    resize: none;
    border: 1px solid #E6E6E6;
    background-color: #FFFFFF;
    max-width: 400px;
    width: 100%;
    padding: 12px 20px;
    box-sizing: border-box;
    font-size: 14px;
    font-weight: 400;
    line-height: 22.4px;
    text-align: left;
    color: #122130;
    border-radius: 10px;
    min-height: 242px;

    &::placeholder {
      color: #c0c0c0;
    }

    &:disabled {
      background-color: rgba(35, 28, 28, 0.2);
      color: rgba(0, 0, 0, 0.3);

      &::placeholder {
        color: #e7e7e7;
      }
    }
  }

</style>