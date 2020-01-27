import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import firebase from 'firebase/app'

Vue.config.productionTip = false

var firebaseConfig = {
  apiKey: "AIzaSyCzEFByxTnIAV5RRS1WJhpf0Pm6iPrUtiU",
  authDomain: "vue-ecom-a769d.firebaseapp.com",
  databaseURL: "https://vue-ecom-a769d.firebaseio.com",
  projectId: "vue-ecom-a769d",
  storageBucket: "vue-ecom-a769d.appspot.com",
  messagingSenderId: "151146164868",
  appId: "1:151146164868:web:3090adce76e167932488d1"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
