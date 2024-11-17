import { createRouter, createWebHistory } from "vue-router";
// import { useUserStore } from '../stores/user';

import Login from '../pages/Login.vue'
import Registration from '../pages/Registration.vue'
import Admin from '../pages/Admin.vue'
import PageNotFound from '../pages/PageNotFound.vue'


const routes = [
  // {
  //   path: '/product/:category/:brand/:model/:id',
  //   component: Product,
  // },
  // {
  //   path: '/',
  //   component: Login
  // },
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
  // const storeUser = useUserStore();

  // storeUser.$subscribe(() => {
  //   switch (to.path) {
  //
  //     case '/signup':
  //     case '/signin':
  //       if (storeUser.user) {
  //         router.replace('/catalog');
  //       }
  //       break;
  //
  //     case '/profile':
  //       if (!storeUser.user) {
  //         router.replace('/signin');
  //       }
  //   }
  // })


})




export default router;

