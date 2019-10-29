export default [
  {
    path: '/system/employee/getList',
    method: 'get',
    handle: {
      "OK": true,
      "code": 0,
      "Message": "正常",
      "count": 300,
      "ObjectData": {
        "rows|20": [
          {
            "remark": "@cparagraph()",
            "Phone": "15566458518",
            "HeadImg":"http://cdn.duitang.com/uploads/item/201403/14/20140314121112_2HEkw.thumb.700_0.jpeg",
            "UserName": "@name",
            "UserId|1-10": 0,
            "SparePhone":"15888888888",
            "Position|1": ['部门员工', '部门主管', '系统管理员'],
            "Departments": [{"Name":'研发部'}],
            "IdCard":"53026124584512xxxx",
            "UpdateTime": "@datetime('yyyy-MM-dd')",
            "status|1-4": 0
          }
        ],
        "total":100
      }
    }
  },
  {
    path: '/auth/GetUserPermissionInfo',
    method: 'get',
    handle: {
      "OK": true,
      "Url": "",
      "IsMobile": false,
      "ObjectData": {
        "userRoles": ["admin", "default"],
        "accessMenus": [
          {
            "id": 6, "title": "系统管理", "path": "/department", "icon": "cog", "children": [
              { "id": 1, "title": "组织机构", "path": "/department", "icon": "sitemap", "children": null },
              { "id": 5, "title": "角色管理", "path": "/role", "icon": "group", "children": null },
              { "id": 7, "title": "用户管理", "path": "/user", "icon": "user-o", "children": null },
              { "id": 8, "title": "路由管理", "path": "/router", "icon": "code-fork", "children": null },
              { "id": 9, "title": "功能菜单管理", "path": "/menu", "icon": "list", "children": null },
              { "id": 10, "title": "应用管理", "path": "/application", "icon": "key", "children": null }
            ]
          }],
        "userPermissions": ["department.view", "department.create", "role.view", "department.view", "application.view", "menu.view", "department.delete", "user.view", "role.create", "router.create", "router.edit", "router.view"],
        "accessRouters": [
          { "path": "department", "name": "department", "componentPath": "system/department", "meta": { "title": "组织机构", "cache": true }, "children": null },
          { "path": "role", "name": "role", "componentPath": "system/role", "meta": { "title": "角色管理", "cache": true }, "children": null },
          { "path": "application", "name": "application", "componentPath": "system/application", "meta": { "title": "应用管理", "cache": true }, "children": null },
          { "path": "menu", "name": "menu", "componentPath": "system/menu", "meta": { "title": "功能菜单管理", "cache": true }, "children": null },
          { "path": "user", "name": "user", "componentPath": "system/user", "meta": { "title": "用户管理", "cache": true }, "children": null },
          { "path": "router", "name": "router", "componentPath": "system/router", "meta": { "title": "路由管理", "cache": true }, "children": null }],
        "isAdmin": true
      },
      "Message": "操作成功！",
      "ErrList": [],
      "ErrCode": 200
    }
  }
]
