<template>
  <div class="thanks">
    <div class="container-md">
      <h1 class="h5 text-center py-4 mb-0">特別感謝下列資源，我才能完成這個網站</h1>
      <ol class="list-unstyled pb-3 mx-auto mb-0 thanksList">
        <li>
          <p class="h6">
            <i class="fas fa-hands-helping"></i>
            資料來源：政府資料開放平臺（提供機關：行政院農業委員會）
          </p>
          <a href="https://data.gov.tw/dataset/6413" target="_blank">來到農村住一晚-休閒農場住宿資訊</a>
        </li>
        <li>
          <p class="h6">
            <i class="fas fa-hands-helping"></i>
            版面設計參考：Ildiko 的 UI Design Daily 網站
          </p>
          <a href="https://www.uidesigndaily.com/posts/sketch-stock-photos-page-website-mockup-list-image-day-1132" target="_blank" rel="noreferrer noopener">首頁卡片樣式</a>
          、
          <a href="https://www.uidesigndaily.com/posts/sketch-website-section-day-1228" target="_blank" rel="noreferrer noopener">農場詳細資訊頁排版</a>
          、
          <a href="https://www.uidesigndaily.com/posts/xd-gallery-mobile-day-284" target="_blank" rel="noreferrer noopener">手機首頁排版</a>
        </li>
        <li>
          <p class="h6">
            <i class="fas fa-hands-helping"></i>
            Icon：Font Awesome
          </p>
          <a href="https://fontawesome.com/" target="_blank" rel="noreferrer noopener">Font Awesome 5</a>
        </li>
        <li>
          <p class="h6">
            <i class="fas fa-hands-helping"></i>
            版面設計建議
          </p>
          <a href="https://github.com/terry90918" target="_blank" rel="noreferrer noopener">Terry Chen</a>
        </li>
        <li>
          <p class="h6">
            <i class="fas fa-hands-helping"></i>
            網站中使用到的圖片
          </p>
          <ImgCarousel/>
        </li>
      </ol>
    </div>
  </div>
</template>

<script>
import ImgCarousel from '@/components/ImgCarousel.vue';

export default {
  name: 'Thanks',
  components: {
    ImgCarousel,
  },
};
</script>

<style lang="scss" scoped>
$raindropColor: #42A5F5;

.thanksList {
  width: fit-content;
  padding-left: 1.5rem;
  li {
    text-indent: -1.5rem;
    &:not(:last-child) {
      margin-bottom: 1rem;
    }
    svg {
      vertical-align: -0.125rem;
    }
    a {
      color: darken($primary, 4%);
    }
  }
}

</style>
