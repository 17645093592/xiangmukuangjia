import Vue from 'vue'
import Router from 'vue-router'
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
           meta: { title: '用户列表', first: true }
        },
        {
          path: '/roles',
          name: 'roles',
          component: ()=>import('@/views/roles'),
          meta: { title: '角色列表', first: true }

        },
        {
          path: '/rights',
          name: 'rights',
          component: ()=>import('@/views/rights'),
          meta: { title: '权限列表', first: true }

        }
      ]
    }
  ]
})
