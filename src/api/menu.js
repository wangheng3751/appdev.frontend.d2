import request from '@/plugin/axios'

export function getAll (query) {
  return request({
    url: '/system/menu/getAll',
    method: 'get',
    params: query
  })
}

export function createMenu (data) {
  return request({
    url: '/system/menu/create',
    method: 'post',
    data
  })
}

export function updateMenu (data) {
  return request({
    url: '/system/menu/update',
    method: 'post',
    data
  })
}

export function deleteMenu (id) {
  return request({
    url: '/system/menu/delete',
    method: 'get',
    params: { id }
  })
}
