// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

/**
 * 在主框架内显示
 */
const frameIn = [
  {
    path: 'department',
    name: 'department',
    meta: {
      title: '组织机构',
      auth: true
    },
    component: _import('system/department')
  },
  {
    path: 'user',
    name: 'user',
    meta: {
      title: '用户管理',
      auth: true
    },
    component: _import('system/user')
  },
  {
    path: 'role',
    name: 'role',
    meta: {
      title: '角色管理',
      auth: true
    },
    component: _import('system/role')
  },
  {
    path: 'router',
    name: 'router',
    meta: {
      title: '路由管理',
      auth: true
    },
    component: _import('system/router')
  },
  {
    path: 'menu',
    name: 'menu',
    meta: {
      title: '菜单管理',
      auth: true
    },
    component: _import('system/menu')
  },
  {
    path: 'application',
    name: 'application',
    meta: {
      title: '应用管理',
      auth: true
    },
    component: _import('system/application')
  },
  {
    path: 'log',
    name: 'log',
    meta: {
      title: '前端日志',
      auth: true
    },
    component: _import('system/log')
  },
  // 刷新页面 必须保留
  {
    path: 'refresh',
    name: 'refresh',
    hidden: true,
    component: _import('system/function/refresh')
  },
  // 页面重定向 必须保留
  {
    path: 'redirect/:route*',
    name: 'redirect',
    hidden: true,
    component: _import('system/function/redirect')
  }
]

/**
 * 在主框架之外显示
 */
const frameOut = [
  // 登录
  {
    path: '/login',
    name: 'login',
    component: _import('system/login')
  }
]

/**
 * 错误页面
 */
const errorPage = [
  {
    path: '*',
    name: '404',
    component: _import('system/error/404')
  }
]

// 导出需要显示菜单的
export const frameInRoutes = frameIn

// 重新组织后导出
export default [
  //...frameIn,
  ...frameOut,
  ...errorPage
]
