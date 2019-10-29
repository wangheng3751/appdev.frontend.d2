import request from '@/plugin/axios'

export function getList (query) {
  return request({
    url: '/system/router/getList',
    method: 'get',
    params: query
  })
}

export function getAll () {
  return request({
    url: '/system/router/getAll',
    method: 'get',
    params: {}
  })
}

export function createRouter (data) {
  return request({
    url: '/system/router/create',
    method: 'post',
    data
  })
}

export function updateRouter (data) {
  return request({
    url: '/system/router/update',
    method: 'post',
    data
  })
}

export function deleteRouter (id) {
  return request({
    url: '/system/router/delete',
    method: 'get',
    params: { id }
  })
}
