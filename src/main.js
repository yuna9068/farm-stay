import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import 'bootstrap';

import './plugins/fontAwesome';
import pluginLoading from './plugins/loading';
import pluginCommonMethods from './plugins/commonMethods';

Vue.use(pluginLoading);
Vue.use(pluginCommonMethods);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
