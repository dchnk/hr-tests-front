<script setup>
import {computed, ref} from 'vue';
import axios from "axios";
import {useDepartmentsStore} from "../../stores/departments.js";
import {useModalStore} from "../../stores/modal.js";
import {storeToRefs} from "pinia";

const emit = defineEmits(['closeModal']);

const modalStore = useModalStore();
const {modal, currentVacancy} = storeToRefs(modalStore);

const departmentsStore = useDepartmentsStore();

const pending = ref(false);

const headingText = computed(() => {
  if (modal.value === 'deleteDepartment') return 'Удалить раздел';
  if (modal.value === 'deleteVacancy') return 'Удалить вакансию';
})

const clickDelete = async () => {
  try {
    let address, id;

    if (modal.value === 'deleteDepartment') {
      address = 'departments';
      id = departmentsStore.selected.id;
    };
    if (modal.value === 'deleteVacancy') {
      address = 'vacancies';
      id = currentVacancy.value.id;
    };

    pending.value = true;

    const deleteDepartment = await axios.delete(`/api/${address}/delete/${id}`);

    console.log(deleteDepartment)

    if (modal.value === 'deleteDepartment') {
      for (let i in departmentsStore.departments) {
        if (departmentsStore.departments[i].id === departmentsStore.selected.id) {
          departmentsStore.departments.splice(i, 1);
        }
      }

      departmentsStore.selected = null;
      emit('closeModal');
    }

    if (modal.value === 'deleteVacancy') {

      for (let i in departmentsStore.selected.vacancies) {
        if (departmentsStore.selected.vacancies[i].id === currentVacancy.value.id) {
          departmentsStore.selected.vacancies.splice(i, 1);
        }
      }

      emit('closeModal');
    }

  } catch (e) {
    console.log(e)
  }

  pending.value = false;
}

</script>

<template>
  <div class="modal-delete">
    <div class="heading">{{ headingText }}</div>
    <div class="text">Вы уверены? Данное действие нельзя отменить.</div>
    <div class="buttons">
      <div class="button delete" @click="clickDelete">Удалить</div>
      <div class="button cancel" @click="emit('closeModal')">Отмена</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.modal-delete {
  display: flex;
  flex-direction: column;
  align-items: center;



  .heading {
    font-size: 16px;
    font-weight: 600;
    line-height: 22.4px;
    text-align: center;
    color: #122130;
    margin-bottom: 16px;
  }

  .text {
    font-size: 14px;
    font-weight: 400;
    line-height: 22.4px;
    text-align: center;
    color: #122130;
    margin-bottom: 16px;
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

      &.delete {
        background-color: #F6DBD9;
        color: #D01408;
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