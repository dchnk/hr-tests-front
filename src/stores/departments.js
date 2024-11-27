import { defineStore } from 'pinia';
import axios from 'axios';


export const useDepartmentsStore = defineStore('departments', {

  state: () => {
    return {
      departments: undefined,
      selected: null,
      isArchive: false,
      archive: {
        name: "Архив вакансий",
        vacancies: []
      },
    }
  },

  getters: {

  },

  actions: {
    get() {
      axios.get('/api/departments')
        .then(({ data }) => {
          this.departments = data;

          console.log(this.departments)

          for (let i in this.departments) {
            for (let n in this.departments[i].vacancies) {
              if (this.departments[i].vacancies[n].archived) {
                this.archive.vacancies.push(this.departments[i].vacancies[n]);
              }
            }
          }
        }).catch(err => {
        console.log(err)
        this.user = null;
      })
    },

    selectDepartment(department) {
      this.isArchive = false;

      if (department === this.selected) return this.selected = null;

      this.selected = department;
    },

    showArchive() {
      this.selected = this.archive;
      this.isArchive = true;
    },
  },
})