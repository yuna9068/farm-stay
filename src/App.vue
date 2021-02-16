<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'App',
  mounted() {
    this.getFarm(); // 若在 created() 執行，有機會無法關閉 Loading
  },
  methods: {
    ...mapActions(['saveFarm']),
    /** 取得所有農場資料 */
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
