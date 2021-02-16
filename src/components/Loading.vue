<template>
  <div
    class="modal fade"
    id="modalLoading"
    data-backdrop="static"
    data-keyboard="false"
    tabindex="-1"
    aria-describedby="Loading"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content bg-transparent border-0">
        <div class="modal-body text-center">
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
</template>

<script>
export default {
  name: 'Loading',
  methods: {
    /**
     * 顯示 Loading
     */
    show() {
      $('#modalLoading').modal('show');
    },
    /**
     * 隱藏 Loading
     */
    hide() {
      $('#modalLoading').modal('hide');
    },
  },
};
</script>

<style lang="scss" scoped>
$delay-time: 0.2;

.spinner-grow {
  animation-duration: (5 * $delay-time) + s;
  @for $i from 1 through 5 {
    &:nth-child(#{$i}) {
      animation-delay: (($i - 1) * $delay-time) + s;
    }
  }
}
</style>
