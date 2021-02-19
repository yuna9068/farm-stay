<template>
  <div class="container-md">
    <div
      v-show="getRegionList.length > 0 && getFilterFarm.length == 0"
      class="alert alert-primary text-center mt-3 mt-sm-0"
      role="alert"
    >
      無符合查詢條件的資料
    </div>
    <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-3">
      <div class="col mb-sm-4" v-for="farm in getFilterFarm" :key="farm.ID">
        <div class="card bg-light border-white h-100" @click="showDetail(farm)">
          <img v-if="farm.Image" class="card-img" :src="farm.Image" :alt="farm.Name">
          <img
            v-else
            class="card-img"
            src="@/assets/images/chasing-lin-forest_during_day_photo-unsplash.jpg"
            :alt="farm.Name"
          >
          <div class="card-img-overlay d-flex align-items-center">
            <h5 class="card-title mb-0 mr-auto text-white">{{ farm.Name }}</h5>
            <div class="farmRegion ml-2 text-right text-light">
              <p class="card-text mb-1 text-nowrap">{{ farm.CountyName }}</p>
              <p class="card-text text-nowrap">{{ farm.TownshipName }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'FarmList',
  methods: {
    ...mapActions(['updateSelectedFarm']),
    /**
     * 進入農場詳細資訊頁
     */
    showDetail(farm) {
      this.updateSelectedFarm(farm);
      this.$router.push('/farm');
    },
  },
  computed: {
    ...mapGetters(['getRegionList', 'getFilterFarm']),
  },
};
</script>

<style lang="scss" scoped>
@include media-breakpoint-down(xs) {
  .col {
    padding: 0;
  }

  .card {
    border-right: none;
    border-left: none;
    .card-img {
      height: 40vh;
      border-radius: 0;
    }
  }
}

.card {
  min-height: 200px;
  cursor: pointer;
}

.card-img-overlay {
  background: rgba(0, 0, 0, 0.4);
  top: initial;
  border-top-right-radius: 0;
  border-top-left-radius: 0;
}
</style>
