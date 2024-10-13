<script setup>

</script>

<template>
  <div class="wallet">
    <div class="img" />
    <div class="container">
      <div class="number">398</div>
      <div class="text">Баланс тестов</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .wallet {
    display: flex;
    align-items: center;
    cursor: pointer;
    margin-right: 64px;
    margin-left: auto;

    @media screen and (max-width: 820px) {
      display: none;
    }

    .img {
      position: relative;
      display: flex;
      width: 32px;
      height: 32px;
      margin-right: 12px;
      border-radius: 50%;
      background-color: #FFFFFF;

      &:after {
        content: '';
        display: block;
        margin: auto;
        width: 18px;
        height: 16px;
        background-image: url("../../img/wallet.svg");
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center center;
      }
    }

    .container {
      display: flex;
      flex-direction: column;

      .number {
        font-size: 16px;
        font-weight: 700;
        line-height: 19.2px;
        color: #FFFFFF;
      }

      .text {
        font-size: 12px;
        font-weight: 600;
        line-height: 14.4px;
        color: #B9BBC1;
      }
    }

    &:hover {
      .number {
        color: #8F47FF;
      }
    }
  }
</style>