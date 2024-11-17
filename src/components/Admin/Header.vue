<script setup>
import Wallet from "./Wallet.vue";
import Profile from "./Profile.vue";
</script>

<template>
  <header class="header">
    <div class="container">
      <div class="logo"></div>
      <Wallet />
      <Profile />
    </div>
  </header>
</template>

<style lang="scss" scoped>

.header {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #122130;
  height: 78px;
  box-sizing: border-box;

  @media screen and (max-width: 770px) {
    height: 66px;
  }

  .container {
    display: flex;
    max-width: 1180px;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;

    @media screen and (max-width: 770px) {
      padding: 0 12px;
    }

    .logo {
      background-image: url("../../img/logo.png");
      height: 35px;
      width: 150px;
      background-repeat: no-repeat;
      background-position: center center;
      background-size: contain;

      @media screen and (max-width: 770px) {
        height: 30px;
        width: 130px;
      }
    }
  }


}

</style>