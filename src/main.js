import axios from 'axios'

import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

import { library } from '@fortawesome/fontawesome-svg-core'


import { 
  faStar as faStarSolid
} from '@fortawesome/free-solid-svg-icons'

import {
  faStar as faStarRegular
} from '@fortawesome/free-regular-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faStarSolid,faStarRegular)
Vue.component('font-awesome-icon', FontAwesomeIcon)


axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://localhost:8000/'
window.axios = axios;

Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
Vue.component('font-awesome-icon', FontAwesomeIcon)


Vue.config.productionTip = false

store.dispatch('auth/me').then(() => {
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
})
