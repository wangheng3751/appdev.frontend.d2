import request from '@/plugin/axios'
import util from '@/libs/util'

export function getList (query) {
  return request({
    url: '/system/employee/getList',
    method: 'get',
    params: query
  })
}

export function addEmployeeRole (data) {
  return request({
    url: '/system/employee/AddEmployeeRole',
    method: 'post',
    data
  })
}

export function removeEmployeeRole (data) {
  return request({
    url: '/system/employee/removeEmployeeRole',
    method: 'post',
    data
  })
}

export function getEmployeeRoles (query) {
  return request({
    url: '/system/employee/GetEmployeeRoles',
    method: 'get',
    params: query
  })
}

export function getUserPermissionInfo(){
  var appId=util.getQueryString("appid");
  return request({
    url: '/auth/GetUserPermissionInfo',
    method: 'get',
    params:{ appId:appId||0}
  })
}

export function addUserDeptDataPermission (data) {
  return request({
    url: '/system/employee/AddUserDeptDataPermission',
    method: 'post',
    params:data
  })
}

export function removeUserDeptDataPermission (data) {
  return request({
    url: '/system/employee/removeUserDeptDataPermission',
    method: 'post',
    params:data
  })
}

export function getUserDeptDataPermissions (query) {
  return request({
    url: '/system/employee/GetUserDeptDataPermissions',
    method: 'get',
    params: query
  })
}

/**
 * 获取员工信息
 * @param {用户ID} userId 
 */
export function getEmployee (userId) {
  return request({
    url: '/system/employee/getEmployee',
    method: 'get',
    params: { userId }
  })
}

/**
 * 修改员工信息
 * @param {*} data 
 */
export function updateEmployee (data) {
  return request({
    url: '/system/employee/updateEmployee',
    method: 'post',
    data
  })
}