// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import utils from '@/utils/util.js'
import global from '@/utils/global.js'
import components from '@/components'

// import MyhttpServer from '@/utils/http'
import 'element-ui/lib/theme-chalk/index.css';

import './styles/global.scss'
Vue.config.productionTip = false
Vue.prototype.utils = utils
Vue.prototype.global = global
Vue.use(ElementUI);
Vue.use(components);

// Vue.use(MyhttpServer)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
