<template>
  <div
    class="directions d-flex align-items-end"
    :class="{'hide': !listDisplay || !checkListLength, 'show': listDisplay && checkListLength}"
  >
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
          d-flex justify-content-between align-items-center
        "
        :class="{'over': overIndex == i}"
        draggable="true"
        @dragstart="dragstart($event, i)"
        @dragover.prevent
        @drop.prevent="drop($event, i)"
        @dragenter="overIndex = i"
        @dragend="overIndex = null"
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
      listDisplay: false,
      overIndex: null,
    };
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
     */
    removeDirectionsItem(farm) {
      this.removeDirections(farm);
      if (this.getDirectionsList.length === 0) {
        this.listDisplay = false;
      }
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
    dragstart(e, index) {
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text', index);
    },
    /**
     * 拖曳放下
     *
     * @param {Object} e - DOM
     * @param {number} dropIndex - 放下拖曳物件的 index
     */
    drop(e, dropIndex) {
      e.dataTransfer.dropEffect = 'move';
      const newList = this.getDirectionsList.concat([]);
      const dragIndex = e.dataTransfer.getData('text');
      const dragItem = newList[dragIndex];
      const dropItem = newList[dropIndex];
      newList.splice(dragIndex, 1, dropItem);
      newList.splice(dropIndex, 1, dragItem);
      this.updateDirections(newList);
      this.overIndex = null;
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
