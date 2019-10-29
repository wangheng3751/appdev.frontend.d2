export default [
    {
        path: '/system/menu/getAll',
        method: 'get',
        handle: {
            "OK": true,
            "Url": "",
            "IsMobile": false,
            "ObjectData": {
                "total": 2,
                "rows": [
                    {
                        "Children": [
                            {
                                "Children": [
                                    { "Children": null, "HasChildren": false, "ParentId": 1, "Path": "", "Title": "添加", "Icon": "el-icon-plus", "Sort": 0, "Type": 1, "PermissionCode": "department.create", "ApplicationId": 5, "RouterId": 0, "Id": 2 },
                                    { "Children": null, "HasChildren": false, "ParentId": 1, "Path": "", "Title": "删除", "Icon": "el-icon-delete", "Sort": 0, "Type": 1, "PermissionCode": "department.delete", "ApplicationId": 5, "RouterId": 0, "Id": 3 },
                                    { "Children": null, "HasChildren": false, "ParentId": 1, "Path": "", "Title": "编辑", "Icon": "el-icon-edit", "Sort": 0, "Type": 1, "PermissionCode": "department.edit", "ApplicationId": 5, "RouterId": 0, "Id": 19 },
                                    { "Children": null, "HasChildren": false, "ParentId": 1, "Path": "", "Title": "从钉钉同步", "Icon": "el-icon-refresh", "Sort": 4, "Type": 1, "PermissionCode": "department.sync", "ApplicationId": 5, "RouterId": 0, "Id": 41 }],
                                "HasChildren": false, "ParentId": 6, "Path": "/department", "Title": "组织机构", "Icon": "sitemap", "Sort": 0, "Type": 0, "PermissionCode": "department.view", "ApplicationId": 5, "RouterId": 5, "Id": 1
                            }, {
                                "Children": [{ "Children": null, "HasChildren": false, "ParentId": 5, "Path": "", "Title": "添加", "Icon": "el-icon-plus", "Sort": 0, "Type": 1, "PermissionCode": "role.create", "ApplicationId": 5, "RouterId": 0, "Id": 11 },
                                { "Children": null, "HasChildren": false, "ParentId": 5, "Path": "", "Title": "编辑", "Icon": "el-icon-edit", "Sort": 1, "Type": 1, "PermissionCode": "role.edit", "ApplicationId": 5, "RouterId": 0, "Id": 20 },
                                { "Children": null, "HasChildren": false, "ParentId": 5, "Path": "", "Title": "删除", "Icon": "el-icon-delete", "Sort": 3, "Type": 1, "PermissionCode": "role.delete", "ApplicationId": 5, "RouterId": 0, "Id": 27 },
                                { "Children": null, "HasChildren": false, "ParentId": 5, "Path": "", "Title": "设置权限", "Icon": "el-icon-setting", "Sort": 4, "Type": 1, "PermissionCode": "role.permission.cfg", "ApplicationId": 5, "RouterId": 0, "Id": 42 }],
                                "HasChildren": false, "ParentId": 6, "Path": "/role", "Title": "角色管理", "Icon": "group", "Sort": 2, "Type": 0, "PermissionCode": "role.view", "ApplicationId": 5, "RouterId": 6, "Id": 5
                            },
                            {
                                "Children": [{ "Children": null, "HasChildren": false, "ParentId": 7, "Path": "", "Title": "编辑", "Icon": "el-icon-edit", "Sort": 0, "Type": 1, "PermissionCode": "user.edit", "ApplicationId": 5, "RouterId": 0, "Id": 21 },
                                { "Children": null, "HasChildren": false, "ParentId": 7, "Path": "", "Title": "添加", "Icon": "el-icon-plus", "Sort": 0, "Type": 1, "PermissionCode": "user.create", "ApplicationId": 5, "RouterId": 0, "Id": 28 },
                                { "Children": null, "HasChildren": false, "ParentId": 7, "Path": "", "Title": "删除", "Icon": "el-icon-delete", "Sort": 3, "Type": 1, "PermissionCode": "user.delete", "ApplicationId": 5, "RouterId": 0, "Id": 29 },
                                { "Children": null, "HasChildren": false, "ParentId": 7, "Path": "", "Title": "设置角色", "Icon": "el-icon-s-check", "Sort": 3, "Type": 1, "PermissionCode": "user.role.cfg", "ApplicationId": 5, "RouterId": 0, "Id": 43 },
                                { "Children": null, "HasChildren": false, "ParentId": 7, "Path": "", "Title": "数据权限设置", "Icon": "el-icon-key", "Sort": 4, "Type": 1, "PermissionCode": "user.datapermission.cfg", "ApplicationId": 5, "RouterId": 0, "Id": 44 }],
                                "HasChildren": false, "ParentId": 6, "Path": "/user", "Title": "用户管理", "Icon": "user-o", "Sort": 5, "Type": 0, "PermissionCode": "user.view", "ApplicationId": 5, "RouterId": 7, "Id": 7
                            },
                            {
                                "Children": [{ "Children": null, "HasChildren": false, "ParentId": 8, "Path": "", "Title": "添加", "Icon": "el-icon-plus", "Sort": 2, "Type": 1, "PermissionCode": "router.create", "ApplicationId": 5, "RouterId": 0, "Id": 12 },
                                { "Children": null, "HasChildren": false, "ParentId": 8, "Path": "", "Title": "编辑", "Icon": "el-icon-edit", "Sort": 0, "Type": 1, "PermissionCode": "router.edit", "ApplicationId": 5, "RouterId": 0, "Id": 13 },
                                { "Children": null, "HasChildren": false, "ParentId": 8, "Path": "", "Title": "删除", "Icon": "el-icon-delete", "Sort": 3, "Type": 1, "PermissionCode": "router.delete", "ApplicationId": 5, "RouterId": 0, "Id": 30 }
                                ], "HasChildren": false, "ParentId": 6, "Path": "/router", "Title": "路由管理", "Icon": "code-fork", "Sort": 10, "Type": 0, "PermissionCode": "router.view", "ApplicationId": 5, "RouterId": 8, "Id": 8
                            }, {
                                "Children": [{ "Children": null, "HasChildren": false, "ParentId": 9, "Path": "", "Title": "编辑", "Icon": "el-icon-edit", "Sort": 0, "Type": 1, "PermissionCode": "menu.edit", "ApplicationId": 5, "RouterId": 0, "Id": 22 },
                                { "Children": null, "HasChildren": false, "ParentId": 9, "Path": "", "Title": "删除", "Icon": "el-icon-delete", "Sort": 3, "Type": 1, "PermissionCode": "menu.delete", "ApplicationId": 5, "RouterId": 0, "Id": 31 },
                                { "Children": null, "HasChildren": false, "ParentId": 9, "Path": "", "Title": "添加", "Icon": "el-icon-plus", "Sort": 0, "Type": 1, "PermissionCode": "menu.create", "ApplicationId": 5, "RouterId": 0, "Id": 36 },
                                { "Children": null, "HasChildren": false, "ParentId": 9, "Path": "", "Title": "添加子功能", "Icon": "el-icon-plus", "Sort": 1, "Type": 1, "PermissionCode": "menu.createchild", "ApplicationId": 5, "RouterId": 0, "Id": 45 }],
                                "HasChildren": false, "ParentId": 6, "Path": "/menu", "Title": "功能菜单管理", "Icon": "list", "Sort": 15, "Type": 0, "PermissionCode": "menu.view", "ApplicationId": 5, "RouterId": 9, "Id": 9
                            },
                            {
                                "Children": [
                                    { "Children": null, "HasChildren": false, "ParentId": 10, "Path": "", "Title": "编辑", "Icon": "el-icon-edit", "Sort": 1, "Type": 1, "PermissionCode": "application.edit", "ApplicationId": 5, "RouterId": 0, "Id": 23 },
                                    { "Children": null, "HasChildren": false, "ParentId": 10, "Path": "", "Title": "删除", "Icon": "el-icon-delete", "Sort": 3, "Type": 1, "PermissionCode": "application.delete", "ApplicationId": 5, "RouterId": 0, "Id": 32 },
                                    { "Children": null, "HasChildren": false, "ParentId": 10, "Path": "", "Title": "添加", "Icon": "el-icon-plus", "Sort": 0, "Type": 1, "PermissionCode": "application.create", "ApplicationId": 5, "RouterId": 0, "Id": 37 }
                                ], 
                                "HasChildren": false, 
                                "ParentId": 6, 
                                "Path": "/application", 
                                "Title": "应用管理", 
                                "Icon": "key", 
                                "Sort": 20, 
                                "Type": 0,
                                "PermissionCode": "application.view", 
                                "ApplicationId": 5, 
                                "RouterId": 10, 
                                "Id": 10
                            }],
                        "HasChildren": false,
                        "ParentId": 0,
                        "Path": "/department",
                        "Title": "系统管理",
                        "Icon": "cog",
                        "Sort": 1,
                        "Type": 0,
                        "PermissionCode": "department.view",
                        "ApplicationId": 5,
                        "RouterId": 5,
                        "Id": 6
                    }]
            },
            "Message": "操作成功！",
            "ErrList": [],
            "ErrCode": 200
        }
    }
]
