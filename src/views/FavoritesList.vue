<template>
  <div class="container-md px-0">
    <ul class="list-unstyled">
      <li
        v-for="(item, i) in getFavoritesList"
        :key="i"
        class="media w-100 py-3 px-2 p-sm-4 align-items-stretch"
        :class="{'bg-light': i % 2 === 0}"
      >
        <div class="col-6 col-sm-4 p-0 mr-2 mr-sm-3">
          <img :src="item.Image" :alt="item.Name" class="w-100 rounded-lg">
        </div>

        <div
          class="media-body col-6 col-sm-8 py-1 px-0 d-flex flex-column"
        >
          <h6 class="text-truncate mb-1">{{ item.Name }}</h6>

          <div
            class="overflow-auto flex-grow-0 text-secondary farmContent"
          >
            {{ item.Content }}
          </div>

          <div class="text-right mt-auto pt-2 mediaButtons">
            <button
              class="d-inline-block p-1 btn btn-danger shadow-none mb-1 btnMedia btnRemove"
              @click.prevent="removeItem(item)"
            >
              <i class="fas fa-trash-alt"></i>
              刪除
            </button>
            <button
              class="d-inline-block p-1 btn btn-outline-primary shadow-none ml-2 mb-1 btnMedia"
              @click.prevent="showDetail(item)"
            >
              <i class="fas fa-info-circle"></i>
              詳細資訊
            </button>
            <button
              class="d-inline-block p-1 btn btn-primary shadow-none ml-2 mb-1 btnMedia"
            >
              <i class="fas fa-directions"></i>
              規劃路徑
            </button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'FavoritesList',
  methods: {
    ...mapActions(['updateSelectedFarm', 'removeFavorites']),
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
     * 從收藏景點清單中移除
     *
     * @param {Object} farm - 農場資料
     */
    removeItem(farm) {
      this.removeFavorites(farm);
    },
  },
  computed: {
    ...mapGetters(['getFavoritesList']),
  },
};
</script>

<style lang="scss" scoped>
$showContentWidth: 510px;

.farmContent {
  display: none;
  height: 70px;
  @media (min-width: $showContentWidth) {
    display: block;
  }
  @include media-breakpoint-up(lg) {
    height: 100px;
  }
  @include media-breakpoint-up(xl) {
    height: 150px;
  }
}

.mediaButtons {
  padding-left: 50px;
  @media (min-width: $showContentWidth) {
    padding-left: 0;
  }
  .btnMedia {
    font-size: 14px;
    svg {
      height: 1.5em;
      vertical-align: bottom;
    }
  }
  .btnRemove {
    position: absolute;
    left: 0;
    bottom: 0.25rem;
    @media (min-width: $showContentWidth) {
      position: relative;
      left: initial;
      bottom: initial;
    }
  }
}

</style>
