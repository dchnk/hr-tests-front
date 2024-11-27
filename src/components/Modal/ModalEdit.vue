<script setup>
import {computed, reactive, ref} from 'vue';
import axios from "axios";
import {useDepartmentsStore} from "../../stores/departments.js";
import {useModalStore} from "../../stores/modal.js";
import {storeToRefs} from "pinia";

const emit = defineEmits(['closeModal'])

const modalStore = useModalStore();
const {modal, currentVacancy} = storeToRefs(modalStore);

const departmentsStore = useDepartmentsStore();

const invalid = ref(false);
const pending = ref(false);

let defaultValue;

if (modal.value === 'editDepartment') {
  defaultValue = departmentsStore.selected.name;
};

if (modal.value === 'editVacancy') {
  defaultValue = currentVacancy.value.name;
};

const inputValues = reactive({name: defaultValue})

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
  }
}

const clickSubmit = async () => {
  if (invalid.value) return;

  try {
    checkForm(true);
    if (invalid.value) return;

    let address, data, id;

    if (modal.value === 'editDepartment') {
      if (inputValues.name === departmentsStore.selected.name) return;

      address = 'departments';
      data = {name: inputValues.name};
      id = departmentsStore.selected.id;
    };

    if (modal.value === 'editVacancy') {
      address = 'vacancies';
      data = {name: inputValues.name};
      id = currentVacancy.value.id;
    };

    pending.value = true;

    const create = await axios.patch(`/api/${address}/update/${id}`, data)

    console.log(create)

    if (modal.value === 'editDepartment') {
      departmentsStore.selected.name = inputValues.name;
      emit('closeModal');
    }

    if (modal.value === 'editVacancy') {
      currentVacancy.value.name = inputValues.name;
      emit('closeModal');
    }

  } catch (e) {
    console.log(e)
  }

  pending.value = false;
}

const headingText = computed(() => {
  if (modal.value === 'editDepartment') return "Переименовать раздел";
  if (modal.value === 'editVacancy') return 'Переименовать вакансию';
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
      <button class="button submit" type="submit" :class="invalid && 'invalid'">Изменить</button>
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