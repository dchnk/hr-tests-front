import { defineStore } from 'pinia';
import axios from 'axios';


export const useDepartmentsStore = defineStore('departments', {

  state: () => {
    return {
      departments: undefined,
      selected: null,
    }
  },

  getters: {

  },

  actions: {
    get() {
      axios.get('/api/departments')
        .then(({ data }) => {
          this.departments = data;
          console.log(data)
        }).catch(err => {
        console.log(err)
        this.user = null;
      })
    },

    selectDepartment(department) {
      if (department === this.selected) return this.selected = null;

      this.selected = department;
    }
  },
})