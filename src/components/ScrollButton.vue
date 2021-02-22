<template>
  <div class="scrollButton position-fixed d-flex">
    <button
      type="button"
      class="btn text-info border-0 rounded-circle font-weight-bolder mr-3 shadow-none"
      @click="toTop()"
    >
      &#9650;
    </button>
    <button
      type="button"
      class="btn text-info border-0 rounded-circle font-weight-bolder shadow-none"
      @click="toBottom()"
    >
      &#9660;
    </button>
  </div>
</template>

<script>
export default {
  name: 'ScrollButton',
  mounted() {
    this.scrollEvent();
  },
  methods: {
    scrollEvent() {
      const navbarHeight = $('#navbarMain').innerHeight();
      $(window).scroll(() => {
        if ($(window).scrollTop() > navbarHeight) {
          $('.scrollButton').addClass('enter');
        } else {
          $('.scrollButton').removeClass('enter');
        }
      });
    },
    toTop() {
      $('html, body').animate({
        scrollTop: 0,
      }, 1000, 'linear');
    },
    toBottom() {
      $('html, body').animate({
        scrollTop: document.body.scrollHeight,
      }, 1000, 'linear');
    },
  },
};
</script>

<style lang="scss" scoped>
$transition-time: 0.4s;

.scrollButton {
  right: -100px;
  bottom: 20px;
  opacity: 0;
  transition: all $transition-time linear;
  .btn {
    background-color: rgba($light, 0.8);
    opacity: 0;
    transform: rotate(360deg);
    transition: all $transition-time linear;
  }
  &.enter {
    opacity: 1;
    right: 10%;
    transition: all $transition-time linear;
    .btn {
      opacity: 1;
      transform: rotate(0deg);
      transition: all $transition-time linear;
    }
  }
}
</style>
