import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";

import stringHelpers from '@/services/string-helpers'
Vue.prototype.stringHelpers = stringHelpers
Vue.stringHelpers = stringHelpers

import "bootstrap-vue/dist/bootstrap-vue.css";
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);

import VWave from "v-wave";
Vue.use(VWave)

import Axios from "axios";
Vue.prototype.$http = Axios;

Vue.filter('currency', (value) => {
  if (typeof value !== "number") {
    value = parseFloat(value)
  }
  const formatter = new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 0
  });
  return formatter.format(value);
});

Vue.filter('datetime', (value) => {
  let dt = new Date(value * 1000)

  const formatter = new Intl.DateTimeFormat('ru-RU', {
    month: "long",
    day: "numeric"
  });

  return formatter.format(dt);
});

Vue.prototype.$decl = function(value, words) {
  value = Math.abs(value) % 100;
  var num = value % 10;
  if(value > 10 && value < 20) return words[2];
  if(num > 1 && num < 5) return words[1];
  if(num === 1) return words[0];
  return words[2];
}


Vue.config.productionTip = false;

var vm = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

window.app = vm
