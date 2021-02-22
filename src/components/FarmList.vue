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
        <div
          class="card bg-transparent border-white justify-content-center overflow-hidden"
          @click="showDetail(farm)"
        >
          <img v-if="farm.Image" class="card-img" :src="farm.Image" :alt="farm.Name">
          <img
            v-else
            class="card-img"
            src="@/assets/images/chasing-lin-forest_during_day_photo-unsplash.jpg"
            :alt="farm.Name"
          >
          <div class="card-img-overlay d-flex">
            <h5 class="card-title mb-0 mr-auto text-white">{{ farm.Name }}</h5>
            <div class="farmRegion ml-2 text-right text-light">
              <p class="card-text mb-1 text-nowrap">{{ farm.CountyName }}</p>
              <p class="card-text text-nowrap">{{ farm.TownshipName }}</p>
            </div>
          </div>
          <button
            type="button"
            class="btn position-absolute p-0 border-0 rounded-circle d-flex shadow-none btnHeart"
          >
            <font-awesome-icon
              v-show="compareFavorites(farm.ID)"
              :icon="['fas', 'heart']"
              class="m-auto text-white"
              @click.stop="removeItem(farm)"
            />
            <font-awesome-icon
              v-show="!compareFavorites(farm.ID)"
              :icon="['far', 'heart']"
              class="m-auto text-white"
              @click.stop="addItem(farm)"
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
  height: 30vh;
  cursor: pointer;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    background: center / cover no-repeat;
    background-image: url('~@/assets/images/chasing-lin-forest_during_day_photo-unsplash.jpg');
    filter: blur(5px);
  }
  &:hover {
    box-shadow: 0 0 0.8rem rgba(0, 0, 0, 0.4);
  }
}

.card-img-overlay {
  background: rgba(0, 0, 0, 0.4);
  top: initial;
  border-top-right-radius: 0;
  border-top-left-radius: 0;
}

.btnHeart {
  top: 1.25rem;
  right: 1.25rem;
  font-size: 1.8rem;
  z-index: 2;
  width: 2.5rem;
  height: 2.5rem;
}

@include media-breakpoint-down(xs) {
  .col {
    padding: 0;
  }

  .card {
    border-right: none;
    border-left: none;
    height: 40vh;
    .card-img {
      border-radius: 0;
    }
  }
}
</style>
