import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    name: 'Mirrors',
    path: '/',
    component: () => import('../views/Mirrors.vue'),
    meta: {
      title: 'Mirrors'
    }
  },
  {
    name: 'Help',
    path: '/help',
    component: () => import('../views/Help.vue'),
    meta: {
      title: 'Help'
    }
  },
  {
    name: 'Downloads',
    path: '/download',
    component: () => import('../views/Downloads.vue'),
    meta: {
      title: 'Downloads'
    }
  },
  {
    name: 'About',
    path: '/about',
    component: () => import('../views/About.vue'),
    meta: {
      title: 'About'
    }
  }
];

export const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, _, next) => {
  document.title = to.meta?.title as string || 'NJU Mirror';
  next();
});
