import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    farm: [], // 所有農場資料
    searchFarmText: '', // 搜尋字串_農場名稱
    filterFarm: [], // 首頁顯示的農場清單
  },
  getters: {
    /**
     * 取得搜尋字串_農場名稱
     */
    getSearchFarmText(state) {
      return state.searchFarmText;
    },
    /**
     * 取得篩選後的農場清單
     */
    getFilterFarm(state) {
      return state.filterFarm;
    },
  },
  mutations: {
    FARM(state, payload) {
      state.farm = payload;
    },
    SEARCHFARMTEXT(state, payload) {
      state.searchFarmText = payload;
    },
    FILTERFARM(state, payload) {
      let list = [];
      if (payload === 'farmName') {
        // 篩選農場名稱
        list = state.farm.filter((item) => item.Name.includes(state.searchFarmText));
      } else {
        // 所有農場資料
        list = state.farm;
      }
      state.filterFarm = list;
    },
  },
  actions: {
    /**
     * 儲存所有農場資料
     */
    saveFarm(context, payload) {
      context.commit('FARM', payload);
    },
    /**
     * 查詢符合搜尋條件的農場景點
     */
    searchFarmName(context, payload) {
      context.commit('SEARCHFARMTEXT', payload);
      context.commit('FILTERFARM', 'farmName');
    },
  },
  modules: {
  },
});
