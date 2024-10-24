<script setup>

</script>

<template>
  <section class="sign-in">
    <div class="heading">
      Войти в панель управления
    </div>
    <form class="form">
      <div class="input-container">
        <div class="content">
          <div class="name">Логин или e-mail</div>
        </div>
        <input class="input" type="text" id="login">
      </div>
      <div class="input-container">
        <div class="content">
          <div class="name">Пароль</div>
          <div class="question">Забыли пароль?</div>
        </div>
        <input class="input" type="password" id="password">
      </div>
      <button type="submit" class="submit">
        Войти
      </button>
      <div class="switch">
        Нет аккаунта? <router-link class="link">Зарегистрироваться</router-link>
      </div>
    </form>

  </section>
</template>

<style lang="scss" scoped>
.sign-in {
  background-color: #F8F8F8;
  box-sizing: border-box;
  padding: 20px;
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 50%;
  text-align: center;
  color: #122130;

  @media screen and (max-width: 820px) {
    width: 100%;
    min-height: 100vh;
  }

  .heading {
    font-size: 28px;
    font-weight: 600;
    line-height: 33.6px;
    text-align: left;
    margin: auto;
    margin-top: 30%;
    margin-bottom: 24px;


    @media screen and (max-width: 820px) {
      font-size: 20px;
      line-height: 24px;
      margin-bottom: 12px;
      align-self: flex-start;
    }
  }

  .form  {
    display: flex;
    flex-direction: column;
    max-width: 400px;
    width: 100%;


    .input-container {
      display: flex;
      flex-direction: column;
      width: 100%;
      margin-bottom: 16px;

      &:last-of-type {
        margin-bottom: 20px;
      }

      .content {
        display: flex;
        justify-content: space-between;
        width: 100%;

        .name {
          font-size: 14px;
          font-weight: 400;
          line-height: 22.4px;
          text-align: left;
          margin-bottom: 8px;
          color: #5F5E5E;
        }

        .question {
          font-size: 14px;
          font-weight: 400;
          line-height: 22.4px;
          margin-bottom: 8px;
          color: #8F47FF;
          cursor: pointer;
          border-bottom: 1px solid #8F47FF;
        }
      }

      .input {
        height: 52px;
        margin: 0;
        padding: 0;
        border: 1px solid #E8E8E8;
        border-radius: 10px;
        font-size: 16px;
        font-weight: 400;
        line-height: 25.6px;
        padding: 0 20px;
        color: #122130;
      }
    }

    .submit {
      border: none;
      margin: 0 0 28px;
      padding: 15px 0;
      width: 100%;
      border-radius: 10px;
      background-color: #8F47FF;

      font-size: 18px;
      font-weight: 700;
      line-height: 21.6px;
      color: #FFFFFF;
    }

    .switch {
      font-size: 14px;
      font-weight: 400;
      line-height: 22.4px;
      color: #5F5E5E;

      .link {
        color: #8F47FF;
        cursor: pointer;
        border-bottom: 1px solid #8F47FF;
      }
    }
  }
}

</style>