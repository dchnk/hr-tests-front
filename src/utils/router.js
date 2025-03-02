import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from '../stores/user';

import Login from '../pages/Login.vue'
import Registration from '../pages/Registration.vue'
import Admin from '../pages/Admin.vue'
import Profile from '../pages/Profile.vue'
import Balance from '../pages/Balance.vue'
import Test from '../pages/Test.vue'
import PageNotFound from '../pages/PageNotFound.vue'
import TestResult from '../pages/TestResult.vue'
import Offer from '../pages/Offer.vue'

const routes = [
  {
    path: '/test/:link',
    component: Test,
  },
  {
    path: '/',
    redirect: to => {
      const storeUser = useUserStore();
      return storeUser.user ? '/admin' : '/signin';
    }
  },
  {
    path: '/admin',
    component: Admin
  },
  {
    path: '/offer',
    component: Offer
  },
  {
    path: '/tests/result/:id',
    component: TestResult
  },
  {
    path: '/profile',
    component: Profile
  },
  {
    path: '/balance',
    component: Balance
  },
  {
    path: '/signin',
    component: Login
  },
  {
    path: '/signup',
    component: Registration
  },
  {
    path: "/:pathMatch(.*)*",
    component: PageNotFound
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to) => {
  const storeUser = useUserStore();

  if (storeUser.user === undefined) await storeUser.get()

  const isAuth = !!storeUser.user;

  const protectedPaths = ['/admin', '/profile', '/balance', '/tests/result'];

  const isProtected = protectedPaths.some(path => to.path.startsWith(path));

  if (isProtected && !isAuth) {
    return '/signin';
  }

  if (['/signin', '/signup'].includes(to.path) && isAuth) {
    return '/admin';
  }
});




export default router;

