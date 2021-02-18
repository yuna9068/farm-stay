<template>
  <ul class="nav nav-pills flex-nowrap overflow-auto d-sm-none">
    <li class="nav-item" v-for="(item, i) in getRegionList" :key="`county${i}`">
      <a
        href="#"
        class="nav-link rounded-0 text-nowrap"
        :class="{
          'text-white-50': selected !== item.countyName,
          'active': selected === item.countyName
        }"
        @click="selectRegion(item)"
      >{{ item.countyName }}</a>
    </li>
  </ul>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'NavRegion',
  data() {
    return {
      selected: '全部',
    };
  },
  methods: {
    ...mapActions(['updateSearchCondition', 'searchFarm']),
    /**
     * 篩選符合搜尋縣市的農場景點
     */
    selectRegion(item) {
      this.selected = item.countyName;
      this.updateSearchCondition({
        type: 'county',
        value: item.countyName,
      });
      this.searchFarm();
    },
  },
  computed: {
    ...mapGetters(['getRegionList']),
  },
};
</script>

<style lang="scss" scoped>
.nav-link {
  background: $nav-pills-link-active-bg;
  &.active {
    color: $nav-pills-link-active-color;
  }
}
</style>
