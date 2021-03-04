<template>
  <div
    class="directions d-flex align-items-end"
    :class="{'hide': !listDisplay || !checkListLength, 'show': listDisplay && checkListLength}"
  >
    <div class="modal-backdrop fade" :class="{'show': listDisplay && checkListLength}"></div>
    <button
      type="button"
      class="btn shadow-none rounded-circle bthCar"
      @click="showDirections()"
    >
      <i class="fas fa-car-side"></i>
      <span class="badge badge-pill badge-primary">
        {{ getDirectionsList.length }} / 5
      </span>
    </button>
    <ul class="list-group list-group-flush" :class="{'shadow-lg': listDisplay && checkListLength}">
      <li
        v-for="(farm, i) in getDirectionsList"
        :key="`directions${farm.ID}`"
        class="
          list-group-item list-group-item-action list-group-item-light
          d-flex justify-content-between align-items-center directionsItem
        "
        :class="{'over': sortInfo.overIndex == i}"
        draggable="true"
        @dragstart="dragstart($event, i)"
        @dragover.prevent
        @drop.prevent="drop($event, i)"
        @dragenter="sortInfo.overIndex = i"
        @dragend="sortInfo.overIndex = null"
        @touchstart="touchstart(i)"
        @touchend="touchend($event)"
        @touchmove="touchmove($event)"
      >
        <div class="mr-3 farmInfo">
          <p class="w-100 text-truncate font-weight-bold">{{ farm.Name }}</p>
          <p class="mb-0 w-100 text-truncate">{{ farm.AddrDisplay }}</p>
        </div>
        <button
          class="btn btn-sm btn-outline-danger p-2 shadow-none btnRemove text-nowrap"
          @click.prevent="removeDirectionsItem(farm)"
        >
          <i class="fas fa-trash-alt"></i>
          刪除
        </button>
      </li>
      <li class="list-group-item text-center p-0">
        <button
          class="btn w-100 px-3 py-2 shadow-none bg-primary text-white rounded-0"
          @click="googleMaps()"
        >
          <i class="fas fa-directions"></i>
          規劃路線
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Directions',
  data() {
    return {
      listDisplay: false, // 是否顯示規劃路線清單條件之一
      sortInfo: { // 拖曳&觸碰事件相關資訊
        beforeIndex: null,
        afterIndex: null,
        overIndex: null,
      },
      listItem: { // 觸碰事件使用，記錄每個規劃路線地點在畫面上顯示的位置
        xPosition: {
          start: 0,
          end: 0,
        },
        yPosition: [],
      },
    };
  },
  mounted() {
    this.updatelistItemYPosition();
  },
  methods: {
    ...mapActions(['removeDirections', 'updateDirections']),
    /**
     * 顯示規劃路線清單
     */
    showDirections() {
      if (this.checkListLength) {
        this.listDisplay = !this.listDisplay;
        return;
      }
      this.listDisplay = false;
    },
    /**
     * 移除加入規劃路線的地點
     *
     * @param {Object} farm - 農場資料
     */
    removeDirectionsItem(farm) {
      this.removeDirections(farm);
      if (this.getDirectionsList.length === 0) {
        this.listDisplay = false;
      }
      this.updatelistItemYPosition();
    },
    /**
     * 記錄每個規劃路線地點在畫面上顯示的 y 軸位置
     */
    updatelistItemYPosition() {
      this.$nextTick(() => {
        this.listItem.yPosition = [];
        $('.directionsItem').each((index, element) => {
          this.listItem.yPosition.push({
            start: $(element).offset().top,
            end: $(element).offset().top + $(element).outerHeight(),
          });
        });
      });
    },
    /**
     * 連到 Google Maps 規劃路線
     */
    googleMaps() {
      let dirString = '';
      this.getDirectionsList.forEach((farm) => {
        dirString += `${farm.AddrDisplay}/`;
      });

      const mapUrl = `https://www.google.com.tw/maps/dir/${dirString}`;
      window.open(mapUrl);
    },
    /**
     * 拖曳開始
     *
     * @param {Object} e - DOM
     * @param {number} index - 拖曳物件的 index
     */
    dragstart(e, dragIndex) {
      e.dataTransfer.effectAllowed = 'move';
      this.sortInfo.beforeIndex = dragIndex;
    },
    /**
     * 拖曳放下
     *
     * @param {Object} e - DOM
     * @param {number} dropIndex - 放下拖曳物件的 index
     */
    drop(e, dropIndex) {
      e.dataTransfer.dropEffect = 'move';
      this.sortInfo.afterIndex = dropIndex;
      this.sortDirections();
    },
    /**
     * 觸碰開始
     *
     * @param {number} startIndex - 觸碰物件的 index
     */
    touchstart(startIndex) {
      this.sortInfo.beforeIndex = startIndex;
      this.listItem.xPosition.start = $('.list-group').offset().left;
      this.listItem.xPosition.end = $('.list-group').offset().left + $('.list-group').width();
    },
    /**
     * 觸碰結束
     *
     * @param {Object} e - DOM
     */
    touchend(e) {
      const touchEvent = e.touches[0] || e.changedTouches[0];
      const endPageX = touchEvent.pageX;
      const endPageY = touchEvent.pageY;

      if (
        endPageX >= this.listItem.xPosition.start
        && endPageX < this.listItem.xPosition.end
      ) {
        let endPageYInRange = false;
        this.listItem.yPosition.forEach((item, index) => {
          if (
            endPageY >= item.start
            && endPageY < item.end
          ) {
            this.sortInfo.afterIndex = index;
            this.sortDirections();
            endPageYInRange = true;
          }
        });

        if (!endPageYInRange) {
          this.clearSoftInfo();
        }
      } else {
        this.clearSoftInfo();
      }
    },
    /**
     * 觸碰移動到物件上時增加背景色
     *
     * @param {Object} e - DOM
     */
    touchmove(e) {
      const touchEvent = e.touches[0] || e.changedTouches[0];
      const endPageX = touchEvent.pageX;
      const endPageY = touchEvent.pageY;

      if (
        endPageX >= this.listItem.xPosition.start
        && endPageX < this.listItem.xPosition.end
      ) {
        let endPageYInRange = false;
        this.listItem.yPosition.forEach((item, index) => {
          if (
            endPageY >= item.start
            && endPageY < item.end
          ) {
            this.sortInfo.overIndex = index;
            endPageYInRange = true;
          }
        });

        if (!endPageYInRange) {
          this.sortInfo.overIndex = null;
        }
      } else {
        this.sortInfo.overIndex = null;
      }
    },
    /**
     * 重新排序規劃路線清單
     */
    sortDirections() {
      if (this.sortInfo.beforeIndex === this.sortInfo.afterIndex) {
        this.clearSoftInfo();
        return;
      }
      const newList = this.getDirectionsList.concat([]);
      const beforeItem = newList[this.sortInfo.beforeIndex];
      const afterItem = newList[this.sortInfo.afterIndex];
      newList.splice(this.sortInfo.beforeIndex, 1, afterItem);
      newList.splice(this.sortInfo.afterIndex, 1, beforeItem);
      this.updateDirections(newList);
      this.clearSoftInfo();
    },
    /**
     * 清空排序相關資料
     */
    clearSoftInfo() {
      this.sortInfo.beforeIndex = null;
      this.sortInfo.afterIndex = null;
      this.sortInfo.overIndex = null;
    },
  },
  computed: {
    ...mapGetters(['getDirectionsList']),
    /**
     * 確認是否已有地點加入規劃路線
     */
    checkListLength() {
      if (this.getDirectionsList.length) {
        return true;
      }
      return false;
    },
  },
  watch: {
    listDisplay(newValue) {
      if (newValue && this.checkListLength) {
        $('body').addClass('modal-open');
      } else {
        $('body').removeClass('modal-open');
      }
    },
    getDirectionsList() {
      this.updatelistItemYPosition();
    },
  },
};
</script>

