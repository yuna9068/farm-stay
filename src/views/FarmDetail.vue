<template>
  <div class="FarmDetail">
    <div class="container-md">
      <ol class="breadcrumb bg-transparent pl-0 mb-0">
        <li class="breadcrumb-item">{{ farm.CountyName }}</li>
        <li class="breadcrumb-item">{{ farm.TownshipName }}</li>
      </ol>

      <div class="row">
        <div class="col-12">
          <h1 class="h2 farmName">{{ farm.Name }}</h1>
        </div>

        <div class="col-12 col-md-7 col-lg-8">
          <img
            v-if="farm.Image"
            class="img-fluid w-100 mb-3 roundedCustomer"
            :src="farm.Image"
            :alt="farm.Name"
          >
          <img
            v-else
            class="img-fluid w-100 mb-3 roundedCustomer"
            src="@/assets/images/chasing-lin-forest_during_day_photo-unsplash.jpg"
            :alt="farm.Name"
          >
          <div
            v-if="farm.Content"
            class="mb-3 p-3 bg-light text-secondary farmContent roundedCustomer"
          >{{ farm.Content }}</div>
        </div>

        <div class="col-12 col-md-5 col-lg-4">
          <ul class="p-3 text-break roundedCustomer">
            <li v-if="farm.AddrDisplay">
              <a :href="mapUrl(farm.AddrDisplay)" target="_blank" class="text-white">
                {{ farm.AddrDisplay }}
              </a>
            </li>
            <li v-if="farm.TelDisplay">
              <a
                v-for="tel in telArray"
                :key="tel"
                :href="formatTelHref(tel)"
                class="d-flex text-white"
              >
                {{ tel }}
              </a>
            </li>
            <li v-if="farm.Email">
              <a
                v-for="mail in mailArray"
                :key="mail"
                :href="`mailto:${mail}`"
                class="d-flex text-white"
              >
                {{ mail }}
              </a>
            </li>
            <li v-if="farm.FBUrl">
              <a :href="farm.FBUrl" target="_blank" class="text-white">
                {{ farm.FBUrl }}
              </a>
            </li>
            <li v-if="farm.UrlDisplay">
              <a :href="farm.UrlDisplay" target="_blank" class="text-white">
                {{ farm.UrlDisplay }}
              </a>
            </li>
            <li v-if="farm.OpenTimeList.length > 0" class="text-white">
              開放時間
              <ul class="px-3 mt-2">
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
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <iframe
            :src="mapEmbed(farm.Name)"
            width="600"
            height="450"
            class="border-0 w-100 roundedCustomer"
            allowfullscreen
            loading="lazy"
            ></iframe>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'FarmDetail',
  mounted() {
    if (JSON.stringify(this.farm) === '{}') {
      this.$router.push('/');
    }
  },
  methods: {
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
    }),
    telArray() {
      return this.farm.TelDisplay.split('、');
    },
    mailArray() {
      return this.farm.Email.split('、');
    },
  },
};
</script>

<style lang="scss" scoped>
$darkenPrimary: darken($primary, 25%);

ul {
  list-style: none;
  background: $darkenPrimary;
  li {
    &:not(:last-child) {
      margin-bottom: 0.5rem;
    }
    a {
      &:hover {
        text-decoration: none;
      }
    }
  }
}

.breadcrumb-item, .farmName {
  color: $darkenPrimary;
}

.farmContent {
  letter-spacing: 0.2rem;
}

.roundedCustomer {
  border-radius: 1rem;
}
</style>
