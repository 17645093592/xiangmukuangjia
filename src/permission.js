// 导航守卫
import Vue from 'vue'
import Router from 'vue-router'
import utils from '@/utils/util.js'
// import global from '@/util/global.js'
import router from './router'
Vue.use(Router)

//不需要token的路由
const whiteRoutes = ['/login', '/404', '/index']
router.beforeEach((to, form, next) => {
  console.log(to.path, '')
  const isWhiteRoutes = whiteRoutes.some(item => to.path.includes(item))
  const treeList = utils.treeConvertList(JSON.parse(localStorage.getItem('treeList')))
  if (utils.checkEmpty(isWhiteRoutes)) {
    const token = localStorage.getItem('token')
    if (token && typeof (token) != 'undefined') {
        // console.log('aaaaa', '')
      /**
//        * 验证权限
//        * 判断登录信息中是否包含跳转的页面--- 用name不好验证，所有用path验证
//        *
//        */
      const hasPermission = treeList.some(item => to.path.includes('/' + item.path))
      if(utils.checkEmpty(hasPermission)){
        Vue.prototype.$message.error('该用户没有权限')
          next({
            name: 'login'
          })
          return
      }
      next()
    }else{
        Vue.prototype.$message.error('token不存在,请重新登录')
        next({ name: 'login' })
    }
  }else{
      next()
  }
})
