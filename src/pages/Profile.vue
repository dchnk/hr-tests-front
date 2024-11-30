<script setup>
import {computed, reactive, ref} from "vue";
import axios from "axios";

import Header from "../components/Header/Header.vue";

import {useUserStore} from "../stores/user.js";
import { storeToRefs } from 'pinia';
import Preloader from "../components/ui/Preloader.vue";

const userStore = useUserStore();
const {user, isAdmin} = storeToRefs(userStore);

const invalid = ref(false);
const pending = ref(false);
const status = ref('');

const inputValues = reactive({
  password: '',
  passwordRepeat: '',
})

const inputErrors = reactive({
  password: '',
  passwordRepeat: '',
})

const clearStatus = () => {
  status.value = '';
  inputValues.password = '';
  inputValues.passwordRepeat = '';
};

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
  switch (inputName) {

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

    case'passwordRepeat':
      if (!inputValues.passwordRepeat) {
        inputErrors.passwordRepeat = 'Обязательно для заполнения';
      } else if (inputValues.passwordRepeat !== inputValues.password) {
        inputErrors.passwordRepeat = 'Пароли не должны отличаются.';
      } else {
        inputErrors.passwordRepeat = '';
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

    pending.value = true;

    await axios.patch('/api/users/password', {
      password: inputValues.password,
    })

    status.value = "Пароль успешно изменен!";
  } catch (e) {
    console.log(e);
    status.value = "Произошла ошибка, попробуйте еще раз!";
  }

  pending.value = false;
}

</script>

<template>
  <Header :isAdmin="isAdmin"/>
  <main class="main">
    <router-link class="admin" to="/admin">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="9" viewBox="0 0 16 9" fill="none">
        <path d="M14.6641 4.66732H1.33073M1.33073 4.66732L4.66406 1.33398M1.33073 4.66732L4.66406 8.00065" stroke="#122130" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      На главную
    </router-link>
    <div class="heading">
      Изменение пароля
    </div>
    <form class="container" @submit.prevent="clickSubmit" novalidate>
      <div class="input-container">
        <div class="content">
          <div class="name">Пароль</div>
        </div>
        <input class="input" type="password" id="password" autocomplete="false" @blur="validate('password')"
               @input="validate('password')" v-model="inputValues.password">
        <div class="error" v-show="inputErrors.password">{{ inputErrors.password }}</div>
      </div>
      <div class="input-container">
        <div class="content">
          <div class="name">Повторите пароль</div>
        </div>
        <input class="input" type="password" id="passwordRepeat" autocomplete="false" @blur="validate('passwordRepeat')"
               @input="validate('passwordRepeat')" v-model="inputValues.passwordRepeat">
        <div class="error" v-show="inputErrors.passwordRepeat">{{ inputErrors.passwordRepeat }}</div>
      </div>
      <button type="submit" class="submit" :class="invalid && 'invalid'">
        <div>Изменить пароль</div>
      </button>
      <div class="loading" :class="(pending || status) && 'active'">
        <Preloader v-if="pending"/>
        <div class="status" v-if="status">
          <div class="text">{{ status }}</div>
          <div class="ok" @click="clearStatus">Продолжить</div>
        </div>
      </div>

      <div class="error" v-show="inputErrors.conflictError">{{ inputErrors.conflictError }}</div>
    </form>
  </main>
</template>

<style lang="scss" scoped>
.main {
  max-width: 1180px;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
  height: 100%;
  display: flex;
  flex-direction: column;

  .admin {
    margin-top: 2em;
    display: flex;
    color: #122130;
    cursor: pointer;
    align-items: center;
    max-width: max-content;
    padding: 13px 20px;
    background-color: #F4F5F7;
    border-radius: 10px;
    box-sizing: border-box;
    text-decoration: none;

    svg {
      margin-right: .5em;
    }
  }

  .heading {
    margin-top: 1em;
    margin-bottom: 1em;
    font-size: 18px;
    font-weight: 500;
    line-height: 28.8px;
    align-self: start;
  }

  .container {
    position: relative;
    padding: 40px;
    max-width: max-content;
    box-sizing: border-box;
    border-radius: 10px;
    background-color: #F4F5F7;
    display: flex;

    @media screen and (max-width: 1000px) {
      flex-direction: column;
      max-width: 100%;
      padding: 32px 16px;
    }

    .loading {
      display: flex;
      position: absolute;
      bottom: 0;
      top: 0;
      right: 0;
      left: 0;
      background-color: rgba(0, 0, 0, 0.65);
      visibility: hidden;
      opacity: 0;
      border-radius: inherit;
      transition: all .3s ease-in-out;

      .status {
        padding: 15px 30px;
        margin: auto;
        display: flex;
        justify-content: center;
        align-items: center;
        max-width: max-content;
        flex-direction: column;
        background-color: #FFFFFF;
        border-radius: inherit;


        .ok {
          margin-top: 1em;
          font-size: 14px;
          font-weight: 400;
          line-height: 22.4px;
          margin-bottom: 8px;
          color: #8F47FF;
          cursor: pointer;
          border-bottom: 1px solid #8F47FF;
        }
      }

      &.active {
        visibility: visible;
        opacity: 1;
      }
    }

    .input-container {
      display: flex;
      flex-direction: column;
      min-width: 280px;
      width: 100%;
      margin-right: 20px;

      @media screen and (max-width: 1200px) {
        margin-right: 16px;
      }

      @media screen and (max-width: 770px) {
        margin-right: 0;
        margin-buttom: 16px;
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
      display: block;
      margin-top: 30px;
      min-width: 280px;
      height: 52px;
      box-sizing: border-box;
      font-size: 14px;
      font-weight: 700;
      line-height: 16.8px;
      text-align: center;
      border: none;
      padding: 0 20px;
      border-radius: 10px;
      background-color: #8F47FF;
      color: #FFFFFF;

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
  }
}
</style>