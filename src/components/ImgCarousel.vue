<template>
  <div id="imgCarousel" class="carousel slide mx-auto" data-ride="carousel">
    <ol class="carousel-indicators">
      <li
        v-for="(img, i) in getPhotoData"
        :key="`img${i}`"
        data-target="#imgCarousel"
        :data-slide-to="i"
        :class="{'active': i === 0}"
      ></li>
    </ol>
    <div class="carousel-inner rounded">
      <div
        v-for="(img, i) in getPhotoData"
        :key="`img${i}`"
        class="carousel-item h-100 imgAutoResizeFrame"
        :class="{'active': i === 0}"
      >
        <img
          :src="require(`@/assets/images/${img.photoName}`)"
          class="d-block imgAutoResize"
          :alt="`Photo by ${img.authorName}`"
        >
        <div
          class="imgBlur"
          :style="{'background-image': 'url(' + require(`@/assets/images/${img.photoName}`) + ')'}"
        />
        <div class="carousel-caption px-1">
          <a :href="img.photoLink" target="_blank" rel="noreferrer noopener">Photo</a>
          <span>&nbsp;by&nbsp;</span>
          <a
            :href="img.authorLink"
            target="_blank"
            rel="noreferrer noopener"
          >
            {{ img.authorName }}
          </a>
          <span>&nbsp;on&nbsp;</span>
          <a :href="img.webLink" target="_blank" rel="noreferrer noopener">{{ img.webName }}</a>
        </div>
      </div>
    </div>
    <a class="carousel-control-prev" href="#imgCarousel" role="button" data-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="sr-only">Previous</span>
    </a>
    <a class="carousel-control-next" href="#imgCarousel" role="button" data-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="sr-only">Next</span>
    </a>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'ImgCarousel',
  computed: {
    ...mapGetters(['getPhotoData']),
  },
};
</script>

<style lang="scss" scoped>
#imgCarousel, .carousel-inner {
  width: 270px;
  height: 180px;
  @include media-breakpoint-up(sm) {
    width: 450px;
    height: 300px;
  }
  @include media-breakpoint-up(md) {
    width: 600px;
    height: 400px;
  }
}

.carousel-caption {
  color: $dark;
  background: rgba(255, 255, 255, 0.8);
  letter-spacing: 0.1rem;
  text-indent: initial;
}
</style>
