<template>
  <div
    class="modal fade"
    id="modalMessage"
    data-backdrop="static"
    data-keyboard="false"
    tabindex="-1"
    aria-labelledby="modalMessageTitle"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-body text-center py-5">
          抱歉，出了一點小問題，請重新載入頁面再試一次
        </div>
        <div class="modal-footer p-0">
          <button type="button" class="btn" data-dismiss="modal">關閉</button>
          <button type="button" class="btn border-left" @click="reload()">重新載入</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModalMessage',
  methods: {
    /**
     * 重新載入頁面
     */
    reload() {
      $('#modalMessage').modal('hide');
      window.location.reload();
    },
  },
};
</script>

<style lang="scss" scoped>
#modalMessage {
  .btn {
    margin: 0;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    flex: 1 1 auto;
    border-radius: 0;
    box-shadow: none;
    &:hover {
      color: #ffffff;
      background: $primary;
    }
  }
}
</style>
