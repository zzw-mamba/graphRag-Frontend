import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import ShowGraph from './components/ShowGraph.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/showGraph/:id',
    name: 'ShowGraph',
    component: ShowGraph,
    props: true
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
