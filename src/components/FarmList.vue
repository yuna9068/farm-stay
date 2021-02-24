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
      <div
        v-for="farm in getFilterFarm"
        :key="farm.ID"
        class="col-11 col-md-6 mb-2 mb-sm-4"
      >
        <div
          class="card bg-transparent border-0 justify-content-center overflow-hidden"
          :class="$isDefaultImg(farm.Image)"
          @click="showDetail(farm)"
        >
          <img class="card-img rounded-0" loading="lazy" :src="farm.Image" :alt="farm.Name">
          <div class="imgBlur" :style="{'background-image': `url('${farm.Image}')`}"/>
          <div class="card-img-overlay d-flex">
            <h5 class="card-title mb-0 mr-auto">{{ farm.Name }}</h5>
            <div class="farmRegion ml-2 text-right">
              <p class="card-text mb-1 text-nowrap">{{ farm.CountyName }}</p>
              <p class="card-text text-nowrap">{{ farm.TownshipName }}</p>
            </div>
          </div>
          <button
            type="button"
            class="btn position-absolute p-0 border-0 rounded-circle d-flex shadow-none btnHeart"
            @click.stop="compareFavorites(farm.ID) ? removeItem(farm) : addItem(farm)"
          >
            <font-awesome-icon
              :icon="compareFavorites(farm.ID) ? ['fas', 'heart'] : ['far', 'heart']"
              class="m-auto"
              :class="compareFavorites(farm.ID) ? 'text-danger' : 'text-secondary'"
            />
          </button>
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
    ...mapActions(['updateSelectedFarm', 'addFavorites', 'removeFavorites']),
    /**
     * 進入農場詳細資訊頁
     *
     * @param {Object} farm - 農場資料
     */
    showDetail(farm) {
      this.updateSelectedFarm(farm);
      this.$router.push('/farm');
    },
    /**
     * 比對是否已被加入到收藏清單
     *
     * @param {number} farmId - 農場 Id
     */
    compareFavorites(farmId) {
      const compareIndex = this.getFavoritesList.findIndex((item) => item.ID === farmId);
      if (compareIndex < 0) {
        return false;
      }
      return true;
    },
    /**
     * 加入收藏景點清單
     *
     * @param {Object} farm - 農場資料
     */
    addItem(farm) {
      this.addFavorites(farm);
    },
    /**
     * 從收藏景點清單中移除
     *
     * @param {Object} farm - 農場資料
     */
    removeItem(farm) {
      this.removeFavorites(farm);
    },
  },
  computed: {
    ...mapGetters(['getRegionList', 'getFilterFarm', 'getFavoritesList']),
  },
};
</script>

<style lang="scss" scoped>
.card {
  height: 245px;
  cursor: pointer;
  box-shadow: $box-shadow-sm;
  &:hover {
    box-shadow: 0 0 0.8rem rgba(0, 0, 0, 0.4);
  }
}

.card-img-overlay {
  background: rgba(255, 255, 255, 0.8);
  top: initial;
  z-index: 5;
  border-top-right-radius: 0;
  border-top-left-radius: 0;
  border-top: 6px solid $primary;
}

.btnHeart {
  top: 1.25rem;
  right: 1.25rem;
  font-size: 1.8rem;
  z-index: 3;
  width: 2.5rem;
  height: 2.5rem;
  background: #ffffff;
  svg {
    height: 1rem;
  }
}

@include media-breakpoint-down(xs) {
  .row {
    justify-content: center;
  }

  .card {
    border-right: none;
    border-left: none;
    height: 40vh;
  }
}
</style>
