import { getUserPermissionInfo } from '@/api/user'
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)
import layoutHeaderAside from '@/layout/header-aside'
import menuHeader from '@/menu/header'
import menuAside from '@/menu/aside'
import { frameInRoutes } from '@/router/routes'
import router from '@/router'
import store from '@/store/index'

export default {
    namespaced: true,
    state: {
        isFetchPermissionInfo:false,
        //功能编码
        functions: [],
        //角色编码
        roles: [],
        //接口
        interfaces: {
            GET: [],
            POST: [],
            PUT: [],
            DELETE: []
        },
        //是否管理员
        isAdmin: false
    },
    mutations: {
        set(state, data) {
            state.isFetchPermissionInfo=true;
            state.functions = data.functions;
            state.roles = data.roles;
            state.isAdmin = data.isAdmin;
            state.interfaces = data.interfaces;
        }
    },
    actions: {
        load({ state, commit,dispatch }) {
            return new Promise(async resolve => {
                let permissionMenu, permissionRouter = [], routersConfig = [];

                let permission = {
                    functions: [],
                    roles: [],
                    isAdmin: false
                }

                const formatRoutesByComponentPath = function (routes) {
                    routes.forEach(route => {
                        route.component = _import(route.componentPath)
                        if (route.children && route.children.length > 0) {
                            formatRoutesByComponentPath(route.children);
                        }
                    })
                }

                try {
                    let userPermissionInfo = await getUserPermissionInfo()
                    permissionMenu = userPermissionInfo.accessMenus
                    permissionRouter = userPermissionInfo.accessRouters
                    permission.functions = userPermissionInfo.userPermissions
                    permission.roles = userPermissionInfo.userRoles
                    //permission.interfaces = util.formatInterfaces(userPermissionInfo.accessInterfaces)
                    permission.isAdmin = userPermissionInfo.isAdmin
                } catch (ex) {
                    console.log(ex)
                }

                if (!permissionRouter || permissionRouter.length == 0) {
                    await Promise.resolve();
                    return;
                }
                formatRoutesByComponentPath(permissionRouter);
                //取默认路由 目前取路由第一个 之后考虑做成配置
                let defaultRouter = permissionRouter[0];
                routersConfig = [
                    {
                        path: '/',
                        redirect: { name: "index" },
                        component: layoutHeaderAside,
                        children: [{
                            path: 'index',
                            name: 'index',
                            redirect: { name:defaultRouter.name  },
                            meta: {
                                auth: true
                            },
                            component: _import(defaultRouter.componentPath)
                        },
                        ...permissionRouter,
                        ...frameInRoutes
                        ]
                    }];
                let allMenuAside = [...menuAside, ...permissionMenu]
                let allMenuHeader = [...menuHeader, ...permissionMenu]
                //动态添加路由
                router.addRoutes(routersConfig);
                // 处理路由 得到每一级的路由设置
                store.commit('d2admin/page/init', [...routersConfig])
                // 设置顶栏菜单
                store.commit('d2admin/menu/headerSet', allMenuHeader)
                // 设置侧边栏菜单
                store.commit('d2admin/menu/asideSet', allMenuAside)
                // 初始化菜单搜索功能
                store.commit('d2admin/search/init', allMenuHeader)
                // 设置权限信息
                commit('set', permission)
                // 加载上次退出时的多页列表
                await dispatch('d2admin/page/openedLoad',null, { root: true })
                resolve()
            })
        }
    }
}