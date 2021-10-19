import Service from '../utils/http1'
// 头部和项目工作量
export function Login(params) {
  return Service({
      url:'login',
      params
  })
}
export function getmenus(data) {
    return Service({
      url: 'menus',
      method: 'get',
      data
    })
  }