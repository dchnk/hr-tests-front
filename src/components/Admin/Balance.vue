<script setup>

</script>

<template>
  <div class="balance">
    <div class="wallet">
      <div class="img">
        <svg class="icon" width="20" height="18" viewBox="0 0 20 18" fill="none"
             xmlns="http://www.w3.org/2000/svg">
          <path
            d="M16 5V4.2C16 3.0799 16 2.51984 15.782 2.09202C15.5903 1.71569 15.2843 1.40973 14.908 1.21799C14.4802 1 13.9201 1 12.8 1H4.2C3.07989 1 2.51984 1 2.09202 1.21799C1.71569 1.40973 1.40973 1.71569 1.21799 2.09202C1 2.51984 1 3.0799 1 4.2V5M19 9H17C15.8954 9 15 9.89543 15 11C15 12.1046 15.8954 13 17 13H19M1 5V13.8C1 14.9201 1 15.4802 1.21799 15.908C1.40973 16.2843 1.71569 16.5903 2.09202 16.782C2.51984 17 3.07989 17 4.2 17H15.8C16.9201 17 17.4802 17 17.908 16.782C18.2843 16.5903 18.5903 16.2843 18.782 15.908C19 15.4802 19 14.9201 19 13.8V8.2C19 7.0799 19 6.51984 18.782 6.09202C18.5903 5.71569 18.2843 5.40973 17.908 5.21799C17.4802 5 16.9201 5 15.8 5H1Z"
            stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <div class="container">
        <div class="number">398</div>
        <div class="text">Баланс тестов</div>
      </div>
    </div>
    <button class="btn">
      Пополнить
    </button>
  </div>
</template>

<style lang="scss" scoped>
.balance {
  padding: 43px 32px;
  background-color: #F4F5F7;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-height: 138px;

  @media screen and (max-width: 820px) {
    padding: 24px 20px;
  }

  .wallet {
    display: flex;
    align-items: center;
    margin-right: 70px;
    max-width: 50%;

    @media screen and (max-width: 820px) {
      margin-right: 10px;
    }

    .img {
      position: relative;
      display: flex;
      min-width: 52px;
      height: 52px;
      margin-right: 12px;
      border-radius: 50%;
      background-color: #FFFFFF;

      @media screen and (max-width: 820px) {
        min-width: 44px;
        height: 44px;
      }


      .icon {
        margin: auto;
        stroke: #122130;
      }
    }

    .container {
      display: flex;
      flex-direction: column;

      .number {
        font-size: 26px;
        font-weight: 700;
        line-height: 31.2px;
        color: #122130;

        @media screen and (max-width: 820px) {
          font-size: 22px;
          line-height: 26.4px;
        }
      }

      .text {
        font-size: 14px;
        font-weight: 600;
        line-height: 19.6px;
        text-wrap: nowrap;
        color: #686B74;

        @media screen and (max-width: 820px) {
          font-size: 12px;
          line-height: 16.8px;
        }
      }
    }
  }

  .btn {
    height: 44px;
    max-width: 180px;
    width: 180px;
    margin: 0;
    padding: 0;
    border-radius: 10px;
    font-size: 14px;
    font-weight: 700;
    line-height: 16.8px;
    text-align: center;
    background-color: #EBE1FC;
    color: #8F47FF;
    border: none;
    cursor: pointer;

    &:hover {
      background-color: #8F47FF;
      color: #FFFFFF;
    }
  }
}
</style>