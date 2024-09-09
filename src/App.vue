<script setup>
import TestForm from './components/TestForm.vue';

</script>

<template>
  <div class="page">
    <TestForm />
  </div>
</template>

<style>
@import url("./vendor/normalize.css");
@import url("./vendor/fonts.css");

.page {
  font-family: 'Inter', 'Comfortaa', Arial, sans-serif;
  font-weight: normal;
  text-rendering: optimizeLegibility;
  -webkit-text-size-adjust: 100%;
  -ms-text-size-adjust: 100%;
  -moz-text-size-adjust: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  justify-content: space-between;
  align-items: center
}
</style>
