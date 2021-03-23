<template>
  <div class="farmDetail">
    <div class="container-md">
      <!-- 麵包屑 -->
      <ol class="breadcrumb bg-transparent pl-0 mb-0">
        <li class="breadcrumb-item">{{ farm.CountyName }}</li>
        <li class="breadcrumb-item">{{ farm.TownshipName }}</li>
      </ol>

      <div class="row">
        <!-- 景點名稱 -->
        <div class="col-12">
          <h1 class="h2 farmName">{{ farm.Name }}</h1>
        </div>

        <div class="col-12 col-md-7 col-lg-8">
          <!-- 景點照片 -->
          <div
            class="mb-3 overflow-hidden roundedCustom imgAutoResizeFrame"
            :class="$isDefaultImg(farm.Image)"
          >
            <img v-if="farm.Image" :src="farm.Image" :alt="farm.Name" class="imgAutoResize">
            <div class="imgBlur" :style="{'background-image': `url('${farm.Image}')`}"/>
          </div>
          <!-- 景點簡介 -->
          <h2 v-if="farm.Content" class="h5">景點簡介</h2>
          <hr v-if="farm.Content">
          <div
            v-if="farm.Content"
            class="mb-3 text-secondary text-justify farmContent roundedCustom"
          >{{ farm.Content }}</div>
        </div>

        <div class="col-12 col-md-5 col-lg-4">
          <!-- 景點資訊 -->
          <h2 v-if="!noFarmInfo" class="h5">景點資訊</h2>
          <hr v-if="!noFarmInfo">
          <ul v-if="!noFarmInfo" class="p-3 text-break roundedCustom farmInfo">
            <li v-if="farm.AddrDisplay">
              <i class="fas fa-map-marker-alt"></i>
              <a :href="mapUrl(farm.AddrDisplay)" target="_blank" rel="noreferrer noopener">
                {{ farm.AddrDisplay }}
              </a>
            </li>
            <li v-if="farm.TelDisplay">
              <i class="fas fa-phone-alt"></i>
              <div>
                <a
                  v-for="tel in telArray"
                  :key="tel"
                  :href="formatTelHref(tel)"
                  class="d-block"
                >
                  {{ tel }}
                </a>
              </div>
            </li>
            <li v-if="farm.Email">
              <i class="fas fa-envelope"></i>
              <div>
                <a
                  v-for="mail in mailArray"
                  :key="mail"
                  :href="`mailto:${mail}`"
                  class="d-block"
                >
                  {{ mail }}
                </a>
              </div>
            </li>
            <li v-if="farm.FBUrl">
              <i class="fab fa-facebook"></i>
              <a :href="farm.FBUrl" target="_blank" rel="noreferrer noopener">
                {{ farm.FBUrl }}
              </a>
            </li>
            <li v-if="farm.UrlDisplay">
              <i class="fas fa-globe"></i>
              <a :href="farm.UrlDisplay" target="_blank" rel="noreferrer noopener">
                {{ farm.UrlDisplay }}
              </a>
            </li>
            <li v-if="farm.OpenTimeList && farm.OpenTimeList.length > 0">
              <i class="fas fa-clock"></i>
              <span>開放時間</span>
            </li>
            <li v-if="farm.OpenTimeList && farm.OpenTimeList.length > 0">
              <ul class="pl-4 pr-3">
                <li
                  v-for="(item, i) in farm.OpenTimeList"
                  :key="`weekDay${i}`"
                  class="d-flex"
                >
                  <div class="mr-3">{{ formatWeekDay(item.WeekDay) }}</div>
                  <div v-if="item.IsOpenTime" class="mr-3">{{ item.STime }} - {{ item.ETime }}</div>
                  <div v-else>休息</div>
                </li>
              </ul>
            </li>
          </ul>
          <!-- 移出 / 加入收藏景點 -->
          <div class="mb-3">
            <button
              v-if="inFavoritesList"
              type="button"
              class="btn w-100 shadow-none roundedCustom btnRemove"
              @click="removeFavoritesItem()"
            >移出收藏景點</button>
            <button
              v-else
              type="button"
              class="btn btn-outline-primary w-100 shadow-none roundedCustom"
              @click="addFavoritesItem()"
            >加入收藏景點</button>
          </div>
        </div>
      </div>

      <div v-if="farm.AddrDisplay" class="row">
        <div class="col-12">
          <!-- Google 地圖 -->
          <h2 class="h5">Google 地圖</h2>
          <hr>
          <iframe
            :src="mapEmbed(farm.AddrDisplay)"
            width="600"
            height="450"
            class="border-0 w-100 roundedCustom"
            allowfullscreen
            loading="lazy"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'FarmDetail',
  mounted() {
    if (JSON.stringify(this.farm) === '{}') {
      this.$router.push('/');
    }
  },
  methods: {
    ...mapActions(['removeFavorites', 'addFavorites']),
    /**
     * 連至 Google Maps 的網址
     */
    mapUrl(address) {
      return `https://www.google.com.tw/maps/search/${address}`;
    },
    /**
     * 連結的電話格式
     */
    formatTelHref(tel) {
      return `tel:${tel.replaceAll('-', '')}`;
    },
    /**
     * 轉成星期文字
     */
    formatWeekDay(weekDay) {
      switch (weekDay) {
        case 1:
          return '星期一';
        case 2:
          return '星期二';
        case 3:
          return '星期三';
        case 4:
          return '星期四';
        case 5:
          return '星期五';
        case 6:
          return '星期六';
        case 7:
          return '星期日';
        default:
          return '';
      }
    },
    /**
     * 從收藏景點清單中移除
     */
    removeFavoritesItem() {
      this.removeFavorites(this.farm);
    },
    /**
     * 加入收藏景點清單
     */
    addFavoritesItem() {
      this.addFavorites(this.farm);
    },
    /**
     * 嵌入 Google Maps 的網址
     */
    mapEmbed(address) {
      const key = 'AIzaSyDA7sbZjGkFLR2BVEtXNxDfxKRSE7jWpFU';
      return `https://www.google.com/maps/embed/v1/place?key=${key}&q=${address}`;
    },
  },
  computed: {
    ...mapGetters({
      farm: 'getSelectedFarm',
      favorites: 'getFavoritesList',
    }),
    /**
     * 若有多組電話則拆成陣列
     */
    telArray() {
      return this.farm.TelDisplay.split('、');
    },
    /**
     * 若有多組 Email 則拆成陣列
     */
    mailArray() {
      return this.farm.Email.split('、');
    },
    /**
     * 是否已加入收藏清單
     */
    inFavoritesList() {
      if (!this.favorites.length) {
        return false;
      }
      const itemIndex = this.favorites.findIndex((item) => item.ID === this.farm.ID);

      if (itemIndex > -1) {
        return true;
      }
      return false;
    },
    /**
     * 判斷是否沒有景點資訊
     */
    noFarmInfo() {
      if (
        this.farm.AddrDisplay
        || this.farm.TelDisplay
        || this.farm.Email
        || this.farm.FBUrl
        || this.farm.UrlDisplay
        || this.farm.OpenTimeList.length
      ) {
        return false;
      }
      return true;
    },
  },
};
</script>

