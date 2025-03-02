<script setup>
import {reactive, toRefs, watch, ref} from 'vue';
import {useRoute} from 'vue-router';

import Preview from "./Preview.vue";
// import TestForm from "../components/Test/TestForm.vue";

const status = ref('');

let questions = ref(null);


</script>

<template>
  <Preview v-if="!testStatus" @startTest="startTest"/>
<!--  <TestForm v-if="testStatus === 1" @endTest="endTest" :pending="pending" :questions="questions"/>-->
</template>

<style lang="scss" scoped>

</style>