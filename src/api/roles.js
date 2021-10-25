import Service from '../utils/http1'
// 获取角色列表
export function getRoles(params) {
  return Service({
    url: 'roles',
    method: 'get',
    params
  })
}
// 获取权限tree列表
export function getRightsList(params) {
  return Service({
    url: 'rights/tree',
    method: 'get',
    params
  })
}
// 添加角色
export function addRoles(data) {
  return Service({
    url: 'roles',
    method: 'post',
    data
  })
}
// 角色授权
export function saveRightsList(data) {
  return Service({
    url: `roles/${data.roleId}/rights`,
    method: 'post',
    data
  })
}
// 编辑角色
export function updataRoles(data) {
  console.log(data);
  return Service({
    url: `roles/${data.id}`,
    method: 'put',
    data
  })
}
// 删除角色
export function deleRoles(params) {
  console.log(params);
  return Service({
    url: `roles/${params}`,
    method: 'delete',
    // params
  })
}
// 删除角色指定权限
export function deleOneRoles(params) {
  console.log(params);
  return Service({
    url: `roles/${params.roleId}/rights/${params.rightId}`,
    method: 'delete',
    // params
  })
}