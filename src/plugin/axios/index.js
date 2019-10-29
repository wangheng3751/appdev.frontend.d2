import store from '@/store'
import axios from 'axios'
import { Message, Loading } from 'element-ui'
import util from '@/libs/util'
import router from '@/router'

let loadding = null;

// 创建一个错误
function errorCreate(msg) {
  const error = new Error(msg)
  errorLog(error)
  throw error
}

// 记录和显示错误
function errorLog(error) {
  // 添加到日志
  store.dispatch('d2admin/log/push', {
    message: '数据请求异常',
    type: 'danger',
    meta: {
      error
    }
  })
  // 打印到控制台
  if (process.env.NODE_ENV === 'development') {
    util.log.danger('>>>>>> Error >>>>>>')
    console.log(error)
  }
  // 显示提示
  Message({
    message: error.message,
    type: 'error',
    duration: 5 * 1000
  })
}

function closeLoadding() {
  if (loadding) {
    loadding.close();
    loadding = null;
  }
}

// 创建一个 axios 实例
const service = axios.create({
  baseURL: process.env.VUE_APP_API,
  timeout: 5000 // 请求超时时间
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    let whiteList = ['/auth/login', '/auth/getToken', '/auth/AutoLogin'];//匿名请求白名单
    !loadding && (loadding = Loading.service({ fullscreen: true, text: "加载中..." }));
    if (whiteList.indexOf(config.url) === -1) {
      // 在请求发送之前做一些处理
      const token = util.cookies.get('token')   
      if(!token){
        let retry = new Promise(async(resolve, reject) => {
          await store.dispatch('d2admin/account/dingLogin', null, { root: false });
          let refreshtoken = util.cookies.get('token')
          config.headers['Authorization'] = "Bearer " + refreshtoken
          resolve(config)
        });
        return retry
      }
      config.headers['Authorization'] = "Bearer " + token
    }

    return config
  },
  error => {
    closeLoadding();
    // 发送失败
    console.log(error)
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    closeLoadding();
    // dataAxios 是 axios 返回数据中的 data
    const dataAxios = response.data
    // 这个状态码是和后端约定的
    const code = dataAxios.OK;
    // 根据 code 进行判断
    if (code === undefined) {
      // 如果没有 code 代表这不是项目后端开发的接口 比如可能是 D2Admin 请求最新版本
      return dataAxios
    } else {
      // 有 code 代表这是一个后端接口 可以进行进一步的判断
      if (code) {
        return dataAxios.ObjectData;
      } else {
        if (dataAxios.ErrCode == 401) {
          let login = new Promise(async(resolve, reject) => {
            await store.dispatch('d2admin/account/dingLogin', null, { root: false });
            resolve();
          });
          return login;
        }
        else {
          errorCreate(`[ 接口请求错误 ] ${dataAxios.Message}: ${response.config.url}`);
          return null;
        }
      }
      /*
      switch (code) {
        case 0:
          // [ 示例 ] code === 0 代表没有错误
          return dataAxios.data
        case 'xxx':
          // [ 示例 ] 其它和后台约定的 code
          errorCreate(`[ code: xxx ] ${dataAxios.msg}: ${response.config.url}`)
          break
        default:
          // 不是正确的 code
          errorCreate(`${dataAxios.msg}: ${response.config.url}`)
          break
      }*/
    }
  },
  error => {
    closeLoadding();
    if (error && error.response) {
      switch (error.response.status) {
        case 400: error.message = '请求错误'; break
        case 401:
          error.message = '登陆信息已过期,请重新登陆!';
          setTimeout(() => {
            router.push({
              name: "login"
            });
          }, 1000);
          break
        case 403: error.message = '拒绝访问'; break
        case 404: error.message = `请求地址出错: ${error.response.config.url}`; break
        case 408: error.message = '请求超时'; break
        case 500: error.message = '服务器内部错误'; break
        case 501: error.message = '服务未实现'; break
        case 502: error.message = '网关错误'; break
        case 503: error.message = '服务不可用'; break
        case 504: error.message = '网关超时'; break
        case 505: error.message = 'HTTP版本不受支持'; break
        default: break
      }
    }
    errorLog(error)
    return Promise.reject(error)
  }
)

export default service
