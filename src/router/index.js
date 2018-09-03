import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Index from '@/pages/index/Index'
import Login from '@/pages/login/Index'
import Register from '@/pages/register/Index'
import App from '@/pages/app/Index'
import AppList from '@/pages/app/List'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      redirect:'/index'
    },
    {
      path: '/index',
      name: 'index',
      component: Index
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/app',
      name: 'appList',
      component: AppList
    },
    {
      path: '/app/:id',
      name: 'app',
      component: App
    },
  ]
})
