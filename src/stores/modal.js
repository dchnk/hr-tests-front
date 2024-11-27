import { defineStore } from 'pinia';
import axios from 'axios';

const page = document.querySelector('html');


export const useModalStore = defineStore('modal', {

  state: () => {
    return {
      modal: '',
      currentVacancy: null,
    }
  },

  actions: {
    openModal(modalName, vacancy) {
      this.currentVacancy = vacancy
      this.modal = modalName;

      page.style.overflow = 'hidden';
    },

    closeModal() {
      this.currentVacancy = null;

      this.modal = '';
      page.style.overflow = 'auto';
    }
  },
})