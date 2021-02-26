<template>
  <div class="container-md px-0 py-sm-3">
    <ul class="list-unstyled">
      <li
        v-if="getFavoritesList.length === 0"
        class="py-5 text-center text-primary"
      >
        <p>還沒有收藏任何景點唷～</p>
        <img
          src="@/assets/images/magnifying-glass-1019870_1280.jpg"
          class="img-fluid imgToFind"
          alt="還沒有收藏任何景點唷～">
      </li>
      <li
        v-for="(farm, i) in getFavoritesList"
        :key="i"
        class="media w-100 py-3 px-2 p-sm-4 align-items-stretch position-relative"
        :class="{'bg-light': i % 2 === 0}"
      >
        <div
          class="col-6 col-sm-4 p-0 mr-2 mr-sm-3 overflow-hidden rounded-lg imgAutoResizeFrame"
          :class="$isDefaultImg(farm.Image)"
        >
          <img :src="farm.Image" :alt="farm.Name" loading="lazy" class="imgAutoResize">
          <div class="imgBlur" :style="{'background-image': `url('${farm.Image}')`}"/>
        </div>

        <div
          class="media-body col-6 col-sm-8 py-1 px-0 d-flex flex-column"
        >
          <h6 class="text-truncate mb-3">{{ farm.Name }}</h6>

          <div class="overflow-auto flex-grow-0 text-secondary text-justify h-50 farmContent">
            {{ farm.Content ? farm.Content : '景點未提供簡介內容'}}
          </div>

          <div class="text-right mt-auto pt-2 mediaButtons">
            <button
              class="d-inline-block p-1 btn btn-danger shadow-none mb-1 btnMedia btnRemove"
              @click.prevent="removeFavoritesItem(farm)"
            >
              <i class="fas fa-trash-alt"></i>
              刪除
            </button>
            <button
              class="d-inline-block p-1 btn btn-outline-primary shadow-none ml-2 mb-1 btnMedia"
              @click.prevent="showDetail(farm)"
            >
              <i class="fas fa-info-circle"></i>
              詳細資訊
            </button>
            <button
              class="d-inline-block p-1 btn btn-primary shadow-none ml-2 mb-1 btnMedia"
              @click.prevent="addDirectionsItem(farm)"
              :disabled="btnDirectionsStatus() || inDirectionsList(farm.ID)"
            >
              <i class="fas fa-plus-circle"></i>
              {{ inDirectionsList(farm.ID) ? '已加入！' : '加入路線'}}
            </button>
          </div>
        </div>
      </li>
    </ul>
    <Directions/>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Directions from '@/components/Directions.vue';

export default {
  name: 'FavoritesList',
  components: {
    Directions,
  },
  methods: {
    ...mapActions(['updateSelectedFarm', 'removeFavorites', 'addDirections', 'removeDirections']),
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
     * 從收藏景點清單中移除，若已加入規劃路線清單也要一併刪除
     *
     * @param {Object} farm - 農場資料
     */
    removeFavoritesItem(farm) {
      this.removeFavorites(farm);
    },
    /**
     * 加入規劃路線清單
     *
     * @param {Object} farm - 農場資料
     */
    addDirectionsItem(farm) {
      if (!this.btnDirectionsStatus()) {
        this.addDirections(farm);
      }
    },
    /**
     * 加入規劃路線按鈕 disabled 狀態
     */
    btnDirectionsStatus() {
      if (this.getDirectionsList.length >= 5) {
        return true;
      }
      return false;
    },
    /**
     * 是否已加入規劃路線清單
     *
     * @param {number} farmId - 農場 Id
     */
    inDirectionsList(farmId) {
      const directionsIndex = this.getDirectionsList.findIndex((item) => item.ID === farmId);
      if (directionsIndex > -1) {
        return true;
      }
      return false;
    },
  },
  computed: {
    ...mapGetters(['getFavoritesList', 'getDirectionsList']),
  },
};
</script>

<style lang="scss" scoped>
$showContentWidth: 510px;

.imgToFind {
  width: 50%;
  @include media-breakpoint-up(sm) {
    width: 40%;
  }
  @include media-breakpoint-up(lg) {
    width: 30%;
  }
}

.media {
  height: 30vh;
  @media (min-width: $showContentWidth) {
    height: 35vh;
  }
}

.farmContent {
  display: none;
  letter-spacing: 0.2rem;
  @media (min-width: $showContentWidth) {
    display: block;
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
      vertical-align: -0.125rem;
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
