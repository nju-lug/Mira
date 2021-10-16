import { createRouter, createWebHistory } from 'vue-router';

export const router = createRouter({
  history: createWebHistory(),
  routes: []
});

router.beforeEach((to, _, next) => {
  document.title = to.meta?.title as string;
  next();
});
