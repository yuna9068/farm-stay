<template>
  <div id="app">
    <NavbarMain/>
    <router-view/>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
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

      const vm = this;
      const apiFarm = 'http://192.168.43.19:3000/api/farm-stay';

      $.ajax({
        method: 'GET',
        url: apiFarm,
      }).done((response) => {
        this.saveFarm(response);
      }).fail((response) => {
        console.log('fail: ', response);
      }).always(() => {
        vm.$loading.hide();
      });
    },
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
