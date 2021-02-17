<template>
  <div class="container-md">
    <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-3">
      <div class="col mb-sm-4" v-for="farm in getFilterFarm" :key="farm.ID">
        <div class="card bg-light border-white h-100">
          <img v-if="farm.Image" class="card-img" :src="farm.Image" :alt="farm.Name">
          <img
            v-else
            class="card-img"
            src="@/assets/images/chasing-lin-forest_during_day_photo-unsplash.jpg"
            :alt="farm.Name"
          >
          <div class="card-img-overlay d-flex align-items-center rounded-0">
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
import { mapGetters } from 'vuex';

export default {
  name: 'FarmList',
  computed: {
    ...mapGetters(['getFilterFarm']),
  },
};
</script>

<style lang="scss" scoped>
@include media-breakpoint-down(xs) {
  .container-md {
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

.card-img-overlay {
  background: rgba(0, 0, 0, .4);
  top: initial;
}
</style>
