<template>
  <nav
    id="navbarMain"
    class="navbar navbar-expand-sm navbar-light justify-content-center shadow-sm"
  >
    <button
      class="navbar-toggler position-absolute px-0 border-0 buttonMenu"
      type="button"
      data-toggle="collapse"
      data-target="#navbarContent"
      aria-controls="navbarContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <router-link to="/" class="navbar-brand mx-auto">
      <h1 class="text-primary">來到農村住一晚</h1>
    </router-link>

    <div class="collapse navbar-collapse" id="navbarContent">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item" @click="collapsedMenu()">
          <router-link to="/" class="nav-link">首頁</router-link>
        </li>
        <li class="nav-item" @click="collapsedMenu()">
          <router-link to="/favorites" class="nav-link">收藏景點</router-link>
        </li>
        <li class="nav-item" @click="collapsedMenu()">
          <router-link to="/thanks" class="nav-link">特別感謝</router-link>
        </li>
      </ul>
    </div>

    <form
      class="form-inline d-sm-none position-absolute"
      :class="{'hideIcon': hideSearchIcon}"
      @submit.prevent
    >
      <div class="input-group justify-content-end">
        <input
          type="text"
          class="form-control inputSearch flex-grow-0"
          :class="{'btn-outline-light searchActive': searchDisplay, 'p-0 border-0': !searchDisplay}"
          placeholder="搜尋農場名稱"
          aria-label="搜尋農場名稱"
          aria-describedby="searchFarm"
          v-model="searchText"
          @keyup.enter.prevent
        >
        <div class="input-group-append">
          <button
            class="btn"
            :class="{
              'btn-outline-light': searchDisplay,
            }"
            type="button"
            id="searchFarm"
            @click="clickSearch()"
          >
            <i class="fas fa-search"></i>
          </button>
        </div>
      </div>
    </form>
  </nav>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'NavbarMain',
  data() {
    return {
      searchDisplay: false, // 搜尋框顯示狀態
      searchText: '', // 搜尋字串
    };
  },
  methods: {
    ...mapActions(['updateSearchCondition', 'searchFarm']),
    /**
     * 點擊查詢按鈕，判斷要 顯示搜尋框 還是 執行搜尋
     */
    clickSearch() {
      if (!this.searchDisplay) {
        this.showSearch(true);
      } else {
        this.showSearch(false);
        this.filterFarm();
      }
    },
    /**
     * 顯示/隱藏 搜尋框
     *
     * @param {boolean} display - 顯示狀態
     */
    showSearch(display) {
      this.searchDisplay = display;
    },
    /**
     * 篩選符合搜尋字串的農場景點
     */
    filterFarm() {
      this.updateSearchCondition({
        type: 'keyword',
        value: this.searchText,
      });
      this.searchFarm();
    },
    /**
     * 點選連結後自動收合選單
     */
    collapsedMenu() {
      if ($('.buttonMenu').is(':visible')) {
        $('.buttonMenu').click();
      }
    },
  },
  computed: {
    /**
     * 是否隱藏搜尋 icon
     */
    hideSearchIcon() {
      if (this.$route.name === 'Home') {
        return false;
      }
      return true;
    },
  },
};
</script>

<style lang="scss" scoped>
.buttonMenu {
  top: 0.5rem;
  left: 1rem;
}

h1 {
  font-size: 1.25rem;
  margin-bottom: initial;
  line-height: initial;
}

form {
  top: 0.5rem;
  right: 1rem;
  &.hideIcon {
    display: none;
  }
}

.input-group {
  .inputSearch {
    width: 0px;
    transition: width 0.5s, padding 0.5s;
    &.searchActive {
      width: calc(100% - 58px);
      transition: width 1s, padding 1s;
    }
  }
  #searchFarm {
    &:focus, &:hover {
      box-shadow: none;
      background: transparent;
    }
  }
}
</style>
