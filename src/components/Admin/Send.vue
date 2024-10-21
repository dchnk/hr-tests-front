<script setup>

</script>

<template>
  <div class="send">
    <div class="heading">Отправить тест соискателю</div>
    <div class="form">
      <input type="email" class="email" placeholder="Укажите E-mail тестируемого">
      <button class="btn">Отправить тест
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M6.72521 9.27092L14.076 1.92279M6.93414 9.60136L8.60096 12.935C9.00376 13.7406 9.20516 14.1434 9.45888 14.2514C9.67907 14.3451 9.93077 14.3282 10.1364 14.2057C10.3733 14.0647 10.5188 13.6385 10.8099 12.7861L13.9593 3.56298C14.2129 2.82029 14.3397 2.44894 14.2529 2.20329C14.1774 1.98958 14.0093 1.82148 13.7956 1.74598C13.5499 1.65919 13.1786 1.78599 12.4359 2.03959L3.21273 5.18895C2.36037 5.48 1.93418 5.62553 1.7931 5.86246C1.67066 6.06808 1.6537 6.31977 1.74743 6.53996C1.85545 6.79368 2.25825 6.99508 3.06385 7.39788L6.39749 9.0647C6.53023 9.13107 6.5966 9.16426 6.65412 9.20859C6.70515 9.24793 6.75091 9.29369 6.79025 9.34472C6.83458 9.40224 6.86777 9.46861 6.93414 9.60136Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.send {
  background-color: #F4F5F7;
  padding: 44px 24px;
  box-sizing: border-box;
  border-radius: 10px;

  .heading {
    font-size: 18px;
    font-weight: 700;
    line-height: 21.6px;
    color: #122130;
    margin-bottom: 20px;
  }

  .form {
    display: flex;

    .email {
      font-size: 14px;
      font-weight: 400;
      line-height: 22.4px;
      text-align: left;
      color: #122130;
      padding: 12px 20px;
      background-color: #FFFFFF;
      border: 1px solid #F4F5F7;
      border-radius: 10px;
      min-width: 322px;
      margin-right: 8px;
      box-sizing: border-box;

      &::placeholder {
        color: #B9BBC1;
      }
    }

    .btn {
      font-size: 14px;
      font-weight: 700;
      line-height: 16.8px;
      text-align: center;
      color: #FFFFFF;
      background-color: #8F47FF;
      border-radius: 10px;
      padding: 13.5px 22px;
      display: flex;
      align-items: center;

      svg {
        margin-left: 4px;
      }
    }

  }
}
</style>