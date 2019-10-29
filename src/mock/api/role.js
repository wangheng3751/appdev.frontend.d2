export default [
    {
      path: '/system/role/getList',
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
              "Name": "@name",
              "Id|1-10": 0,
              "Code":"test-code",
              "Description":"这是一个角色的描述这是一个角色的描述",
              "UpdateTime": "@datetime('yyyy-MM-dd')",
              "Status|1-4": 0
            }
          ],
          "total":10
        }
      }
    }
  ]
  