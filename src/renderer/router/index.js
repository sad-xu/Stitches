import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/home/home.vue')
    },
    {
      path: '/pixmap',
      name: 'Pixmap',
      component: () => import('@/views/pixmap/pixmap')
    },
    {
      path: '/landing-page',
      name: 'landing-page',
      component: () => import('@/components/LandingPage')
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
