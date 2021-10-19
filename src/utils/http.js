// 插件模块
import axios from 'axios'
import { Loading,Message } from "element-ui";

const MyhttpServer = {}
MyhttpServer.install = (Vue) => {
    axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
    axios.defaults.timeout = 5000;
    var Loadings;
    axios.interceptors.request.use(config =>{
      Loadings = Loading.service()


      return config;
    }, error => {
            return error
    })
    // 返回的参数
    axios.interceptors.response.use(config => {
      Loadings.close();
      if(config.data.meta.status == 400){
          Message.error(config.data.meta.msg)
      }else if(config.data.meta.status == 200){
          Message.success(config.data.meta.msg)
      }
      // console.log(config.data, '')

      return config.data;
  }, error => {
      Loadings.close();
      return error
  });
    // 4. 添加实例方法
    Vue.prototype.$http =  axios
  }

export default MyhttpServer