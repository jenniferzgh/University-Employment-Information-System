import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
// import store from '@/store'
import { getToken, removeToken } from './auth'

// 创建axios实例
const service = axios.create({
  baseURL: '', // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 10000 // request timeout
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // do something before request is sent

    /**
     * localStorage.getItem("")
     */

    if (getToken()) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['X-Token'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data

    if (!res.code) {
      return response
    }

    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 10000) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })




      if (res.code === 40001 || res.code === 40002 || res.code === 40003 || res.code === 40004 || res.code === 40005) {
        // to re-login
        MessageBox.confirm('您已注销，请重新登陆', '登陆过期', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 
          // store.dispatch('user/resetToken').then(() => {
          //   location.reload()
          // })
          // 清除token，重新登录
          removeToken()
          location.reload()
        })
      }





      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return response
    }
    return response
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
