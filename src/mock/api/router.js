var dataList = [
    { "ParentId": 0, "Path": "department", "Name": "组织机构", "Title": "部门管理", "PermissionCode": "department.view", "Sort": 1, "Component": "department", "ComponentPath": "system/department", "ApplicationId": 5, "Description": "部门查看", "Id": 5 },
    { "ParentId": 0, "Path": "role", "Name": "角色管理", "Title": "", "PermissionCode": "role.view", "Sort": 1, "Component": "role", "ComponentPath": "system/role", "ApplicationId": 5, "Description": "系统角色查看", "Id": 6 },
    { "ParentId": 0, "Path": "user", "Name": "用户管理", "Title": "", "PermissionCode": "user.view", "Sort": 3, "Component": "user", "ComponentPath": "system/user", "ApplicationId": 5, "Description": null, "Id": 7 },
    { "ParentId": 0, "Path": "router", "Name": "路由管理", "Title": "", "PermissionCode": "router.view", "Sort": 4, "Component": "router", "ComponentPath": "system/router", "ApplicationId": 5, "Description": null, "Id": 8 },
    { "ParentId": 0, "Path": "menu", "Name": "功能菜单管理", "Title": "", "PermissionCode": "menu.view", "Sort": 5, "Component": "menu", "ComponentPath": "system/menu", "ApplicationId": 5, "Description": null, "Id": 9 },
    { "ParentId": 0, "Path": "application", "Name": "应用管理", "Title": "", "PermissionCode": "application.view", "Sort": 6, "Component": "application", "ComponentPath": "system/application", "ApplicationId": 5, "Description": null, "Id": 10 }
];
export default [
    {
        path: '/system/router/getList',
        method: 'get',
        handle: {
            "OK": true,
            "Url": "",
            "IsMobile": false,
            "ObjectData": {
                "total": 10,
                "rows": dataList
            }, 
            "Message": "操作成功！", 
            "ErrList": [], 
            "ErrCode": 200
        }
    },
    {
        path: '/system/router/getAll',
        method: 'get',
        handle: {
            "OK": true,
            "Url": "",
            "IsMobile": false,
            "ObjectData": {
                "total": 10,
                "rows": dataList
            }, 
            "Message": "操作成功！", 
            "ErrList": [], 
            "ErrCode": 200
        }
    }
]
