import request from '@/plugin/axios'

export function getDeptTree () {
  return request({
    url: '/system/department/getDeptTree',
    method: 'get',
    params: {}
  })
}

export function getDeptSubordinates (deptId) {
  return request({
    url: '/system/department/GetDeptSubordinates',
    method: 'get',
    params: { deptId:deptId }
  })
}

export function setDeptType (data) {
  return request({
    url: '/system/department/setDeptType',
    method: 'post',
    params: data
  })
}

/**
 * 从钉钉同步机构和人员
 */
export function syncFromDingtalk () {
  return request({
    url: '/system/department/SyncFromDingtalk',
    method: 'post',
    params: { }
  })
}

/**
 * 获取有权限访问数据的部门
 */
export function getAuthorizedDepts () {
  return request({
    url: '/system/department/GetAuthorizedDepts',
    method: 'get',
    params: {}
  })
}

/**
 * 查询当前用户所在部门
 */
export function getCurrentUserDepts () {
  return request({
    url: '/system/department/GetCurrentUserDepts',
    method: 'get',
    params: {}
  })
}
