// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from 'axios'
import axios from './services/request.js'
import qs from 'qs'
import comment from './services/comment.js'
// 手动配置element-ui
import ElementUI, { Message, MessageBox } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
import { getToken, setToken } from './services/auth'

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$Axios = Axios
Vue.prototype.$qs = qs;
Vue.prototype.comment = comment;

// 白名单
const whiteList = ['/login/slogin', '/login/elogin', '/login/eregister', '/']
// 前置路由
router.beforeEach(async (to, from, next) => {
  const hasToken = getToken()
  if (hasToken) {
    if (to.path == '/login') {
      next({ path: '/' })
    } else {
      next();
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      Message.info("请登录")
      next({ path: '/' })
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
