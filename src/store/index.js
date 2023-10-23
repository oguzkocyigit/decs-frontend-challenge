import { createStore } from 'vuex';
import ApiService from '../services/ApiService'

export default createStore({
  state: {
    users: JSON.parse(localStorage.getItem('users')) || [],
  },
  mutations: {
    setUsers(state, users) {
      state.users = users;
      localStorage.setItem('users', JSON.stringify(users));
    },
  },
  actions: {
    async fetchData({ commit }) {
      try {
        const data = await ApiService.fetchData();
        commit('setUsers', data);
      } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
      }
    },
  },
  getters: {
    getUsers: state => state.users,
  },
});

