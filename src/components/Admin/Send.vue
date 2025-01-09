<script setup>
import {reactive, ref} from "vue";
import {storeToRefs} from "pinia";
import axios from "axios";
import {useUserStore} from "../../stores/user.js";
import {useDepartmentsStore} from "../../stores/departments.js";

import Preloader from "../ui/Preloader.vue";

const {vacancy} = defineProps(['vacancy']);

const userStore = useUserStore();
const {user} = storeToRefs(userStore);

const departmentsStore = useDepartmentsStore();

const invalid = ref(false);
const pending = ref(false);
const status = ref('');

const clearStatus = () => {
  status.value = '';
};

const inputValues = reactive({
  email: '',
})

const selectedTest = reactive({oxfordTest: ''});

const selectTest = (name) => {
  if (selectedTest[name]) return selectedTest[name] = '';

  selectedTest[name] = name;

  validate('selected');
}

const inputErrors = reactive({
  email: '',
  selected: '',
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
        invalid.value = true;
      } else if (!emailPattern.test(inputValues.email)) {
        inputErrors.email = 'Введите корректный email';
        invalid.value = true;
      } else {
        inputErrors.email = '';
        checkForm();
      }
      break;

    case'selected':
      for (let test in selectedTest) {
        if (!selectedTest[test]) {
          inputErrors.selected = 'Необходимо выбрать тест.';
          invalid.value = true;
        }
        else {
          inputErrors.selected = '';
          checkForm();
        }
        break;
      }
  }
}

const clickSubmit = async () => {
  if (invalid.value || pending.value) return;

  if (!user.value.balance) return status.value = 'Недостаточно тестов. Пополните баланс';

  try {
    checkForm(true);
    if (invalid.value) return;

    pending.value = true;

    const {data} = await axios.post('/api/candidates/create', {
      email: inputValues.email,
      tests: selectedTest,
      vacancy_id: vacancy.id
    })

    if (data) departmentsStore.addApplicant(data);
    status.value = 'Тест был успешно отправлен';
    user.value.balance--;

  } catch (e) {
    console.log(e)
    status.value = `Произошла ошибка. ${e}`;

    if (e.status === 400) {
      inputErrors.conflictError = 'Email некорректен';
      invalid.value = true;
    };
  }

  pending.value = false;
}
</script>

<template>
  <div class="send">
    <div class="heading">Отправить тест кандидату</div>
    <form class="form" @submit.prevent="clickSubmit">
      <div class="input-container">
        <input class="email" placeholder="Укажите e-mail соискателя" type="text" id="email" maxlength="50" size="50" @blur="validate('email')"
               @input="validate('email')" v-model="inputValues.email">
        <div class="error" v-show="inputErrors.email">{{ inputErrors.email }}</div>
      </div>
      <button class="btn" :class="invalid && 'invalid'" type="submit">Отправить
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
              d="M6.72521 9.27092L14.076 1.92279M6.93414 9.60136L8.60096 12.935C9.00376 13.7406 9.20516 14.1434 9.45888 14.2514C9.67907 14.3451 9.93077 14.3282 10.1364 14.2057C10.3733 14.0647 10.5188 13.6385 10.8099 12.7861L13.9593 3.56298C14.2129 2.82029 14.3397 2.44894 14.2529 2.20329C14.1774 1.98958 14.0093 1.82148 13.7956 1.74598C13.5499 1.65919 13.1786 1.78599 12.4359 2.03959L3.21273 5.18895C2.36037 5.48 1.93418 5.62553 1.7931 5.86246C1.67066 6.06808 1.6537 6.31977 1.74743 6.53996C1.85545 6.79368 2.25825 6.99508 3.06385 7.39788L6.39749 9.0647C6.53023 9.13107 6.5966 9.16426 6.65412 9.20859C6.70515 9.24793 6.75091 9.29369 6.79025 9.34472C6.83458 9.40224 6.86777 9.46861 6.93414 9.60136Z"
              stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </form>

    <div class="text">Выберите тесты для отправки</div>
    <div class="selects__container">
      <div class="list-container">
        <div class="list">
          <div class="select" :class="selectedTest.oxfordTest && 'selected'" @click="() => selectTest('oxfordTest')">Базовый тест</div>
        </div>
        <div class="error" v-show="inputErrors.selected">{{ inputErrors.selected }}</div>
      </div>

      <div class="wallet">
        <div class="img">
          <svg class="icon" width="20" height="18" viewBox="0 0 20 18" fill="none"
               xmlns="http://www.w3.org/2000/svg">
            <path
                d="M16 5V4.2C16 3.0799 16 2.51984 15.782 2.09202C15.5903 1.71569 15.2843 1.40973 14.908 1.21799C14.4802 1 13.9201 1 12.8 1H4.2C3.07989 1 2.51984 1 2.09202 1.21799C1.71569 1.40973 1.40973 1.71569 1.21799 2.09202C1 2.51984 1 3.0799 1 4.2V5M19 9H17C15.8954 9 15 9.89543 15 11C15 12.1046 15.8954 13 17 13H19M1 5V13.8C1 14.9201 1 15.4802 1.21799 15.908C1.40973 16.2843 1.71569 16.5903 2.09202 16.782C2.51984 17 3.07989 17 4.2 17H15.8C16.9201 17 17.4802 17 17.908 16.782C18.2843 16.5903 18.5903 16.2843 18.782 15.908C19 15.4802 19 14.9201 19 13.8V8.2C19 7.0799 19 6.51984 18.782 6.09202C18.5903 5.71569 18.2843 5.40973 17.908 5.21799C17.4802 5 16.9201 5 15.8 5H1Z"
                stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <router-link to="/balance" class="container" >
          <div class="number">{{ user?.balance }}</div>
          <div class="wallet__text">Баланс тестов</div>
        </router-link>
      </div>

    </div>
    <div class="loading" :class="(pending || status) && 'active'">
      <Preloader v-if="pending"/>
      <div class="status" v-if="status">
        <div class="text">{{ status }}</div>
        <div class="ok" @click="clearStatus">Продолжить</div>
      </div>
    </div>
  </div>

