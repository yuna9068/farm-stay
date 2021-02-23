<template>
  <div id="app">
    <NavbarMain/>
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import NavbarMain from '@/components/NavbarMain.vue';

export default {
  name: 'App',
  components: {
    NavbarMain,
  },
  mounted() {
    // 若在 created() 執行 getFarm()，有機會無法關閉 Loading
    this.getFarm();
  },
  methods: {
    ...mapActions(['saveFarm']),
    /**
     * 取得所有農場資料
     */
    getFarm() {
      this.$loading.show();

      if (this.checkData()) {
        this.getData();
      } else {
        const vm = this;
        const apiFarm = 'https://machi-cat.herokuapp.com/api/farm-stay';

        $.ajax({
          method: 'GET',
          url: apiFarm,
        }).done((response) => {
          this.checkImage(response);
        }).fail((response) => {
          console.log('fail: ', response);
        }).always(() => {
          vm.$loading.hide();
        });
      }
    },
    /**
     * 檢查 localStorage 是否有資料
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
      return false;
    },
    /**
     * 檢查每筆資料是否有 Image，沒有塞一張預設照片
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
      this.setData(farmList);
    },
    /**
     * 將資料存到 localStorage
     *
     * @param {Array} data - 農場完整資料
     */
    setData(data) {
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
      this.saveFarm(farmObject);
      this.$loading.hide();
    },
    /**
     * 隨機取出一張預設照片
     */
    randomImage() {
      const photoLength = this.getPhotoData.length;
      const randomIndex = Math.floor(Math.random() * Math.floor(photoLength));
      // eslint-disable-next-line
      const imgSrc = require(`@/assets/images/${this.getPhotoData[randomIndex].photoName}`);
      return imgSrc;
    },
  },
  computed: {
    ...mapGetters(['getPhotoData']),
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
