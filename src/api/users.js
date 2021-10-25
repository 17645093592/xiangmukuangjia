import Service from '../utils/http1'
// 获取用户列表
export function getUsers(params) {
  return Service({
    url: 'users',
    method: 'get',
    params
  })
}
// 新增用户
export function addUsers(data) {
  return Service({
    url: 'users',
    method: 'post',
    data
  })
}
// 修改用户状态
export function UpdateUsers(data) {
  return Service({
    url: `users/${data.uId}/state/${data.type}`,
    method: 'put',
    data
  })
}
//   根据 ID 查询用户信息
export function getOneUsers(data) {

  return Service({
    url: `users/${data.id}`,
    method: 'get',
    data
  })
}
// 编辑用户提交
export function saveOneUsers(data) {
  return Service({
    url: `users/${data.id}`,
    method: 'put',
    data
  })
}
// 分配用户角色
export function saveUsersRoles(data) {
    return Service({
      url: `users/${data.id}/role`,
      method: 'put',
      data
    })
  }
//   删除用户
export function DeleteUsers(data) {

  return Service({
    url: `users/${data.id}`,
    method: 'delete',
    data
  })
}
