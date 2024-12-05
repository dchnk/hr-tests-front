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

const handleInputPhone = () => {
  inputValues.phone = inputValues.phone.replace(/\D/g, '');
};

const formatPhone = (phone) => {
  const digits = phone.replace(/\D/g, '');

  if (digits.length === 10) {
    return `+7 (${digits.slice(0, 3)}) ${digits.slice(3, 6)} ${digits.slice(6, 8)}-${digits.slice(8)}`;
  } else if (digits.length === 11 && digits.startsWith('7')) {
    return `+7 (${digits.slice(1, 4)}) ${digits.slice(4, 7)} ${digits.slice(7, 9)}-${digits.slice(9)}`;
  } else if (digits.length === 11 && digits.startsWith('8')) {
    return `+7 (${digits.slice(1, 4)}) ${digits.slice(4, 7)} ${digits.slice(7, 9)}-${digits.slice(9)}`;
  } else {
    return phone; // Возвращаем оригинальный номер, если он не подходит ни под один стандарт
  }
};

const validate = (inputName) => {
  switch (inputName) {
    case'name':
      if (!inputValues.name) {
        inputErrors.name = 'Обязательно для заполнения';
      } else {
        inputErrors.name = '';
        checkForm();
      }
      break;

    case'email':
      if (inputErrors.conflictError) validate('conflictError');

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

    case'phone':
      const phonePattern = /^(?:\+7|8|7)\s*\(?\d{3}\)?\s*\d{3}[-\s]?\d{2}[-\s]?\d{2}$/;

      if (!inputValues.phone) {
        inputErrors.phone = 'Обязательно для заполнения';
      } else if (!phonePattern.test(inputValues.phone)) {
        inputErrors.phone = 'Телефон должен начинаться с "7" или "8" и состоять из 11 цифр.';
      } else {
        inputErrors.phone = '';
        inputValues.phone = formatPhone(inputValues.phone);
        checkForm();
      }
      break;

    case'conflictError':
      if (inputValues.email === inputErrors.conflictEmail) {
        inputErrors.conflictError = 'Пользователь с таким email уже создан.'
      } else {
        inputErrors.conflictEmail = '';
        inputErrors.conflictError = '';
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

    const createUser = await axios.post('/api/signup', {
      email: inputValues.email,
      password: inputValues.password,
      name: inputValues.name,
      phone: inputValues.phone,
    })

    let loginUser;
    if (createUser.status === 201) {
      loginUser = await axios.post('/api/signin', {
        email: inputValues.email,
        password: inputValues.password,
      })
    }

    window.location.replace('/admin')

  } catch (e) {
    console.log(e)
    if (e.status === 409) {
      inputErrors.conflictError = 'Пользователь с таким email уже создан.';
      inputErrors.conflictEmail = inputValues.email;
      invalid.value = true;
    };
  }

  pending.value = false;
}

</script>

<template>
  <section class="sign-up">
    <div class="heading">
      Зарегистрироваться
    </div>
    <form class="form" @submit.prevent="clickSubmit" novalidate>
      <div class="input-container">
        <div class="content">
          <div class="name">Ваше имя / Название организации</div>
        </div>
        <input class="input" @blur="validate('name')" @input="validate('name')" type="text" id="name" minlength="1"
               maxlength="100" size="100"
               v-model="inputValues.name">
        <div class="error" v-show="inputErrors.name">{{ inputErrors.name }}</div>
      </div>
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
          <div class="name">Номер телефона</div>
        </div>
        <input class="input" type="text" id="phone" minlength="5" maxlength="22" size="22" @blur="validate('phone')"
               @input="handleInputPhone"
               v-model="inputValues.phone" pattern="^[+-]?\d+$" required>
        <div class="error" v-show="inputErrors.phone">{{ inputErrors.phone }}</div>
      </div>
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
      <button v-if="!pending" type="submit" class="submit" :class="invalid && 'invalid'">
        <div>Зарегистрироваться</div>
      </button>
      <Preloader v-else/>
      <div class="error" v-show="inputErrors.conflictError">{{ inputErrors.conflictError }}</div>
      <div class="switch">
        Нажимая на кнопку "Зарегистрироваться" вы соглашаетесь с
        <router-link class="link" to="/offer">офертой.</router-link>
      </div>
      <div class="switch">
        Уже зарегистрированы?
        <router-link class="link" to="/signin">Войти</router-link>
      </div>
    </form>
  </section>
</template>

<style lang="scss" scoped>
.sign-up {
  background-color: #F8F8F8;
  box-sizing: border-box;
  padding: 20px;
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 50%;
  text-align: center;
  color: #122130;

  @media screen and (max-width: 820px) {
    width: 100%;
    max-height: max-content;
  }

  .heading {
    font-size: 28px;
    font-weight: 600;
    line-height: 33.6px;
    text-align: left;
    margin-bottom: 24px;


    @media screen and (max-width: 820px) {
      font-size: 20px;
      line-height: 24px;
      margin: 12px auto;
      align-self: flex-start;
    }
  }

  .form {
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
      margin-top: 20px;
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