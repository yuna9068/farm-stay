<template>
  <ul class="nav nav-pills flex-nowrap overflow-auto d-sm-none bg-white">
    <li class="nav-item" v-for="(item, i) in getRegionList" :key="`county${i}`">
      <a
        href="#"
        class="nav-link rounded-0 text-nowrap"
        :class="{
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
.nav-pills {
  .nav-link {
    color: #607d8b;
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      width: 0;
      height: 0.25rem;
      background: $primary;
      border-radius: 50rem;
      transition: all 0.8s;
    }
    &.active {
      position: relative;
      background: transparent;
      color: #000000;
      &::after {
        width: 80%;
        left: 10%;
        transition: all 0.8s;
      }
    }
  }
}
</style>