<style lang="scss" scoped>
$darkenPrimary: darken($primary, 25%);
$btnRemoveColor: #f16c5d;

%animationAppearText {
  opacity: 0;
  animation: appearText 0.8s 0.8s 1 forwards;
}

.breadcrumb-item, .farmName {
  color: $darkenPrimary;
}

.roundedCustom {
  border-radius: 0.5rem;
}

.imgAutoResizeFrame {
  animation: zoomImg 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  height: 200px;
  @include media-breakpoint-up(md) {
    height: 300px;
  }
  @include media-breakpoint-up(lg) {
    height: 360px;
  }
  @include media-breakpoint-up(lg) {
    height: 400px;
  }
}

.farmInfo {
  list-style: none;
  background: #3e7ec3;
  li {
    display: flex;
    color: #ffffff;
    @extend %animationAppearText;
    &:not(:last-child) {
      margin-bottom: 0.5rem;
    }
    a {
      color: #ffffff;
      &:not(:last-child) {
        margin-bottom: 0.5rem;
      }
      &:hover {
        text-decoration: none;
      }
    }
    span {
      vertical-align: middle;
    }
    svg {
      margin-right: 0.5rem;
      height: 1.5rem;
    }
  }
}

.farmContent {
  letter-spacing: 0.2rem;
  @extend %animationAppearText;
}

.btnRemove {
  color: $btnRemoveColor;
  border-color: $btnRemoveColor;
  &:hover {
    color: #ffffff;
    background: $btnRemoveColor;
  }
}

@keyframes zoomImg {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes appearText {
  0% {
    opacity: 0;
    transform: translateY(10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
