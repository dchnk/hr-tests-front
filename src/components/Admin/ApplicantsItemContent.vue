<script setup>
import {computed, ref, reactive} from "vue";
import axios from "axios";
import ApplicantsTests from "./ApplicantsTests.vue";
import Preloader from "../ui/Preloader.vue";

const {applicant, status, opened} = defineProps(['applicant', 'status', 'opened']);
const comment = 'Здесь вы можете отправлять тесты соискателям, отслеживать их статус выполнения и анализировать результаты в режиме реального времени. Сервис HR TESTS помогает вам принимать решения и оптимизировать процесс найма.'

const isEdit = ref(false);
const invalid = ref(false);
const pending = ref(false);

const newDob = computed(() => {
  if (applicant.dob) {
    const date = new Date(applicant.dob);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  }
})

const inputValues = reactive({
  name: applicant.name || '',
  email: applicant.email || '',
  phone: applicant.phone || '',
  sex: applicant.sex || '',
  dob: applicant.dob || null,
  comment: applicant.comment || '',
})

const inputErrors = reactive({
  email: '',
  phone: '',
})

function clickEdit() {
  isEdit.value = !isEdit.value;
}

const copyTextToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    console.log('Текст успешно скопирован в буфер обмена!');
  } catch (err) {
    console.error('Ошибка:', err);
  }
};

const closeEdit = () => {
  isEdit.value = false;
  inputValues.name =  applicant.name || '';
  inputValues.email =  applicant.email || '';
  inputValues.phone =  applicant.phone || '';
  inputValues.sex =  applicant.sex || '';
  inputValues.dob =  applicant.dob || '';
  inputValues.comment =  applicant.comment || '';

  inputErrors.email =  '';
  inputErrors.phone =  '';
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
    case'email':
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailPattern.test(inputValues.email)) {
        inputErrors.email = 'Введите корректный email';
      } else {
        inputErrors.email = '';
        checkForm();
      }
      break;

    case'phone':
      if (inputValues.phone === '' || inputValues.phone === '-') {
        return inputErrors.phone = '';
      }

      const phonePattern = /^(?:\+7|8|7)\s*\(?\d{3}\)?\s*\d{3}[-\s]?\d{2}[-\s]?\d{2}$/;

      if (!phonePattern.test(inputValues.phone)) {
        inputErrors.phone = 'Телефон должен начинаться с "7" или "8" и состоять из 11 цифр.';
      } else {
        inputErrors.phone = '';
        inputValues.phone = formatPhone(inputValues.phone);
        checkForm();
      }
      break;

  }
}

const setSex = (value) => {
  inputValues.sex = value;
};

const updateUserInfo = async () => {
  if (
      applicant.name === inputValues.name &&
      applicant.email === inputValues.email &&
      applicant.phone === inputValues.phone &&
      applicant.sex === inputValues.sex &&
      applicant.dob === inputValues.dob &&
      applicant.comment === inputValues.comment
  )
  {
    return isEdit.value = false;
  }

  checkForm(true);
  if (invalid.value) return;

  pending.value = true;

  try {
    const res = await axios.patch(`/api/candidates/update/${applicant.candidate_id}`, {
      name: inputValues.name,
      email: inputValues.email,
      phone: inputValues.phone,
      sex: inputValues.sex,
      dob: inputValues.dob,
      comment: inputValues.comment,
    })

    if (res.status === 200) {
      isEdit.value = false;
    }

    applicant.name = inputValues.name;
    applicant.phone = inputValues.phone;
    applicant.email = inputValues.email;
    applicant.sex = inputValues.sex;
    applicant.dob = inputValues.dob;
    applicant.comment = inputValues.comment;

    pending.value = false;
  } catch (err) {
    console.error('Ошибка:', err);
    pending.value = false;
  }
};

</script>