<style lang="scss" scoped>
svg {
  vertical-align: -0.125rem;
}

.directions {
  position: fixed;
  bottom: 1rem;
  z-index: 10;
  width: 100vw;
  pointer-events: none;
  &.hide {
    right: calc(-100vw + 6rem);
    transition: right 1s;
  }
  &.show {
    right: 0;
    transition: right 1s;
    .bthCar, .list-group {
      z-index: $zindex-modal;
    }
  }
  @include media-breakpoint-up(sm) {
    width: 90vw;
    &.hide {
      right: calc(-90vw + 6rem);
    }
  }
  @include media-breakpoint-up(md) {
    width: 80vw;
    &.hide {
      right: calc(-80vw + 6rem);
    }
  }
  @include media-breakpoint-up(lg) {
    width: 60vw;
    &.hide {
      right: calc(-60vw + 6rem);
    }
  }
}

.bthCar {
  position: relative;
  bottom: 80px;
  width: 6rem;
  padding-top: 0.75rem;
  background: rgba(255, 255, 255, 0.8);
  pointer-events: auto;
  svg {
    font-size: 2rem;
  }
  .badge {
    position: absolute;
    top: 0.25rem;
    right: 0.25rem;
  }
}

.list-group {
  width: calc(100% - 6rem);
  pointer-events: auto;
  .over {
    background: lighten($primary, 45%);
  }
  .farmInfo {
    width: 60%;
    cursor: move;
    @include media-breakpoint-up(sm) {
      width: 80%;
    }
  }
}
</style>
