import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import {LoadingBarApi} from 'naive-ui';

export const loadRef: { value?: LoadingBarApi} = {};

const routes: RouteRecordRaw[] = [
  {
    name: 'Mirrors',
    path: '/',
    component: () => import('../views/Mirrors.vue'),
    meta: {
      title: 'Mirrors',
      useSider: true
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
      title: 'About',
      useSider: true
    }
  },
  {
    name: 'Error',
    path: '/error',
    component: () => import('../views/Error.vue'),
    meta: {
      title: 'Error',
      useSider: true
    }
  },
  {
    name: 'NotFound',
    path: '/:pathMatch(.*)*',
    redirect: '/error'
  }
];

export const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, _, next) => {
  loadRef.value?.start();
  next();
});

router.afterEach(to => {
  document.title = to.meta?.title as string || 'NJU Mirror';
  loadRef.value?.finish();
});

router.onError(() => {
  loadRef.value?.error();
});
