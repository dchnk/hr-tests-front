import { defineStore } from 'pinia';
import axios from 'axios';


export const useUserStore = defineStore('user', {

  state: () => {
    return {
      user: undefined,
    }
  },

  getters: {
    fullName: (state) => {

      return (state.user.firstName + ' ' + state.user.secondName).toUpperCase();

    },

    isAdmin: (state) => {
      return state.user?.role === 'admin';
    },
  },

  actions: {
    get() {
      axios.get('/api/users/me')
        .then(({ data }) => {
          this.user = data;
        }).catch(err => {
        console.log(err)
        this.user = null;
      })
    }
  },
})