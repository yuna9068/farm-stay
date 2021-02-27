<template>
  <div class="modalLoading">
    <div class="modal-backdrop fade" :class="{'show': display}"></div>
    <div class="modal fade" :class="{'show': display}">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content bg-transparent border-0">
          <div class="modal-body text-center">
            <p class="text-white">因資料總數達兩千多筆，下載資料可能需要一點時間，請耐心等候</p>
            <div
              class="spinner-grow mx-2 mx-sm-3 text-primary"
              role="status"
              v-for="i in 5"
              :key="`spinner${i}`"
            >
              <span class="sr-only">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Loading',
  data() {
    return {
      display: false,
    };
  },
  methods: {
    /**
     * 顯示 Loading
     */
    show() {
      this.display = true;
    },
    /**
     * 隱藏 Loading
     */
    hide() {
      this.display = false;
    },
  },
};
</script>

<style lang="scss" scoped>
$delay-time: 0.2;

.modal-backdrop {
  z-index: -1;
  &.show {
    z-index: $zindex-modal-backdrop;
  }
}

.modal.show {
  display: block;
}

.spinner-grow {
  animation-duration: (5 * $delay-time) + s;
  @for $i from 1 through 5 {
    &:nth-child(#{$i}) {
      animation-delay: (($i - 1) * $delay-time) + s;
    }
  }
}
</style>
