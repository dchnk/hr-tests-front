<script setup>
import {reactive, toRefs, watch, ref} from 'vue';
import {useRoute} from 'vue-router';
import axios from "axios";

import Passed from "../components/Test/Passed.vue";
import TestFailed from "../components/Test/TestFailed.vue";
import TestList from "../components/Test/TestList.vue";
import TestFormBase from "../components/Test/TestFormBase.vue";
import TestFormQuestionnaire from "../components/Test/TestFormQuestionnaire.vue";
import TestIQ from "../components/Test/TestIQ.vue";

const pending = ref(false);
const status = ref('');
let questions = ref(null);

let tests = ref(null);
const testStatus = ref('select');

const route = useRoute();

const getTestInfo = async () => {
  try {
    const test = await axios.post(`/api/tests/${route.params.link}`)

    if (test.data.test.some((acc) => acc.failed)) return testStatus.value = 'failed';
    if (test.data.test.every((acc) => acc.ended)) return testStatus.value = 2;

    tests.value = test.data;

    for (let i in test.data.test) {
      if (test.data.test[i].started && !test.data.test[i].ended) {
        testStatus.value = test.data.test[i].name;
      }
    }

    const createdTime = new Date(test.data.test[0].createdAt);
    const currentTime = new Date();
    const diffTime = (currentTime - createdTime) / (1000 * 60 * 60);

    if (diffTime > 72) {
      return testStatus.value = 'failed';
    }

    let obj = {};

    for (let index in test.data.questions) {
      let current = test.data.questions[index];

      obj[index] = {}

      for (let i in current) {
        let question = current[i];

        if (index === 'oxford') {
          obj[index][question.name.split('base-test-question-')[1]] = {
            text: question.text,
            id: question.name.split('base-test-question-')[1],
          }
        }

        if (index === 'iq') {
          obj[index][question.name.split('iq-test-question-')[1]] = {
            text: question.text,
            description: question.description,
            id: question.name.split('iq-test-question-')[1],
          }
        }

        if (index === 'questionnaire') {
          obj[index][question.name.split('questionnaire-test-question-')[1]] = {
            text: question.text,
            id: question.name.split('questionnaire-test-question-')[1],
          }
        }
      }
    }

    questions.value = obj;

    console.log(obj)

    // if (test.data.test?.started) testStatus.value = 1;

  } catch (e) {
    console.log(e)
    testStatus.value = 'failed';
  }
  ;
}

getTestInfo();

const startTest = async (name) => {
  if (tests.value.test.find((arg) => arg.name === name).ended) return;

  testStatus.value = name;

  try {
    axios.post(`/api/tests/start/${route.params.link}`, {
      name: name
    })

    testStatus.value = name;
  } catch (e) {
    console.log(e)
  }
  ;
}

const endTest = async (name, result) => {

  try {
    axios.post(`/api/tests/end/${route.params.link}`, {
      name: name,
      result: result
    })

    tests.value.test.find((arg) => arg.name === name).ended = true;

    if (tests.value.test.every((arg) => arg.ended)) {

      return testStatus.value = 2;
    }

    testStatus.value = 'select';

    ;
  } catch (e) {
    console.log(e)
  }
  ;
}

</script>

<template>
  <TestFailed v-if="testStatus === 'failed'"/>
  <TestList v-if="testStatus === 'select' && tests" :tests="tests" :testStatus="testStatus" @startTest="startTest"/>
  <TestFormBase v-if="testStatus === 'oxford'" @endTest="endTest" :pending="pending" :questions="questions.oxford"/>
  <TestIQ v-if="testStatus === 'iq'" @endTest="endTest" :pending="pending" :questions="questions.iq"/>
  <TestFormQuestionnaire v-if="testStatus === 'questionnaire'" @endTest="endTest" :pending="pending"
                         :questions="questions.questionnaire"/>
  <Passed v-if="testStatus === 2"/>
</template>

<style lang="scss" scoped>

</style>