import request from '@/plugin/axios'

export function getList (query) {
  return request({
    url: '/system/role/getList',
    method: 'get',
    params: query
  })
}

export function createRole (data) {
  return request({
    url: '/system/role/create',
    method: 'post',
    data
  })
}

export function updateRole (data) {
  return request({
    url: '/system/role/update',
    method: 'post',
    data
  })
}

export function deleteRole (id) {
  return request({
    url: '/system/role/delete',
    method: 'get',
    params: { id }
  })
}

export function addRoleMenus (data) {
  return request({
    url: '/system/role/AddRoleMenus',
    method: 'post',
    data
  })
}

export function removeRoleMenus (data) {
  return request({
    url: '/system/role/removeRoleMenus',
    method: 'post',
    data
  })
}

export function getRoleMenus (roleId) {
  return request({
    url: '/system/role/GetRoleMenus',
    method: 'get',
    params: { roleId }
  })
}