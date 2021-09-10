import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
// import { BootstrapVue } from 'bootstrap-vue'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import './theming/themeing.scss'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

import PrimeVue from 'primevue/config';
Vue.use(PrimeVue);

// vue-crypto-js for encryption




