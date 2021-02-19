import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';
import FarmDetail from '@/views/FarmDetail.vue';

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
];

const router = new VueRouter({
  routes,
});

export default router;
