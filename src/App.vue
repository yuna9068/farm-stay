<template>
  <div id="app">
    <NavbarMain/>
    <keep-alive>
      <router-view class="page" />
    </keep-alive>
    <ModalMessage/>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import NavbarMain from '@/components/NavbarMain.vue';
import ModalMessage from '@/components/ModalMessage.vue';

export default {
  name: 'App',
  components: {
    NavbarMain,
    ModalMessage,
  },
  mounted() {
    // 若在 created() 執行 getFarm()，有機會無法關閉 Loading
    this.getFarm();
    this.setFavoritesData();
  },
  methods: {
    ...mapActions(['saveFarm', 'updateFavorites', 'updateDirections']),
    /**
     * 取得所有農場資料
     */
    getFarm() {
      this.$loading.show();

      if (this.checkData()) {
        this.getData();
      } else {
        const vm = this;
        const apiFarm = './data/farm.json'; // 資料下載時間：2023-10-22

        $.ajax({
          method: 'GET',
          url: apiFarm,
        }).done((response) => {
          this.checkImage(response);
        }).fail(() => {
          $('#modalMessage').modal('show');
        }).always(() => {
          vm.$loading.hide();
        });
      }
    },
    /**
     * 檢查 localStorage 是否有農場資料
     */
    checkData() {
      const setMs = localStorage.getItem('setMs');
      const nowMs = new Date().getTime();
      const dayMs = 24 * 60 * 60 * 1000;
      const diff = (nowMs - setMs) / dayMs;
      const farmList = localStorage.getItem('farmList');
      if (diff < 7 && farmList) {
        return true;
      }
      localStorage.removeItem('setMs');
      localStorage.removeItem('farmList');
      localStorage.removeItem('favorites');
      localStorage.removeItem('directions');
      return false;
    },
    /**
     * 檢查農場每筆資料是否有 Image，沒有塞一張預設照片
     *
     * @param {Array} farmList - 農場完整資料
     */
    checkImage(farmList) {
      farmList.forEach((farm) => {
        if (!farm.Image) {
          /* eslint-disable no-param-reassign */
          farm.Image = this.randomImage();
          /* eslint-enable no-param-reassign */
        }
      });
      this.saveFarm(farmList);
      this.setFarmData(farmList);
    },
    /**
     * 將農場資料存到 localStorage
     *
     * @param {Array} data - 農場完整資料
     */
    setFarmData(data) {
      const farmList = JSON.stringify(data);
      localStorage.setItem('setMs', new Date().getTime());
      localStorage.setItem('farmList', farmList);
      this.checkData();
    },
    /**
     * 從 localStorage 取出資料
     */
    getData() {
      const farmObject = JSON.parse(localStorage.getItem('farmList'));
      const favoritesObject = JSON.parse(localStorage.getItem('favorites'));
      const directionsObject = JSON.parse(localStorage.getItem('directions'));
      this.saveFarm(farmObject);
      this.updateFavorites(favoritesObject);
      this.updateDirections(directionsObject);
      this.$loading.hide();
    },
    /**
     * 隨機取出一張預設照片
     */
    randomImage() {
      const farmImages = this.getPhotoData.filter((img) => img.tag === 'farm');
      const photoLength = farmImages.length;
      const randomIndex = Math.floor(Math.random() * Math.floor(photoLength));
      // eslint-disable-next-line
      const imgSrc = require(`@/assets/images/${farmImages[randomIndex].photoName}`);
      return imgSrc;
    },
    /**
     * 重新載入或離開網頁時將收藏景點、規劃路線的資料存到 localStorage
     */
    setFavoritesData() {
      const vm = this;
      window.onbeforeunload = () => {
        localStorage.setItem('favorites', JSON.stringify(vm.getFavoritesList));
        localStorage.setItem('directions', JSON.stringify(vm.getDirectionsList));
      };
    },
  },
  computed: {
    ...mapGetters(['getPhotoData', 'getFavoritesList', 'getDirectionsList']),
  },
};
</script>

<style lang="scss">
#app {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.page {
  flex: 1;
  overflow: scroll;
  background-color: #f4f4f4;
}
</style>
