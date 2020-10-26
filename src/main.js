import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(IconsPlugin)
Vue.use(BootstrapVue)


var firebaseConfig = {
  apiKey: "AIzaSyDLwXXosM4JHADd1HdlbSzRNYpmBPDa_Vc",
  authDomain: "crudfarias.firebaseapp.com",
  databaseURL: "https://crudfarias.firebaseio.com",
  projectId: "crudfarias",
  storageBucket: "crudfarias.appspot.com",
  messagingSenderId: "962339070520",
  appId: "1:962339070520:web:60d290ddd95779328dbccd"
};
// INICIO Firebase
firebase.initializeApp(firebaseConfig);



Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
