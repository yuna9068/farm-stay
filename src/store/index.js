import Vue from 'vue';
import Vuex from 'vuex';
import photo from '@/assets/json/photo.json';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    farm: [], // 所有農場資料
    regionList: [], // 縣市鄉鎮清單
    searchCondition: { // 搜尋條件_農場名稱、縣市、鄉鎮
      keyword: '',
      county: '',
      town: '',
    },
    filterFarm: [], // 首頁顯示的農場清單
    selectedFarm: {}, // 使用者點選的農場詳細資料
    favoritesList: [], // 收藏景點清單
    photoData: photo, // 預設圖片資料
  },
  getters: {
    /**
     * 取得縣市鄉鎮清單
     */
    getRegionList(state) {
      return state.regionList;
    },
    /**
     * 取得搜尋條件_景點名稱、縣市、鄉鎮
     */
    getSearchCondition(state) {
      return state.searchCondition;
    },
    /**
     * 取得篩選後的農場清單
     */
    getFilterFarm(state) {
      return state.filterFarm;
    },
    /**
     * 取得使用者點選的農場詳細資料
     */
    getSelectedFarm(state) {
      return state.selectedFarm;
    },
    /**
     * 取得收藏景點清單
     */
    getFavoritesList(state) {
      return state.favoritesList;
    },
    /**
     * 取得預設圖片資料
     */
    getPhotoData(state) {
      return state.photoData;
    },
  },
  mutations: {
    FARM(state, payload) {
      state.farm = payload;
    },
    REGIONLIST(state, payload) {
      const countyList = [];
      const result = [];

      payload.forEach((farm) => {
        if (countyList.indexOf(farm.CountyName) === -1) {
          countyList.push(farm.CountyName);
          result.push({
            countyName: farm.CountyName,
            townName: ['全部', farm.TownshipName],
          });
        } else {
          result.forEach((item) => {
            if (
              item.countyName === farm.CountyName
              && item.townName.indexOf(farm.TownshipName) === -1
            ) {
              item.townName.push(farm.TownshipName);
            }
          });
        }
      });

      result.unshift({
        countyName: '全部',
        townName: ['全部'],
      });

      state.regionList = result;
    },
    SEARCHCONDITION(state, { type, value }) {
      state.searchCondition[type] = value;
    },
    FILTERFARM(state) {
      let list = state.farm;

      // 篩選農場名稱
      if (state.searchCondition.keyword) {
        list = list.filter((item) => item.Name.includes(state.searchCondition.keyword));
      }

      // 篩選農場縣市
      if (state.searchCondition.county && state.searchCondition.county !== '全部') {
        list = list.filter((item) => item.CountyName === state.searchCondition.county);
      }

      // 篩選農場鄉鎮
      if (state.searchCondition.town && state.searchCondition.town !== '全部') {
        list = list.filter((item) => item.TownshipName === state.searchCondition.town);
      }

      state.filterFarm = list;
    },
    SELECTEDFARM(state, payload) {
      state.selectedFarm = payload;
    },
    FAVORITESLIST(state, { type, target }) {
      switch (type) {
        case 'add':
          state.favoritesList.push(target);
          break;

        case 'remove': {
          const removeIndex = state.favoritesList.findIndex((item) => item.ID === target.ID);
          state.favoritesList.splice(removeIndex, 1);
          break;
        }

        case 'update':
          state.favoritesList = target;
          break;

        default:
          break;
      }
    },
  },
  actions: {
    /**
     * 儲存所有農場資料、產生縣市鄉鎮清單、初始篩選資料
     */
    saveFarm(context, payload) {
      context.commit('FARM', payload);
      context.commit('REGIONLIST', payload);
      context.commit('FILTERFARM');
    },
    /**
     * 更新搜尋條件
     */
    updateSearchCondition(context, payload) {
      context.commit('SEARCHCONDITION', payload);
    },
    /**
     * 查詢符合搜尋條件的農場景點
     */
    searchFarm(context) {
      context.commit('FILTERFARM');
    },
    /**
     * 更新使用者點選的農場詳細資料
     */
    updateSelectedFarm(context, payload) {
      context.commit('SELECTEDFARM', payload);
    },
    /**
     * 加入收藏景點清單
     */
    addFavorites(context, payload) {
      context.commit('FAVORITESLIST', {
        type: 'add',
        target: payload,
      });
    },
    /**
     * 從收藏景點清單中移除
     */
    removeFavorites(context, payload) {
      context.commit('FAVORITESLIST', {
        type: 'remove',
        target: payload,
      });
    },
    /**
     * 更新收藏景點清單
     */
    updateFavorites(context, payload) {
      context.commit('FAVORITESLIST', {
        type: 'update',
        target: payload,
      });
    },
  },
  modules: {
  },
});
