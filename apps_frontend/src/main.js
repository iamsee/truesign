
require('./app_config/require')
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import promise from 'es6-promise'
import Vue from 'vue'
import router from './app_config/router-init'
import store from './vuex/store'
import App from './App.vue'
/* eslint-disable no-new */
import Mint from 'mint-ui';
Vue.use(Mint);

new Vue({
  router,
  store,
  // el: '#app',
  render: h => h(App)
}).$mount('#app')



