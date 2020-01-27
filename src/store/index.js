import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from "firebase/app";
import "firebase/auth";


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
    verificarLogin(context) {
      if (!context.state.logado) {
        if (firebase.auth().currentUser) {
          context.commit('login', firebase.auth().currentUser.uid);
        }
      }
    }
  },
  modules: {
  }
})
