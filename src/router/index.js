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
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login')
    },
    {
      path: '/index',
      name: 'index',
      component: () => import('@/layout'),
    },
    {
      //  /inex 路由没用（但需要设置） 目的是获取meta 如果页面只有一级导航 路由写在下面children里
      path: '/user',
      name: 'user',
      // redirect: url,
      component: () => import('@/layout/index.vue'),
      meta: {
        title: '用户管理',
        first: true
      },
      children: [{
        path: '/users',
        name: 'users',
        component: () => import('@/views/users'),
        meta: {
          title: '用户列表',
          first: true
        }
      }, ]
    },
    {
      //  /inex 路由没用（但需要设置） 目的是获取meta 如果页面只有一级导航 路由写在下面children里
      path: '/quanxian',
      name: 'quanxian',
      // redirect: url,
      component: () => import('@/layout/index.vue'),
      meta: {
        title: '权限管理',
        first: true
      },
      children: [{
          path: '/roles',
          name: 'roles',
          component: () => import('@/views/permission/roles'),
          meta: {
            title: '角色列表',
            first: true
          }

        },
        {
          path: '/rights',
          name: 'rights',
          component: () => import('@/views/permission/rights'),
          meta: {
            title: '权限列表',
            first: true
          }

        }
      ]
    },
    {
      path: '/goods',
      component: () => import('@/layout/index.vue'),
      meta: {
        title: '商品管理',
        first: true
      },
      children:[
        {
          path: '/goods',
          name: 'goods',
          component: () => import('@/views/goods/goodsadd'),
          meta: {
            title: '商品列表',
            first: true
          }

        },
      ]
    },
    {
      path: '/404',
      component: () => import('@/views/404.vue')
    },
    { path: '*', redirect: '/404', hidden: true }
  ]
})
