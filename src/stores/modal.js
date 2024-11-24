import { defineStore } from 'pinia';
import axios from 'axios';

const page = document.querySelector('html');


export const useModalStore = defineStore('modal', {

  state: () => {
    return {
      modal: '',
    }
  },

  actions: {
    openModal(modalName) {
      this.modal = modalName;
      page.style.overflow = 'hidden';
    },

    closeModal() {
      this.modal = '';
      page.style.overflow = 'auto';
    }
  },
})