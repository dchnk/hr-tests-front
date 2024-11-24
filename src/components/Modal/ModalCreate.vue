<script setup>
import { computed, reactive, ref } from 'vue';
import axios from "axios";
import {useDepartmentsStore} from "../../stores/departments.js";

const emit = defineEmits(['closeModal'])
const {modal} = defineProps(["modal"]);

const departmentsStore = useDepartmentsStore();

const invalid = ref(false);
const pending = ref(false);

const inputValues = reactive({
  name: '',
})

const inputErrors = reactive({
  name: '',
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
  switch (inputName) {
    case'name':
      if (!inputValues.name) {
        inputErrors.name = 'Обязательно для заполнения';
      } else {
        inputErrors.name = '';
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

    let address, data;

    if (modal === 'createDepartment') {
      address = 'departments';
      data = {name: inputValues.name};
    };
    if (modal === 'createVacancy') {
      address = 'vacancies';
      data = {name: inputValues.name, department_id: departmentsStore.selected.id};
    };

    pending.value = true;

    const create = await axios.post(`/api/${address}/create`, data)

    console.log(create)

    if (modal === 'createDepartment') {
      departmentsStore.get();
      emit('closeModal');
    }

    if (modal === 'createVacancy') {
      departmentsStore.get();
      emit('closeModal');
    }

  } catch (e) {
    console.log(e)
  }

  pending.value = false;
}

const headingText = computed(() => {
  if (modal === 'createDepartment') return 'Создать раздел';
  if (modal === 'createVacancy') return 'Создать вакансию';
})

</script>

<template>
  <form class="modal-create" @submit.prevent="clickSubmit">
    <div class="heading">{{ headingText }}</div>
    <div class="input-container">
      <div class="content">
        <div class="name">Название</div>
      </div>
      <input class="input" @blur="validate('name')" @input="validate('name')" type="text" id="name" minlength="1"
             maxlength="100" size="100"
             v-model="inputValues.name">
      <div class="error" v-show="inputErrors.name">{{ inputErrors.name }}</div>
    </div>
    <div class="buttons">
      <button class="button submit" type="submit" :class="invalid && 'invalid'">Создать</button>
      <div class="button cancel" @click="emit('closeModal')">Отмена</div>
    </div>
  </form>
</template>

<style lang="scss" scoped>
.modal-create {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 420px;

  .heading {
    font-size: 16px;
    font-weight: 600;
    line-height: 22.4px;
    text-align: center;
    color: #122130;
    margin-bottom: 16px;
  }

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

  .buttons {
    display: flex;
    gap: 12px;

    @media screen and (max-width: 500px) {
      flex-direction: column;
      width: 100%;
    }

    .button {
      font-size: 14px;
      font-weight: 700;
      line-height: 16.8px;
      text-align: center;
      box-sizing: border-box;
      width: 180px;
      padding: 13.5px 0;
      border-radius: 10px;
      cursor: pointer;

      @media screen and (max-width: 500px) {
        min-width: 100%;
      }

      &.submit {
        border: none;
        background-color: #8F47FF;
        color: #FFFFFF;

        &.invalid {
          cursor: default;
          background-color: rgba(143, 71, 255, 0.3);
        }
      }

      &.cancel {
        background-color: #F4F5F7;
        color: #8F47FF;
      }

      @media (hover: hover) {


        &:hover {

          &.delete {
            background-color: #D01408;
            color: #F6DBD9;
          }

          &.cancel {
            color: #8F47FF;
            background-color: #EBE1FC;
          }
        }
      }
    }
  }
}
</style>