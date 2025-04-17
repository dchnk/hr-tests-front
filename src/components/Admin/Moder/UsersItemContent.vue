<script setup>
import {computed, reactive, ref} from "vue";
import Preloader from "../../ui/Preloader.vue";
import axios from "axios";

const {user, status, opened} = defineProps(['user', 'status', 'opened']);

const isEdit = ref(false);
const pending = ref(false);
const invalid = ref(false);

const inputValues = reactive({
  name: user.name,
  email: user.email,
  phone: user.phone,
})

const inputErrors = reactive({
  name: '',
  email: '',
  phone: '',
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
  }
}

function clickEdit() {
  isEdit.value = !isEdit.value;
}

const updateUserInfo = async () => {

  if (user.name === inputValues.name && user.email === inputValues.email && user.phone === inputValues.phone) {
    return isEdit.value = false;
  }

  checkForm(true);
  if (invalid.value) return;

  pending.value = true;

  try {
    const res = await axios.patch(`/api/users/update/${user.user_id}`, {
      name: inputValues.name,
      // email: newValues.email,
      phone: inputValues.phone,
    })

    if (res.status === 200) {
      isEdit.value = false;
    }

    user.name = inputValues.name;
    user.phone = inputValues.phone;

    pending.value = false;
  } catch (err) {
    console.error('Ошибка:', err);
    pending.value = false;
  }
};

const increaseUserBalance = async (balance) => {
  pending.value = true;

  try {
    await axios.post(`/api/users/balance/${user.user_id}`, {
      balance: balance,
    })

    user.balance += balance;

    pending.value = false;
  } catch (err) {
    console.error('Ошибка:', err);
    pending.value = false;
  }
};

</script>

<template>
  <form class="users__item-content" @submit.prevent="updateUserInfo" novalidate>
    <div class="pending" v-if="pending">
      <Preloader/>
    </div>
    <div class="heading">Профиль пользователя</div>
    <div class="container">
      <div class="inputs">
        <div class="input__container">
          <div class="input__container">
            <div class="input__name">E-mail</div>
            <input class="input" type="text" v-model="inputValues.email" :disabled="true"
                   @blur="validate('email')" @input="validate('email')">
            <div class="error" v-show="inputErrors.email">{{ inputErrors.email }}</div>
          </div>
          <div class="input__name">Имя</div>
          <input class="input" type="text" v-model="inputValues.name" :disabled="!isEdit"
                 @blur="validate('name')" @input="validate('name')">
          <div class="error" v-show="inputErrors.name">{{ inputErrors.name }}</div>
        </div>
        <div class="input__container">
          <div class="input__name">Phone</div>
          <input class="input" type="text"  v-model="inputValues.phone" :disabled="!isEdit"
                 @blur="validate('phone')" @input="handleInputPhone">
          <div class="error" v-show="inputErrors.phone">{{ inputErrors.phone }}</div>
        </div>
        <div class="item">
          <div class="name">Статус:</div>
          <div class="value status">
            <div class="icon">
              <svg v-if="user.activated" xmlns="http://www.w3.org/2000/svg" width="12" height="9" viewBox="0 0 12 9"
                   fill="none">
                <path
                  d="M11.7212 0.278745C11.3499 -0.093032 10.747 -0.0927976 10.3752 0.278745L4.31744 6.33674L1.62503 3.64435C1.25325 3.27257 0.650609 3.27257 0.278832 3.64435C-0.0929441 4.01613 -0.0929441 4.61877 0.278832 4.99055L3.6442 8.35592C3.82998 8.54169 4.07357 8.63481 4.31719 8.63481C4.5608 8.63481 4.80463 8.54193 4.9904 8.35592L11.7212 1.62492C12.0929 1.2534 12.0929 0.650498 11.7212 0.278745Z"
                  fill="#8F47FF"/>
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path
                  d="M6 3.08333V6L7.45833 6.875M11.25 6C11.25 8.89949 8.89949 11.25 6 11.25C3.1005 11.25 0.75 8.89949 0.75 6C0.75 3.1005 3.1005 0.75 6 0.75C8.89949 0.75 11.25 3.1005 11.25 6Z"
                  stroke="#8F47FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            {{ status }}
          </div>
        </div>
      </div>
      <div class="balance">
        <div class="item">
          <div class="name">Баланс:</div>
          <div class="value">
            {{ user.balance }}
          </div>
        </div>
        <div class="edit increase" @click="() => increaseUserBalance(10)">
          Добавить 10
        </div>
        <div class="edit increase" @click="() => increaseUserBalance(50)">
          Добавить 50
        </div>
        <div class="edit increase" @click="() => increaseUserBalance(150)">
          Добавить 150
        </div>
        <div class="edit increase" @click="() => increaseUserBalance(500)">
          Добавить 500
        </div>

        <div class="edit" @click="clickEdit" v-if="!isEdit">
          Редактировать профиль
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M9.33317 2.66665L11.2188 4.55227M1 12.9998L1.03163 12.7784C1.14357 11.9948 1.19954 11.603 1.32686 11.2372C1.43983 10.9126 1.59416 10.604 1.78604 10.3189C2.00228 9.99754 2.28213 9.71769 2.84183 9.15799L10.6072 1.39266C11.1279 0.871962 11.9721 0.871961 12.4928 1.39266C13.0135 1.91336 13.0135 2.75758 12.4928 3.27828L4.58496 11.1861C4.0772 11.6939 3.82331 11.9477 3.53413 12.1496C3.27745 12.3289 3.00062 12.4773 2.70932 12.592C2.38114 12.7211 2.02917 12.7922 1.32529 12.9342L1 12.9998Z" stroke="#8F47FF" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <button class="edit" type="submit" v-if="isEdit">
          Сохранить изменения
        </button>
      </div>
    </div>

  </form>
