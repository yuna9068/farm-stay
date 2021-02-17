<template>
  <nav
    id="navbarMain"
    class="navbar navbar-expand-sm navbar-dark bg-primary justify-content-center"
  >
    <button
      class="navbar-toggler position-absolute buttonMenu"
      type="button"
      data-toggle="collapse"
      data-target="#navbarContent"
      aria-controls="navbarContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <router-link to="/">
      <a class="navbar-brand mx-auto" href="#">來到農村住一晚</a>
    </router-link>

    <div class="collapse navbar-collapse" id="navbarContent">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/" class="nav-link">首頁</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/" class="nav-link">收藏景點</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/" class="nav-link">特別感謝</router-link>
        </li>
      </ul>
    </div>

    <form class="form-inline d-sm-none position-absolute">
      <div class="input-group justify-content-end">
        <input
          type="text"
          class="form-control inputSearch flex-grow-0"
          :class="{'searchActive': searchDisplay , 'p-0 border-0': !searchDisplay}"
          placeholder="搜尋農場名稱"
          aria-label="搜尋農場名稱"
          aria-describedby="searchFarm"
          v-model="searchText"
        >
        <div class="input-group-append">
          <button
            class="btn btn-outline-light"
            type="button"
            id="searchFarm"
            @click="clickSearch"
          >查詢</button>
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
    ...mapActions(['searchFarm']),
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
      this.searchFarm({
        type: 'keyword',
        value: this.searchText,
      });
      this.searchText = '';
    },
  },
};
</script>

<style lang="scss" scoped>
.buttonMenu {
  top: 0.5rem;
  left: 1rem;
}

form {
  top: 0.5rem;
  right: 1rem;
}

.input-group {
  .inputSearch {
    border-color: $navbar-dark-toggler-border-color;
    width: 0px;
    transition: width 1s, padding 1s;
    &.searchActive {
      width: calc(100% - 58px);
      transition: width 1s, padding 1s;
    }
  }
  #searchFarm {
    border-color: $navbar-dark-toggler-border-color;
    &:focus, &:hover {
      box-shadow: none;
      color: $light;
      background: transparent;
    }
  }
}
</style>
