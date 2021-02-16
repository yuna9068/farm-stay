import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    farm: [], // 所有農場資料
  },
  mutations: {
    FARM(state, payload) {
      state.farm = payload;
    },
  },
  actions: {
    saveFarm(context, payload) {
      context.commit('FARM', payload);
    },
  },
  modules: {
  },
});
