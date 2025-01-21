import { defineStore } from 'pinia';
import axios from 'axios';

export const useUserStore = defineStore('user', {

  state: () => {
    return {
      user: undefined,
    }
  },

  getters: {
    isAdmin: (state) => {
      return state.user?.role === 'admin';
    },
  },

  actions: {
    async get() {
      try {
        const {data} = await axios.get('/api/users/me');
        this.user = data;
      } catch(err) {
        console.log(err)
        this.user = null;
      }
    },
  },
})