<script setup>
import {reactive, ref} from "vue";
import Preloader from "../ui/Preloader.vue";
import axios from "axios";

const invalid = ref(false);
const pending = ref(false);

const inputValues = reactive({
  name: '',
  email: '',
  phone: '',
  password: '',
  passwordRepeat: '',
})

const inputErrors = reactive({
  name: '',
  email: '',
  phone: '',
  password: '',
  passwordRepeat: '',
  conflictError: '',
  conflictEmail: '',
})

const checkForm = (submit) => {
  let currentFlag = false;

  for (let error in inputErrors) {
    if (submit) {
      validate(error);
    }

    if (inputErrors[error]) currentFlag = true;
  }

  invalid.value = currentFlag;
}

const validate = (inputName) => {
  if (inputErrors.conflictError) inputErrors.conflictError = '';

  switch (inputName) {
    case'email':
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!inputValues.email) {
        inputErrors.email = 'Обязательно для заполнения';
      } else if (!emailPattern.test(inputValues.email)) {
        inputErrors.email = 'Введите корректный email';
      } else {
        inputErrors.email = '';
        checkForm();
      }
      break;

    case'password':
      const cyrillicPattern = /.[а-яА-ЯёЁ]./;

      if (!inputValues.password) {
        inputErrors.password = 'Обязательно для заполнения';
      } else if (cyrillicPattern.test(inputValues.password)) {
        inputErrors.password = 'Пароль может содержать только буквы латинского алфавита, спецсимволы и цифры.';
      } else if (inputValues.password.length < 8) {
        inputErrors.password = 'Слишком короткий. Минимальная длина пароля 8 символов.';
      } else {
        inputErrors.password = '';
        checkForm();
      }
      break;
  }
}


const clickSubmit = async () => {
  if (invalid.value) return;

  try {
    checkForm(true);
    if (invalid.value) return;

    console.log('ехала')

    pending.value = true;

    const loginUser = await axios.post('/api/signin', {
      email: inputValues.email,
      password: inputValues.password,
    })

    window.location.replace('/admin')

    console.log(loginUser);

  } catch (e) {
    console.log(e)
    if (e.status === 401) {
      inputErrors.conflictError = 'Неверный email или пароль';
      invalid.value = true;
    };

    if (e.status === 400) {
      inputErrors.conflictError = 'Email некорректен';
      invalid.value = true;
    };
  }

  pending.value = false;
}
</script>

<template>
  <section class="sign-in">
    <div class="heading">
      Войти в панель управления
    </div>
    <form class="form" @submit.prevent="clickSubmit" novalidate>
      <div class="input-container">
        <div class="content">
          <div class="name">E-mail</div>
        </div>
        <input class="input" type="text" id="email" maxlength="50" size="50" @blur="validate('email')"
               @input="validate('email')" v-model="inputValues.email">
        <div class="error" v-show="inputErrors.email">{{ inputErrors.email }}</div>
      </div>
      <div class="input-container">
        <div class="content">
          <div class="name">Пароль</div>
          <div class="question">Забыли пароль?</div>
        </div>
        <input class="input" type="password" id="password" autocomplete="false" @blur="validate('password')"
               @input="validate('password')" v-model="inputValues.password">
        <div class="error" v-show="inputErrors.password">{{ inputErrors.password }}</div>
      </div>
      <button v-if="!pending" type="submit" class="submit" :class="invalid && 'invalid'">
        <div>Войти</div>
      </button>
      <Preloader v-else/>
      <div class="error" v-show="inputErrors.conflictError">{{ inputErrors.conflictError }}</div>
      <div class="switch">
        Нет аккаунта? <router-link class="link" to="/signup">Зарегистрироваться</router-link>
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
  min-height: 100vh;
  width: 50%;
  text-align: center;
  color: #122130;

  @media screen and (max-width: 820px) {
    width: 100%;
  }

  .heading {
    font-size: 28px;
    font-weight: 600;
    line-height: 33.6px;
    text-align: left;
    margin: 30% auto 24px;


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

      .error {
        font-size: 12px;
        color: #D01408;
        text-align: start;
      }
    }

    .submit {
      border: none;
      margin: 0 0 8px;
      padding: 15px 0;
      width: 100%;
      border-radius: 10px;
      background-color: #8F47FF;
      font-size: 18px;
      font-weight: 700;
      line-height: 21.6px;
      color: #FFFFFF;

      .loader {
        min-height: 22px;
        background-image: url("../../img/loader.png");
      }

      &.invalid {
        cursor: default;
        background-color: rgba(143, 71, 255, 0.3);
      }
    }

    .error {
      font-size: 12px;
      color: #D01408;
      text-align: center;
    }

    .switch {
      font-size: 14px;
      font-weight: 400;
      line-height: 22.4px;
      color: #5F5E5E;

      .link {
        text-decoration: none;
        color: #8F47FF;
        cursor: pointer;
        border-bottom: 1px solid #8F47FF;
      }
    }
  }
}

</style>