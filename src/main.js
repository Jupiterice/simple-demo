import Vue from 'vue';
import App from './App.vue';
import router from './router';
import './assets/app.less';

Vue.config.productionTip = false;
Vue.config.errorHandler = (err, vm, info) => {
  console.error(err, vm, info);
};
Vue.config.warnHandler = (err, vm, info) => {
  console.warn(err, vm, info);
};

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  router,
  render: h => h(App),
});
