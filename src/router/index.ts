import { getJwtToken } from '@/apis/auth';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomePage.vue'),
  },
  {
    path: '/search_result',
    name: 'search_result',
    component: () => import('../views/SearchPage.vue'),
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../views/ProfilePage.vue'),
  },
  {
    path: '/profile/edit',
    name: 'profileEdit',
    component: () => import('../views/ProfileEdittingPage.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginPage.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to) => {
  if (to.name !== 'login' && !getJwtToken()) {
    return { name: 'login' };
  }
  if (to.name === 'login' && getJwtToken()) {
    return { name: 'home' };
  }
});

export default router;
