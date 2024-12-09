import { defineStore } from 'pinia';
import axios from 'axios';

export const useDepartmentsStore = defineStore('departments', {

  state: () => {
    return {
      departments: undefined,
      selected: null,
      isArchive: false,
      applicants: {},
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
          this.archive.vacancies = [];

          for (let i in this.departments) {
            for (let n in this.departments[i].vacancies) {
              if (this.departments[i].vacancies[n].archived) {

                this.archive.vacancies.push(this.departments[i].vacancies[n]);
              }
            }
          }
        }).catch(err => {
        console.log(err)
      })
    },

    getApplicants(data) {
      axios.post('/api/candidates', data)
        .then(({ data }) => {
          for (let j in data) {
            const currentVacancy = this.selected.vacancies.find((vacancy) => vacancy.id === data[j].vacancy_id);
            if (!currentVacancy.applicants) {
              currentVacancy.applicants = [];
            }

            if (!currentVacancy.applicants.some((applicant) => applicant.candidate_id === data[j].candidate_id)) {
              currentVacancy.applicants.push(data[j]);
            }
          }
        }).catch(err => {
        console.log(err)
      })
    },

    addApplicant(candidate) {

      console.log()

      const currentVacancy = this.selected.vacancies.find((vacancy) => vacancy.id === candidate.vacancy_id);

      if (!currentVacancy.applicants) {
        currentVacancy.applicants = [];
      }

      currentVacancy.applicants.push(candidate);
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