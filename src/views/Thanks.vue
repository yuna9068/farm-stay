<template>
  <div class="thanks">
    <div class="container-md">
      <h1 class="h5 text-center py-5 mb-0">特別感謝下列資源，我才能完成這個網站</h1>
      <ol class="list-unstyled mb-3 mx-auto thanksList">
        <li>
          <h6>
            <i class="fas fa-hands-helping"></i>
            資料來源：政府資料開放平臺（提供機關：行政院農業委員會）
          </h6>
          <a href="https://data.gov.tw/dataset/6413" target="_blank">來到農村住一晚-休閒農場住宿資訊</a>
        </li>
        <li>
          <h6>
            <i class="fas fa-hands-helping"></i>
            版面設計參考：Ildiko 的 UI Design Daily 網站
          </h6>
          <a href="https://www.uidesigndaily.com/posts/sketch-stock-photos-page-website-mockup-list-image-day-1132" target="_blank">首頁卡片樣式</a>
          、
          <a href="https://www.uidesigndaily.com/posts/sketch-website-section-day-1228" target="_blank">農場詳細資訊頁排版</a>
          、
          <a href="https://www.uidesigndaily.com/posts/xd-gallery-mobile-day-284" target="_blank">手機首頁排版</a>
        </li>
        <li>
          <h6>
            <i class="fas fa-hands-helping"></i>
            icon：Font Awesome
          </h6>
          <a href="https://fontawesome.com/" target="_blank">Font Awesome 5</a>
        </li>
        <li>
          <h6>
            <i class="fas fa-hands-helping"></i>
            架設後端伺服器處理政府資料開放平臺 API CORS 跨域請求問題，並提供版面設計建議
          </h6>
          <a href="https://github.com/terry90918" target="_blank">Terry Chen</a>
        </li>
        <li>
          <h6>
            <i class="fas fa-hands-helping"></i>
            網站中使用到的圖片
          </h6>
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

.thanks {
  min-height: calc(100vh - 56px);
  background-color: rgba(0, 0, 0, 0.05);
}

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
  }
}

</style>
