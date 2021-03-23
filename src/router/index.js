import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';
import FarmDetail from '@/views/FarmDetail.vue';
import FavoritesList from '@/views/FavoritesList.vue';
import Thanks from '@/views/Thanks.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '*',
    redirect: '/',
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      keepAlive: true,
    },
  },
  {
    path: '/farm',
    name: 'Farm',
    component: FarmDetail,
    meta: {
      keepAlive: false,
    },
  },
  {
    path: '/favorites',
    name: 'Favorites',
    component: FavoritesList,
    meta: {
      keepAlive: true,
    },
  },
  {
    path: '/thanks',
    name: 'Thanks',
    component: Thanks,
    meta: {
      keepAlive: true,
    },
  },
];

const router = new VueRouter({
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (
      to.name === 'Farm'
      || to.name === 'Thanks'
      || (to.name === 'Favorites' && from.name === 'Home')
      || (to.name === 'Favorites' && from.name === 'Thanks')
    ) {
      // 滾軸回到最上方：
      // * 進入農場詳細資訊頁
      // * 進入特別感謝頁
      // * 從首頁進入收藏景點頁
      // * 從特別感謝頁進入收藏景點頁
      return { x: 0, y: 0 };
    }
    return savedPosition;
  },
});

export default router;
