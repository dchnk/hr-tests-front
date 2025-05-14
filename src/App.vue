<template>
  <div class="page">
    <RouterView />
  </div>
</template>

<style lang="scss">
@import url("./vendor/normalize.css");
@import url("./vendor/fonts.css");

html {
  scroll-behavior: smooth;
}

.page {
  font-family: 'Manrope', Arial, sans-serif;
  font-weight: normal;
  text-rendering: optimizeLegibility;
  -webkit-text-size-adjust: 100%;
  -ms-text-size-adjust: 100%;
  -moz-text-size-adjust: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  align-items: center;
  //background-color: #F8F8F8;
  background-color: #FFFFFF;

  @media screen and (max-width: 820px) {
    background-color: #FFFFFF;
  }
}

.keep-together {
  break-inside: avoid;
  page-break-inside: avoid;
}
</style>