</template>

<style lang="scss" scoped>
.users__item-content {
  position: relative;
  padding: 44px 24px 44px;
  border-radius: 10px;
  background-color: #F4F5F7;
  margin-bottom: 8px;

  @media screen and (max-width: 1000px) {
    padding: 49px 24px 44px;
  }

  @media screen and (max-width: 750px) {
    padding: 26px 12px 36px;
  }

  .pending {
    position: absolute;
    z-index: 3;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #000000;
    border-radius: inherit;
    opacity: .8;
  }

  .heading {
    font-family: Manrope;
    font-size: 18px;
    font-weight: 700;
    line-height: 21.6px;
    text-align: left;
    margin-bottom: 24px;

    @media screen and (max-width: 1000px) {
      margin-bottom: 18px;
    }

    @media screen and (max-width: 750px) {
      font-size: 16px;
      line-height: 19.2px;
    }

  }

  .container {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;

    .inputs {
      display: flex;
      flex-direction: column;
      gap: 20px;
      flex-grow: 1;
      width: 100%;
      max-width: 332px;

      @media screen and (max-width: 750px) {
        gap: 16px;
        max-width: 327px;
      }

      .input__container {
        display: flex;
        flex-direction: column;


        .input__name {
          font-size: 14px;
          font-weight: 400;
          line-height: 22.4px;
          color: #686B74;
          margin-bottom: 6px;
        }

        .input {
          border: 1px solid #E6E6E6;
          padding: 12px 20px;
          background-color: #FFFFFF;
          box-sizing: border-box;
          font-size: 14px;
          font-weight: 400;
          line-height: 22.4px;
          text-align: left;
          color: #122130;
          border-radius: 10px;

          &:disabled {
            background-color: transparent;
          }
        }

        .error {
          font-size: 12px;
          color: #D01408;
          text-align: start;
        }

      }

      .item {
        display: flex;
        width: 100%;
        margin-bottom: 12px;
        align-items: center;

        .name {
          font-size: 14px;
          font-weight: 400;
          line-height: 22.4px;
          color: #686B74;
          max-width: 120px;
          width: 100%;
          margin-right: 5px;
        }

        .value {
          font-size: 14px;
          font-weight: 400;
          line-height: 19.6px;
          color: #122130;
          display: flex;
          align-items: center;
          width: 200px;

          .link {
            width: 100px;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .icon {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 32px;
            min-width: 32px;
            border-radius: 4px;
            background-color: #FFFFFF;
            margin-left: 8px;
            cursor: pointer;


            //svg {
            //  height: 10px;
            //  width: 10px;
            //}
          }

          &.status {
            display: flex;
            align-items: center;
            min-width: 20px;
            height: 20px;

            .icon {
              display: flex;
              justify-content: center;
              align-items: center;
              height: 20px;
              min-width: 20px;
              border-radius: 4px;
              background-color: #FFFFFF;
              margin-left: 0;
              margin-right: 8px;
              cursor: default;
            }
          }
        }
      }
    }

    .balance {
      display: flex;
      flex-direction: column;
      max-width: 332px;
      width: 100%;
      flex-grow: 1;

      @media screen and (max-width: 750px) {
        max-width: 327px;
      }

      .name {
        font-size: 14px;
        font-weight: 400;
        line-height: 22.4px;
        color: #686B74;
        margin-bottom: 6px;
      }

      .textarea {
        border: 1px solid #E6E6E6;
        background-color: #FFFFFF;
        padding: 12px 20px;
        box-sizing: border-box;
        font-size: 14px;
        font-weight: 400;
        line-height: 22.4px;
        text-align: left;
        color: #122130;
        border-radius: 10px;
        min-height: 242px;

        &:disabled {
          background-color: transparent;
        }
      }

      .edit {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 4px;
        margin-top: 12px;
        font-size: 14px;
        font-weight: 700;
        line-height: 16.8px;
        text-align: center;
        max-width: 233px;
        padding: 13.5px 0;
        color: #8F47FF;
        background-color: #EBE1FC;
        border-radius: 10px;
        cursor: pointer;

        @media screen and (max-width: 750px) {
          max-width: 100%;
        }

      }
    }

    .other {
      max-width: 332px;
      width: 100%;
      flex-grow: 1;


      .edit {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 4px;
        margin-top: 12px;
        font-size: 14px;
        font-weight: 700;
        line-height: 16.8px;
        text-align: center;
        max-width: 233px;
        padding: 13.5px 0;
        color: #8F47FF;
        background-color: #EBE1FC;
        border-radius: 10px;
        cursor: pointer;

        @media screen and (max-width: 750px) {
          max-width: 100%;
        }

      }

    }

  }

}
</style>