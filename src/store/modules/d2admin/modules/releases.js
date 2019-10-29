import util from '@/libs/util.js'

export default {
  namespaced: true,
  mutations: {
    /**
     * @description 显示版本信息
     * @param {Object} state state
     */
    versionShow () {
      util.log.capsule('昆明迪蒙传媒科技有限公司-智慧勤务管理系统', `v${process.env.VUE_APP_VERSION}`)
    }
  }
}
