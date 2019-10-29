const userDB = [
  { username: 'admin', password: 'admin', uuid: 'admin-uuid', name: '管理员' },
  { username: 'editor', password: 'editor', uuid: 'editor-uuid', name: '编辑' },
  { username: 'user1', password: 'user1', uuid: 'user1-uuid', name: '用户1' }
]

export default [
  {
    path: '/auth/login',
    method: 'post',
    handle ( body ) {
      const user = userDB.find(e => e.username === body.params.username && e.password === body.params.password)
      if (user) {
        return {
          OK:true,
          code: 0,
          Message: '登录成功',
          ObjectData: {
            ...user,
            token: '8dfhassad0asdjwoeiruty'
          }
        }
      } else {
        return {
          OK:false,
          code: 401,
          Message: '用户名或密码错误',
          ObjectData: {}
        }
      }
    }
  }
]
