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
  if (modal.value === 'archiveDepartment') return 'Архивиовать раздел';
  if (modal.value === 'archiveVacancy') return 'Архивиовать вакансию';
  if (modal.value === 'unzipVacancy') return 'Разархивировать вакансию';
})

const clickArchive = async () => {
  try {
    let address, id;

    if (modal.value === 'archiveDepartment') {
      address = 'departments/archive';
      id = departmentsStore.selected.id;
    };
    if (modal.value === 'archiveVacancy') {
      address = 'vacancies/archive';
      id = currentVacancy.value.id;
    };
    if (modal.value === 'unzipVacancy') {
      address = 'vacancies/unzip';
      id = currentVacancy.value.id;
    };

    pending.value = true;

    const archiveDepartment = await axios.post(`/api/${address}/${id}`);

    console.log(archiveDepartment)

    if (modal.value === 'archiveDepartment') {
      for (let i in departmentsStore.departments) {
        if (departmentsStore.departments[i].id === departmentsStore.selected.id) {
          departmentsStore.departments[i].archived = true;
        }
      }

      departmentsStore.selected = null;
      emit('closeModal');
    }

    if (modal.value === 'archiveVacancy') {
      for (let i in departmentsStore.selected.vacancies) {
        if (departmentsStore.selected.vacancies[i].id === currentVacancy.value.id) {

          departmentsStore.selected.vacancies[i].archived = true;

          departmentsStore.archive.vacancies.push(departmentsStore.selected.vacancies[i]);
        }
      }

      emit('closeModal');
    }



    if (modal.value === 'unzipVacancy') {
      for (let i in departmentsStore.archive.vacancies) {
        if (departmentsStore.archive.vacancies[i].id === currentVacancy.value.id) {

          departmentsStore.archive.vacancies[i].archived = false;

          departmentsStore.archive.vacancies.splice(i, 1);
        }
      }


      emit('closeModal');
    };

  } catch (e) {
    console.log(e)
  }

  pending.value = false;
}

</script>

<template>
  <div class="modal-delete">
    <div class="heading">{{ headingText }}</div>
    <div class="text">Вы уверены?</div>
    <div class="buttons">
      <div class="button delete" @click="clickArchive">Да</div>
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