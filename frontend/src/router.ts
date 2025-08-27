import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import ShowGraph from './components/ShowGraph.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/showGraph/:id',
    name: 'ShowGraph',
    component: ShowGraph,
    props: true,
    meta: { title: '结果图例' },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (typeof to.meta.title === 'string') {
    document.title = to.meta.title; // 设置标签页标题
  }
  next();
});

export default router;
