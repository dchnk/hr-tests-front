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

const routes = [
  {
    path: '/test/:link',
    component: Test,
  },
  {
    path: '/',
  },
  {
    path: '/admin',
    component: Admin
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
  routes,
  history: createWebHistory()
})

router.beforeEach((to) => {

  const storeUser = useUserStore();

  if (to.path === '/') {
    window.location.replace('/signin');
  }

  storeUser.$subscribe(() => {
    switch (to.path) {
      case '/':
        storeUser.user ? router.push('/admin') : router.push('/signin');

        break;

      case '/signup':
      case '/signin':
        if (storeUser.user) {
          router.replace('/admin');
        }
        break;

      case '/profile':
      case '/balance':
      case '/admin':
        if (!storeUser.user) {
          router.replace('/signin');
        }
    }

    if (to.path.includes('/tests/result')) {
      if (!storeUser.user) {
        router.replace('/signin');
      }
    }
  })

})




export default router;