</template>

<style lang="scss" scoped>
.send {
  background-color: #F4F5F7;
  padding: 44px 24px;
  box-sizing: border-box;
  border-radius: 10px;
  margin-bottom: 44px;
  position: relative;

  @media screen and (max-width: 1000px) {
    margin-bottom: 49px;
  }

  @media screen and (max-width: 750px) {
    padding: 32px 12px 28px;
    margin-bottom: 26px;
  }

  .heading {
    font-size: 18px;
    font-weight: 700;
    line-height: 21.6px;
    color: #122130;
    margin-bottom: 20px;

    @media screen and (max-width: 750px) {
      font-size: 14px;
      font-weight: 700;
      line-height: 16.8px;
      text-align: center;
      margin-top: 16px;
      margin-bottom: 18px;
    }

  }

  .form {
    display: flex;
    margin-bottom: 24px;

    @media screen and (max-width: 750px) {
      flex-direction: column;
      margin-bottom: 18px;
    }

    .input-container {
      display: flex;
      flex-direction: column;
    }

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

      @media screen and (max-width: 750px) {
        flex-direction: column;
        margin-right: 0;
        margin-bottom: 8px;
      }

      &::placeholder {
        color: #B9BBC1;
      }


    }

    .error {
      font-size: 12px;
      color: #D01408;
      text-align: start;
    }

    .btn {
      height: 100%;
      font-size: 14px;
      font-weight: 700;
      line-height: 16.8px;
      text-align: center;
      color: #FFFFFF;
      background-color: #8F47FF;
      border-radius: 10px;
      padding: 16px 22px;
      display: flex;
      align-items: center;

      &.invalid {
        cursor: default;
        pointer-events: none;
        background-color: rgba(143, 71, 255, 0.3);
      }

      @media screen and (max-width: 750px) {
        justify-content: center;
      }

      svg {
        stroke: #FFFFFF;
        margin-left: 4px;
      }

      @media (hover: hover) {
        &:hover {
          color: #8F47FF;
          background-color: #EBE1FC;

          svg {
            stroke: #8F47FF;
          }
        }
      }
    }
  }

  .loading {
    display: flex;
    justify-content: center;
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

      min-height: 50%;
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

  .text {
    font-size: 14px;
    font-weight: 400;
    line-height: 22.4px;
    color: #686B74;
    margin-bottom: 12px;
  }

  .selects__container {
    display: flex;
    align-items: flex-start;

    @media screen and (max-width: 900px) {
      flex-direction: column;
    }

    .list {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;

      .select {
        font-size: 14px;
        font-weight: 700;
        line-height: 16.8px;
        padding: 13.5px 22px;
        text-align: center;
        border-radius: 10px;
        background-color: #FFFFFF;
        color: #8F47FF;
        cursor: pointer;

        &.selected {
          background-color: #8F47FF;
          color: #FFFFFF;
        }


        @media screen and (max-width: 900px) {
          font-size: 14px;
          line-height: 16.8px;
        }
      }

    }

    .wallet {
      display: flex;
      align-items: center;
      margin-left: 52px;

      @media screen and (max-width: 900px) {
        margin-left: 0;
        margin-top: 20px;
      }

      .img {
        position: relative;
        display: flex;
        min-width: 44px;
        height: 44px;
        margin-right: 12px;
        border-radius: 50%;
        background-color: #FFFFFF;



        .icon {
          margin: auto;
          stroke: #122130;
        }
      }

      .container {
        display: flex;
        flex-direction: column;
        text-decoration: none;

        .number {
          font-size: 19px;
          font-weight: 700;
          line-height: 24px;
          color: #122130;

          @media screen and (max-width: 750px) {
            font-size: 18px;
            line-height: 21px;
          }
        }

        .wallet__text {
          font-size: 14px;
          font-weight: 600;
          line-height: 19.6px;
          text-wrap: nowrap;
          color: #686B74;

          @media screen and (max-width: 750px) {
            font-size: 12px;
            line-height: 16.8px;
          }
        }
      }
    }
  }

  .error {
    margin-left: .2em;
    margin-top: .5em;
    font-size: 12px;
    color: #D01408;
    text-align: start;
  }


}
</style>