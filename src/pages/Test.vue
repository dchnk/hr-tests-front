<script setup>
import {reactive, toRefs, watch, ref} from 'vue';
import {useRoute} from 'vue-router';
import axios from "axios";

import Passed from "../components/Test/Passed.vue";
import TestFailed from "../components/Test/TestFailed.vue";
import TestList from "../components/Test/TestList.vue";
import TestBase from "../components/Test/TestBase.vue";

const testStatus = ref('select');
const pending = ref(false);
const status = ref('');
let tests = ref(null);

let questions = ref(null);

const route = useRoute();

const getTestInfo = async () => {
  try {
    const test = await axios.post(`/api/tests/${route.params.link}`)

    if (test.data.test.some((acc) => acc.failed)) return testStatus.value = 'failed';
    if (test.data.test.every((acc) => acc.ended)) return testStatus.value = 2;

    tests.value = test.data;

    const createdTime = new Date(test.data.test.createdAt);
    const currentTime = new Date();
    const diffTime = (currentTime - createdTime) / (1000 * 60 * 60);

    if (diffTime > 72) {
      return testStatus.value = 'failed';
    }

    let obj = {};

    for (let index in test.data.questions.oxford) {
      let current = test.data.questions.oxford[index];

      obj[current.name.split('base-test-question-')[1]] = {
        text: current.text,
        id: current.name.split('base-test-question-')[1],
      }
    }

    questions.value = obj;

    if (test.data.test?.started) testStatus.value = 1;

  } catch (e) {
    console.log('123')
    testStatus.value = 'failed';
  };
}

getTestInfo();

const startTest = async (name) => {
  testStatus.value = name;

  if (tests.value.some(acc => acc.started)) return;

  try {
    axios.post(`/api/tests/start/${route.params.link}`, {
      name: name
    })

    testStatus.value = name;
  } catch (e) {
    console.log(e)
  };
}

const endTest = async (name, result) => {

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
  <TestList v-if="testStatus === 'select'" :tests="tests" @startTest="startTest" />
  <TestBase v-if="testStatus === 'oxford'" :test = />
  <Passed v-if="testStatus === 2"/>
</template>

<style lang="scss" scoped>

</style>