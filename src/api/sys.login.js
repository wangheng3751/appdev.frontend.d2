import request from '@/plugin/axios'

export function AccountLogin (data) {
  return request({
    url: '/auth/login',
    method: 'post',
    params:data
  })
}

export function getToken () {
  return request({
    url: '/auth/getToken',
    method: 'get',
    params:{}
  })
}

export function autoLogin (code) {
  return request({
    url: '/auth/AutoLogin',
    method: 'post',
    params:{code}
  })
}