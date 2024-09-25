<script setup>
import {test} from '../../constants/test-list.js';
import {reactive, toRefs, watch, ref} from 'vue';

// let answered = ref({});
let answered = reactive({});
const result = reactive({
  a: 0,
  b: 0,
  c: 0,
  d: 0,
  e: 0,
  f: 0,
  g: 0,
  h: 0,
  i: 0,
  j: 0,
})

const resultRefs = toRefs(result);

watch([], (newValue, oldValue) => {
  console.log(newValue, oldValue)
},)

watch(answered, (newValue, oldValue) => {
  console.log(newValue, oldValue)
},)


function clickInputRadio(item, index, answer) {

  // if (answered[index]) {
  //   resultRefs[item.type.toLowerCase()].value += (answered[index].value * -1);
  //
  //   answered[index].value = item.answer[answer];
  //   resultRefs[item.type.toLowerCase()].value += item.answer[answer];
  //   return;
  // }
  //
  // answered[`${index}`] = {value: item.answer[answer]};
  // resultRefs[item.type.toLowerCase()].value += item.answer[answer];

  // if (answered.value[index]) {
  //   console.log('old', answered.value[index].value)
  //   resultRefs[item.type.toLowerCase()].value -= answered.value[index].value;
  //
  //   answered.value[index].value = item.answer[answer];
  // }
  //
  // answered.value = {...answered.value, [index]: {value: item.answer[answer]}};
  // resultRefs[item.type.toLowerCase()].value += answered.value[index].value;
  //
  // console.log('new', answered.value[index].value);

  if (answered.value[index]) {
    // resultRefs[item.type.toLowerCase()].value -= answered.value[index].value;

    answered.value[index].value = item.answer[answer];
  }

  answered.value = {...answered.value, [index]: {value: item.answer[answer]}};
  // resultRefs[item.type.toLowerCase()].value += answered.value[index].value;
}

</script>

<template>
  <div class="container">
    <div class="content">

      <h1 class="heading">Тест</h1>
      <p class="description">Ответь на все вопросы, чтобы получить результат.</p>

      <div class="result">
        <div class="list">
          <div class="item" v-for="(item, index) in test.types">
            <div class="index">{{ index }} {{ item.name }}: {{ resultRefs[index] }}</div>
          </div>
        </div>
      </div>

      <div class="form">
        <div class="question" :class="answered[index] && 'answered'" v-for="(item, index) in test.list">
          <div class="text">{{ item.question }}</div>

          <form>

            <div class="radio">
              <input class="input" type="radio" :id="index + 'yes'" :name="index"
                     @click="() => clickInputRadio(item, index, 'yes')"/>
              <label :for="index + 'yes'">Да</label>
            </div>

            <div class="radio">
              <input class="input" type="radio" :id="index + 'maybe'" :name="index"
                     @click="() => clickInputRadio(item, index, 'maybe')"/>
              <label :for="index + 'maybe'">Может быть</label>
            </div>

            <div class="radio">
              <input class="input" type="radio" :id="index + 'no'" :name="index"
                     @click="() => clickInputRadio(item, index, 'no')"/>
              <label :for="index + 'no'">Нет</label>
            </div>

          </form>
        </div>
      </div>

    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;

  .content {
    display: flex;
    flex-direction: column;
    padding: 1em;
    width: 90%;
    max-width: 40em;
    height: 95%;
    border: 1px solid #ebd5d5;
    box-shadow: 0 0 .5em #2e4158;
    border-radius: 1em;
    box-sizing: border-box;

    .heading {
      margin: 0;
    }

    .result {

      .list {
        display: flex;
        flex-wrap: wrap;

        .item {
          width: 50%;
        }
      }
    }

    .form {
      display: flex;
      padding: 1em;
      flex-direction: column;
      overflow-y: scroll;
      min-height: 30%;
      box-sizing: border-box;

      .question {
        max-width: 90%;
        padding: 1em;
        border: 1px solid #ebd5d5;
        box-shadow: 0 0 .5em #2e4158;
        border-radius: 1em;
        margin-bottom: 1em;

        &.answered {
          box-shadow: 0 0 .5em #0fd423;
        }

        &:last-child {
          margin-bottom: 0;
        }
      }

      .radio {
        margin: .5em;

        .input {
          margin-right: 1em;
        }
      }
    }
  }
}
</style>
