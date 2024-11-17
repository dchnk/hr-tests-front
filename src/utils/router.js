import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from '../stores/user';

import Login from '../pages/Login.vue'
import Registration from '../pages/Registration.vue'
import Admin from '../pages/Admin.vue'
import PageNotFound from '../pages/PageNotFound.vue'


const routes = [
  // {
  //   path: '/product/:category/:brand/:model/:id',
  //   component: Product,
  // },
  {
    path: '/',
  },
  {
    path: '/admin',
    component: Admin
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

      case '/admin':
        if (!storeUser.user) {
          router.replace('/signin');
        }
    }
  })

})




export default router;

