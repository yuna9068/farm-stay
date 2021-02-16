import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import 'bootstrap';

import pluginLoading from './plugins/loading';

Vue.use(pluginLoading);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
