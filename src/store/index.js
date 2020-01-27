import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    logado: false,
    uid: ''
  },
  mutations: {
    login(state, userId) {
      state.logado = true;
      state.uid = userId;
    },
    logout(state) {
      state.logado = false;
      state.uid = '';
    }
  },
  actions: {
  },
  modules: {
  }
})
