<script setup>
import {reactive, toRefs, watch, ref} from 'vue';
import {useRoute} from 'vue-router';
import axios from "axios";

import Preview from "../components/Test/Preview.vue";
import TestForm from "../components/Test/TestForm.vue";
import Passed from "../components/Test/Passed.vue";
import TestFailed from "../components/Test/TestFailed.vue";

const testStatus = ref(0);
const pending = ref(false);
const status = ref('');
const candidate = reactive({
  name: '',
});

let questions = ref(null);

const route = useRoute();

const getTestInfo = async () => {
  try {
    const test = await axios.post(`/api/tests/${route.params.link}`, {
      name: 'oxford'
    })

    if (test.data.test.failed) return testStatus.value = 'failed';
    if (test.data.test.ended) return testStatus.value = 2;

    const createdTime = new Date(test.data.test.createdAt);
    const currentTime = new Date();
    const diffTime = (currentTime - createdTime) / (1000 * 60 * 60);

    if (diffTime > 72) {
      return testStatus.value = 'failed';
    }

    let obj = {};

    for (let index in test.data.questions) {
      let current = test.data.questions[index];

      obj[current.name.split('base-test-question-')[1]] = {
        text: current.text,
        id: current.name.split('base-test-question-')[1],
      }
    }

    questions.value = obj;

    // console.log(questions)

    if (test.data.test?.started) testStatus.value = 1;



  } catch (e) {
    console.log('123')
    testStatus.value = 'failed';
  };
}

getTestInfo();

const startTest = async () => {
  testStatus.value = 1;

  try {
    axios.post(`/api/tests/start/${route.params.link}`, {
      name: 'oxford'
    })

    testStatus.value = 1;
  } catch (e) {
    console.log(e)
  };
}

const endTest = async (result) => {

  console.log(result)
  testStatus.value = 2;

  try {
    axios.post(`/api/tests/end/${route.params.link}`, {
      name: 'oxford',
      result: result
    })

    testStatus.value = 2;
  } catch (e) {
    console.log(e)
  };
}

</script>

<template>
  <TestFailed v-if="testStatus === 'failed'"/>
  <Preview v-if="!testStatus" @startTest="startTest"/>
  <TestForm v-if="testStatus === 1" @endTest="endTest" :pending="pending" :questions="questions"/>
  <Passed v-if="testStatus === 2"/>
</template>

<style lang="scss" scoped>

</style>