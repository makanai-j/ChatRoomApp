import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '',
      name: 'Form1',
      component: () => import('../components/Pages/Form.vue'),
    },
    {
      path: '/',
      name: 'Form2',
      component: () => import('../components/Pages/Form.vue'),
    },
    {
      path: '/:id',
      name: 'ChatRoom',
      component: () => import('../components/Pages/Home.vue'),
    },
    {
      path: '/:id/:checkCode',
      name: 'ChatRoomOwner',
      component: () => import('../components/Pages/Home.vue'),
    },
    {
      path: '/*',
      name: 'page404',
      component: () => '<p>404</p>',
    },
  ],
})

export default router
