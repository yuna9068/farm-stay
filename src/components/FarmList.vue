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
        v-for="farm in displayList"
        :key="farm.ID"
        class="col-11 col-md-6 mb-2 mb-sm-4"
      >
        <div
          class="card border-0 overflow-hidden bg-transparent imgAutoResizeFrame"
          :class="$isDefaultImg(farm.Image)"
          @click="showDetail(farm)"
        >
          <img
            class="card-img rounded-0 imgAutoResize"
            loading="lazy"
            :src="farm.Image"
            :alt="farm.Name"
          >
          <div class="imgBlur" :style="{'background-image': `url('${farm.Image}')`}"/>
          <div class="card-img-overlay d-flex">
            <p class="card-title mb-0 mr-auto h5">{{ farm.Name }}</p>
            <div class="farmRegion ml-2 text-right">
              <p class="card-text mb-1 text-nowrap">{{ farm.CountyName }}</p>
              <p class="card-text text-nowrap">{{ farm.TownshipName }}</p>
            </div>
          </div>
          <button
            type="button"
            class="btn position-absolute p-0 border-0 rounded-circle d-flex shadow-none btnHeart"
            aria-label="收藏景點"
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
    <div class="d-flex flex-column align-items-center">
      <div v-show="addLoading" class="spinner-border mt-2 mb-4 text-primary" role="status">
        <span class="sr-only">Loading...</span>
      </div>
      <div v-show="allDataDisplayed" class="mt-2 mb-4 text-secondary">
        <span class="allDataDisplayed">沒有更多資料了</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'FarmList',
  data() {
    return {
      displayList: [],
      addLoading: false,
    };
  },
  mounted() {
    this.scrollEvent();
    if (this.getFilterFarm.length > 0) {
      this.processingDisplayList('newData');
    }
  },
  methods: {
    ...mapActions(['updateSelectedFarm', 'addFavorites', 'removeFavorites']),
    /**
     * 監聽頁面滾動事件
     */
    scrollEvent() {
      $(window).scroll(() => {
        const windowScrollPosition = $(window).scrollTop() + $(window).height();
        const documentHeight = $(document).height();
        if (
          windowScrollPosition > (documentHeight - 200)
          && this.getFilterFarm.length !== this.displayList.length
        ) {
          this.addLoading = true;
          this.processingDisplayList('addData');
        }
      });
    },
    /**
     * 處理要顯示在畫面上的資料數量
     *
     * @param {string} type - 目前要處理的方式
     */
    processingDisplayList(type) {
      const addAmount = 21;

      if (type === 'newData') {
        // 更新篩選條件後取得新的 getFilterFarm，重置 displayList
        this.displayList = [];
        this.displayList = this.getFilterFarm.slice(0, addAmount);
      } else if (type === 'addData') {
        // 滾動至頁面底部時再分批載入資料
        const displayListLength = this.displayList.length;
        const endIndex = displayListLength + addAmount;
        const concatData = this.getFilterFarm.slice(displayListLength, endIndex);
        this.displayList = [...this.displayList, ...concatData];
        this.addLoading = false;
      }
    },
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
    /**
     * 是否顯示訊息"沒有更多資料了"
     */
    allDataDisplayed() {
      if (
        this.getRegionList.length > 0
        && this.getFilterFarm.length === this.displayList.length) {
        return true;
      }
      return false;
    },
  },
  watch: {
    getFilterFarm() {
      this.processingDisplayList('newData');
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  height: 245px;
  cursor: pointer;
  box-shadow: $box-shadow-sm;
  transition: all 0.1s ease-out;
  &:hover {
    box-shadow: 0 0 0.8rem rgba(0, 0, 0, 0.4);
    transition: all 0.2s ease-in;
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

.allDataDisplayed {
  position: relative;
  &::before, &::after {
    content: '';
    position: absolute;
    width: 15vw;
    height: 1px;
    background: $secondary;
    top: 50%;
    transform: translateY(-50%);
  }
  &::before {
    left: -20vw;
  }
  &::after {
    right: -20vw;
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
    min-height: 227px;
  }
}
</style>
