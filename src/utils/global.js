// 全局常量
const global = {
  // 项目名
  PRODUCT: '提示',
  // 版本号
  VERSION: 'V0.1_20210712',
  // 首页路由的name
  INDEX_PAGE: 'index',
  // 登录路由的name
  LOGIN_PAGE: 'login',
  // 缓存类型
  STORAGE: 'localStorage',
  // 浏览器最小宽度
  BROWSER_MIN_WIDTH: 1200,
  // 分页设置
  SIZE_LIST: [10, 20, 30, 40],
  PAGE_ITEM() {
    return {
      total: 1,
      pageNum: 1,
      pageSize: global.SIZE_LIST[0]
    }
  },
  // -------------------- ajax --------------------
  // BASE_URL: '/apis', // 生产服务器
  // BASE_URL: 'http://112.35.29.174:28099/apis', // 外网服务器
  // BASE_URL: 'http://192.168.1.77:8085/', // 王子测试
  // BASE_URL: 'http://192.168.1.71:8085/', // 徐若鑫
  BASE_URL: 'http://127.0.0.1:8888/api/private/v1/', // 测试

  // BASE_URL: 'http://192.168.1.63:8085/',
  // -------------------- ftp --------------------
  // FTP_URL: '/apis', // 生产服务器
  // FTP_URL: 'http://112.35.29.174:28099/apis', // 外网服务器
  // FTP_URL: 'http://192.168.1.81:8085/', // 外网服务器
  // FTP_URL: 'http://192.168.1.81:8085/', // 王子测试
  // FTP_URL: 'http://192.168.1.104:8085/', // 王未之
  FTP_URL: 'http://112.35.77.123:28090/',

  /**
     * rbac权限管理专用
     *
     */
  // 默认密码
  DEFAULT_PASSWORD: '123456',
  // 管理员角色ID
  ADMIN_ID: '1',
  // rbac用户状态List--- 状态相反map需要changeMap
  USER_STATUS_MAP: changeMap([{
    value: '1',
    label: '正常',
    status: 'success'
  },
  {
    value: '3',
    label: '锁定',
    status: 'error'
  }
  ]),
  // 计划管理-任务管理-任务类型options
  planTaskTypeOptions: [{
    id: 1,
    label: '开发'
  }, {
    id: 2,
    label: '需求调研'
  }, {
    id: 3,
    label: '测试'
  }, {
    id: 4,
    label: '实施'
  }, {
    id: 5,
    label: '设计'
  }, {
    id: 6,
    label: '运维'
  }, {
    id: 7,
    label: '其他'
  }],
  // 完成度
  USER_STATUS_TYPE: [
    {
      value: 1,
      label: '未完成'
    },
    {
      value: 2,
      label: '执行中'
    },
    {
      value: 3,
      label: '已完成'
    }
  ],
  // -----------------------------基本不需要更改的----------------------------------
  // ftp上传文件名称最大字数
  FILE_MAX_NAME: 50,
  // ftp上传文件最大字节
  FILE_MAX_SIZE: 10 * 1024 * 1024,
  // ftp上传图片最大字节
  IMG_MAX_SIZE: 5 * 1024 * 1024,
  // loading框
  LOADING: '',
  // loading框配置
  LOADING_INFO: {
    lock: true,
    text: 'Loading',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)'
  }
}

/**
 * 修改map
 * 一些状态相反的map(显示/屏蔽),只设置了当前状态,需补充操作项的状态
 * @param {Array} *map 待操作map
 * @return {Array} 返回值 返回完整map
 *
 */
function changeMap(map) {
  const [obj1, obj2] = map;
  [obj1.handleStatus, obj2.handleStatus] = [obj2.status, obj1.status];
  [obj1.handleValue, obj2.handleValue] = [obj2.value, obj1.value];
  [obj1.handleLabel, obj2.handleLabel] = [obj1.handleLabel || obj2.label, obj2.handleLabel || obj1.label]
  return map
}

export default global
