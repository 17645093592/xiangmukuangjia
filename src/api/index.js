import Service from '../utils/http1'
// 头部和项目工作量
export function Login(data) {
  return Service({
      url:'login',
      data
  })
}
export function getmenus(params) {
    return Service({
      url: 'menus',
      method: 'get',
      params
    })
  }