<template>
  <div class="applicants__item-content">
    <div class="heading">Профиль соискателя</div>
    <form class="container" @submit.prevent="updateUserInfo" novalidate>
      <div class="inputs">
        <div class="input__container">
          <div class="input__name">Имя</div>
          <input class="input" type="text" v-model="inputValues.name" :disabled="!isEdit">
        </div>
        <div class="input__container">
          <div class="input__name">E-mail</div>
          <input class="input" type="text" v-model="inputValues.email" :disabled="!isEdit"
                 @blur="validate('email')" @input="validate('email')">
          <div class="error" v-show="inputErrors.email">{{ inputErrors.email }}</div>
        </div>
        <div class="input__container">
          <div class="input__name">Phone</div>
          <input class="input" type="text" @change="handleInputPhone" @blur="validate('phone')" v-model="inputValues.phone" :disabled="!isEdit">
          <div class="error" v-show="inputErrors.phone">{{ inputErrors.phone }}</div>
        </div>
      </div>
      <div class="comment">
        <div class="name">Комментарий</div>
        <textarea class="textarea" :placeholder="comment" v-model="inputValues.comment" :disabled="!isEdit"/>
      </div>
      <div class="other">
        <div class="item">
          <div class="name">Статус:</div>
          <div class="value status" v-if="!applicant.failed">
            <div class="icon">
              <svg v-if="applicant.status" xmlns="http://www.w3.org/2000/svg" width="12" height="9" viewBox="0 0 12 9"
                   fill="none">
                <path
                    d="M11.7212 0.278745C11.3499 -0.093032 10.747 -0.0927976 10.3752 0.278745L4.31744 6.33674L1.62503 3.64435C1.25325 3.27257 0.650609 3.27257 0.278832 3.64435C-0.0929441 4.01613 -0.0929441 4.61877 0.278832 4.99055L3.6442 8.35592C3.82998 8.54169 4.07357 8.63481 4.31719 8.63481C4.5608 8.63481 4.80463 8.54193 4.9904 8.35592L11.7212 1.62492C12.0929 1.2534 12.0929 0.650498 11.7212 0.278745Z"
                    fill="#8F47FF"/>
              </svg>
              <svg v-if="!applicant.status" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path
                    d="M6 3.08333V6L7.45833 6.875M11.25 6C11.25 8.89949 8.89949 11.25 6 11.25C3.1005 11.25 0.75 8.89949 0.75 6C0.75 3.1005 3.1005 0.75 6 0.75C8.89949 0.75 11.25 3.1005 11.25 6Z"
                    stroke="#8F47FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            {{ status }}
          </div>
          <div class="value status" v-if="applicant.failed">Тест отменен</div>
        </div>
        <div class="item">
          <div class="name">Пол:</div>
          <div class="value" v-if="!isEdit">
            {{ applicant.sex === 'male' && 'Муж.' || applicant.sex === 'female' && 'Жен.' || 'Не указан'}}
          </div>
          <div class="radio" v-if="isEdit">
            <label class="text">
              <input type="radio" name="sex" @change="setSex('male')" :checked="inputValues.sex === 'male'">
              Муж.
            </label>
          </div>
          <div class="radio" v-if="isEdit">
            <label class="text">
              <input type="radio" name="sex" @change="setSex('female')" :checked="inputValues.sex === 'female'">
              Жен.
            </label>
          </div>
        </div>
        <div class="item">
          <div class="name">Возраст:</div>
          <div class="value" v-if="!isEdit">
            {{ newDob || 'Не указан' }}
          </div>
          <input type="date" v-model="inputValues.dob" v-if="isEdit">
        </div>
        <div class="item" v-if="!applicant.failed">
          <div class="name">Ссылка на тест:</div>
          <div class="value">
            <div class="link">
              {{ applicant.testLink }}
            </div>
            <div class="icon" @click="() => copyTextToClipboard(applicant.testLink)">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="22" viewBox="0 0 22 24" fill="none">
                <path
                    d="M14.5003 1.5V5.46667C14.5003 6.12006 14.5003 6.44676 14.6275 6.69632C14.7393 6.91584 14.9178 7.09432 15.1373 7.20617C15.3869 7.33333 15.7136 7.33333 16.367 7.33333H20.3337M8.66699 7.33333H4.00033C2.71166 7.33333 1.66699 8.378 1.66699 9.66667V20.1667C1.66699 21.4553 2.71166 22.5 4.00033 22.5H11.0003C12.289 22.5 13.3337 21.4553 13.3337 20.1667V16.6667M15.667 1.5H12.4003C11.0935 1.5 10.4401 1.5 9.94102 1.75432C9.50197 1.97802 9.14502 2.33498 8.92131 2.77402C8.66699 3.27315 8.66699 3.92654 8.66699 5.23333V12.9333C8.66699 14.2401 8.66699 14.8935 8.92131 15.3926C9.14502 15.8317 9.50197 16.1886 9.94102 16.4123C10.4401 16.6667 11.0935 16.6667 12.4003 16.6667H16.6003C17.9071 16.6667 18.5605 16.6667 19.0596 16.4123C19.4987 16.1886 19.8556 15.8317 20.0793 15.3926C20.3337 14.8935 20.3337 14.2401 20.3337 12.9333V6.16667L15.667 1.5Z"
                    stroke="#8F47FF" stroke-width="1.5" stroke-linejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
        <div class="edit" @click="clickEdit" v-if="!isEdit">
          Редактировать профиль
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
                d="M9.33317 2.66665L11.2188 4.55227M1 12.9998L1.03163 12.7784C1.14357 11.9948 1.19954 11.603 1.32686 11.2372C1.43983 10.9126 1.59416 10.604 1.78604 10.3189C2.00228 9.99754 2.28213 9.71769 2.84183 9.15799L10.6072 1.39266C11.1279 0.871962 11.9721 0.871961 12.4928 1.39266C13.0135 1.91336 13.0135 2.75758 12.4928 3.27828L4.58496 11.1861C4.0772 11.6939 3.82331 11.9477 3.53413 12.1496C3.27745 12.3289 3.00062 12.4773 2.70932 12.592C2.38114 12.7211 2.02917 12.7922 1.32529 12.9342L1 12.9998Z"
                stroke="#8F47FF" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <button class="edit" type="submit" v-if="isEdit">
          Сохранить
        </button>
        <button class="edit" v-if="isEdit" @click="closeEdit">
          Отменить
        </button>
      </div>
    </form>
    <ApplicantsTests :applicant='applicant'/>
  </div>
</template>

<style lang="scss" scoped>
.applicants__item-content {
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

      .error {
        font-size: 12px;
        color: #D01408;
        text-align: start;
      }

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
      }
    }

    .comment {
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
        resize: none;
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

        &::placeholder {
          color: #c0c0c0;
        }

        &:disabled {
          background-color: transparent;

          &::placeholder {
            color: #e7e7e7;
          }
        }
      }
    }

    .other {
      max-width: 332px;
      width: 100%;
      flex-grow: 1;

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

        .radio {
          font-size: 14px;
          font-weight: 400;
          line-height: 19.6px;
          color: #122130;
          display: flex;
          align-items: center;

          &:last-child {
            margin-left: 1em;
          }
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
            max-height: 20px;
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
        width: 100%;

        @media screen and (max-width: 750px) {
          max-width: 100%;
        }

      }
    }

  }

}
</style>