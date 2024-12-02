<script setup>
import {reactive, toRefs, watch, ref} from 'vue';
import {useRoute} from 'vue-router';
import axios from "axios";

import Preview from "../components/Test/Preview.vue";
import TestForm from "../components/Test/TestForm.vue";
import Passed from "../components/Test/Passed.vue";

const testStatus = ref(0);
const pending = ref(false);
const status = ref('');
const candidate = reactive({
  name: '',
});



const route = useRoute();

const getTestInfo = async () => {
  try {
    const test = await axios.post(`/api/tests/${route.params.link}`, {
      name: 'oxford'
    })


    if (test.data.ended) return testStatus.value = 2;

    if (test.data.started) testStatus.value = 1;

  } catch (e) {
    console.log(e)
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
  <Preview v-if="!testStatus" @startTest="startTest"/>
  <TestForm v-if="testStatus === 1" @endTest="endTest" :pending="pending"/>
  <Passed v-if="testStatus === 2"/>
</template>

<style lang="scss" scoped>

</style>