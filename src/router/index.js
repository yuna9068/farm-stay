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
});

export default router;
