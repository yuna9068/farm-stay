<template>
  <div class="home">
    <NavRegion/>
    <FarmList/>
    <ScrollButton/>
    <p>查詢農場名稱： {{ getSearchCondition.keyword }}</p>
    <p>查詢農場縣市： {{ getSearchCondition.county }}</p>
    <p>查詢農場鄉鎮： {{ getSearchCondition.town }}</p>
    <p>查詢結果： {{ getFilterFarm.length }} 筆</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import NavRegion from '@/components/NavRegion.vue';
import FarmList from '@/components/FarmList.vue';
import ScrollButton from '@/components/ScrollButton.vue';

export default {
  name: 'Home',
  components: {
    NavRegion,
    FarmList,
    ScrollButton,
  },
  computed: {
    ...mapGetters(['getSearchCondition', 'getFilterFarm']),
  },
};
</script>
