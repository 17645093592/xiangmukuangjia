import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
Vue.use(Router)

// 避免点击相同路由时报错 NavigationDuplicated
const VueRouterPush = Router.prototype.push
Router.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch(err => err)
}

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: ()=>import('@/views/login')
    },
    {
      path: '/index',
      name: 'index',
      component: ()=>import('@/layout'),
      children:[
        {
          path: '/users',
          name: 'users',
          component: ()=>import('@/views/users'),
        },
        {
          path: '/roles',
          name: 'roles',
          component: ()=>import('@/views/bb'),
        }
      ]
    }
  ]
})
