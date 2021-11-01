import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { LoadingBarApi } from 'naive-ui';
import fetchDocRoutes from './docs';
import fetchDownloadRoutes from './downloads';

export const loadRef: { value?: LoadingBarApi } = {};

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
    children: [
      {
        path: ':distro',
        component: () => import('../components/Doc.vue'),
      }
    ],
    meta: {
      title: 'Help',
      sider: fetchDocRoutes
    }
  },
  {
    name: 'Downloads',
    path: '/download',
    component: () => import('../views/Downloads.vue'),
    meta: {
      title: 'Downloads',
      sider: fetchDownloadRoutes
    }
  },
  {
    name: 'About',
    path: '/about',
    component: () => import('../views/About.vue'),
    meta: {
      title: 'About'
    }
  },
  {
    name: 'Error',
    path: '/error',
    component: () => import('../views/Error.vue'),
    meta: {
      title: 'Error',
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
