// 插件模块
import axios from 'axios'
import {
  Loading,
  Message
} from "element-ui";
import CryptoJS from '@/assets/crypto.min.js'
import global from '@/utils/global.js'
import utils from '@/utils/util.js'
const ConfigBaseURL = global.BASE_URL

 const Server = axios.create({
  timeout: 7000, // 请求超时时间
  baseURL: ConfigBaseURL,
  method: 'post',
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
})
var Loadings;
Server.interceptors.request.use(config => {
  // config.headers.common.token = window.localStorage.getItem('token')
  if(config.url !== 'login'){
    const token = window.localStorage.getItem('token')
    config.headers.common['Authorization'] = token
  }

  
  Loadings = Loading.service()


  return config;
}, error => {
  return error
})
// 返回的参数
Server.interceptors.response.use(config => {
  Loadings.close();
  if (config.data.meta.status == 400) {
    Message.error(config.data.meta.msg)
  } else if (config.data.meta.status == 200) {
    Message.success(config.data.meta.msg)
  }
  // console.log(config.data, '')

  return config.data;
}, error => {
  Loadings.close();
  console.log('TCL: error', error)
  const msg = error.Message !== undefined ? error.Message : ''
  Message({
    message: '网络错误' + msg,
    type: 'error',
    duration: 3 * 1000
  })
  return Promise.reject(error)
});

export default Server