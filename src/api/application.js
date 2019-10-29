import request from '@/plugin/axios'

export function getList (query) {
  return request({
    url: '/system/application/getList',
    method: 'get',
    params: query
  })
}

export function getAll () {
    return request({
      url: '/system/application/getAll',
      method: 'get',
      params: {}
    })
}

export function createApplication (data) {
  return request({
    url: '/system/application/create',
    method: 'post',
    data
  })
}

export function updateApplication (data) {
  return request({
    url: '/system/application/update',
    method: 'post',
    data
  })
}

export function deleteApplication (id) {
  return request({
    url: '/system/application/delete',
    method: 'get',
    params: { id }
  })
}
