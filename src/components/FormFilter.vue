<template>
  <div class="container-md pt-3 d-none d-sm-block">
    <form @submit.prevent>
      <div class="form-row">
        <div class="form-group col-sm-3">
          <input
            type="text"
            class="form-control shadow-none"
            name="filterKeyword"
            id="filterKeyword"
            aria-describedby="helpId"
            placeholder="搜尋農場名稱"
            v-model="filterKeyword"
            @keyup.enter.prevent
          >
        </div>

        <div class="dropdown form-group col-sm-3">
          <button
            id="filterCounty"
            class="
              btn dropdown-toggle w-100 shadow-none bg-white
              d-flex justify-content-between align-items-center
            "
            type="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            data-offset="0, 0"
          >
            {{ filterCounty }}
          </button>
          <div class="dropdown-menu overflow-auto border-0" aria-labelledby="filterCounty">
            <a
              class="dropdown-item"
              :class="{'active': filterCounty === item.countyName}"
              href="#"
              v-for="(item, i) in getRegionList"
              :key="`county${i}`"
              @click="selectCounty(item)"
            >
              {{ item.countyName }}
            </a>
          </div>
        </div>

        <div class="dropdown form-group col-sm-3">
          <button
            id="filterTown"
            class="
              btn dropdown-toggle w-100 shadow-none bg-white
              d-flex justify-content-between align-items-center
            "
            type="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            data-offset="0, 0"
          >
            {{ filterTown }}
          </button>
          <div class="dropdown-menu overflow-auto border-0" aria-labelledby="filterTown">
            <a
              class="dropdown-item"
              :class="{'active': filterTown === item}"
              href="#"
              v-for="(item, i) in townList"
              :key="`town${i}`"
              @click="selectTown(item)"
            >
              {{ item }}
            </a>
          </div>
        </div>

        <div class="form-group col-sm-3">
          <button
            type="button"
            class="btn h-100 w-100 shadow-none font-weight-bold text-light btnKeyword"
            @click="search()"
          >
            查詢
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'FormFilter',
  data() {
    return {
      filterKeyword: '',
      filterCounty: '縣市',
      filterTown: '鄉鎮市區',
      townList: [], // 鄉鎮市區清單
    };
  },
  methods: {
    ...mapActions(['updateSearchCondition', 'searchFarm']),
    /**
     * 選擇的縣市
     */
    selectCounty(item) {
      this.filterCounty = item.countyName;
      this.townList = item.townName;
      this.selectTown(this.townList[0]);
    },
    /**
     * 選擇的鄉鎮市區
     */
    selectTown(item) {
      this.filterTown = item;
    },
    /**
     * 篩選符合搜尋字串的農場景點
     */
    search() {
      if (this.filterCounty === '縣市') {
        this.selectCounty(this.getRegionList[0]);
      }

      this.updateSearchCondition({
        type: 'keyword',
        value: this.filterKeyword,
      });
      this.updateSearchCondition({
        type: 'county',
        value: this.filterCounty,
      });
      this.updateSearchCondition({
        type: 'town',
        value: this.filterTown,
      });
      this.searchFarm();
    },
  },
  computed: {
    ...mapGetters(['getRegionList']),
  },
};
</script>

<style lang="scss" scoped>
$filterColor: lighten($primary, 30%);
$filterFontColor: #495057;
$dropdownItemHoverBg: lighten($primary, 40%);
$btnKeywordBg: lighten($primary, 10%);
$textSpacing: 20px;

.btnKeyword {
  background: $btnKeywordBg;
  letter-spacing: $textSpacing;
  text-indent: $textSpacing;
  white-space: nowrap;
  &:hover {
    background: $primary;
  }
}

.form-control, .dropdown-toggle {
  border: 1px solid $filterColor;
  color: $filterFontColor;
  &.focus, &:focus {
    border-color: $primary;
  }
}

.dropdown-menu {
  max-height: 50vh;
  width: calc(100% - #{$form-grid-gutter-width});
  box-shadow: 0 0.125rem 0.25rem $filterColor;
  .dropdown-item {
    &:hover {
      background: $dropdownItemHoverBg;
    }
  }
}
</style>
