<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'App',
  created() {
    this.getFarm();
  },
  methods: {
    ...mapActions(['saveFarm']),
    /**
     * 取得所有農場資料
     */
    getFarm() {
      const apiFarm = 'http://192.168.43.19:3000/api/farm-stay';
      $.ajax({
        method: 'GET',
        url: apiFarm,
      }).done((response) => {
        this.saveFarm(response);
      }).fail((response) => {
        console.log('fail: ', response);
      }).always(() => {
        console.log('hide loading');
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
