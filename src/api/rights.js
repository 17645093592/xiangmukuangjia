import Service from '../utils/http1'
// 获取角色列表
export function getRightsList(params) {
  return Service({
    url: 'rights/list',
    method: 'get',
    params
  })
}