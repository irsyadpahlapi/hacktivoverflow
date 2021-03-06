import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import DetailQuestion from '@/components/DetailQuestion'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(Router)

const router = new Router({
  routes: [
    {
      meta: { auth: true },
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      meta: { auth: true },
      path: '/detail/:id',
      name: 'DetailQuestion',
      component: DetailQuestion,
      props: true
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.auth)) {
    if (localStorage.getItem('token')) {
      next()
    } else {
      next({ name: 'Login' })
    }
  } else {
    next()
  }
})
export default router
