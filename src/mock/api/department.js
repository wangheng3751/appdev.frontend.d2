export default [
    {
        path: '/system/department/getDeptTree',
        method: 'get',
        handle: {
            "OK": true,
            "Url": "",
            "IsMobile": false,
            "ObjectData": [
                {
                    "id": "1",
                    "name": "XXXX公司",
                    "text": null,
                    "logo": null,
                    "leaf": false,
                    "type": 0,
                    "children": [
                        { "id": "66246233", "name": "第一分公司", "text": null, "logo": null, "leaf": false, "type": 0, "children": null, "deptType": 0, "hasPermission": false },
                        { "id": "66246229", "name": "第二分公司", "text": null, "logo": null, "leaf": false, "type": 0, "children": null, "deptType": 0, "hasPermission": false },
                        { "id": "66171177", "name": "第三分公司", "text": null, "logo": null, "leaf": false, "type": 0, "children": null, "deptType": 0, "hasPermission": false },
                        {
                            "id": "66693311", "name": "第四分公司", "text": null, "logo": null, "leaf": false, "type": 0, "children": [
                                { "id": "66589426", "name": "研发部", "text": null, "logo": null, "leaf": false, "type": 0, "children": null, "deptType": 0, "hasPermission": false },
                                { "id": "96136045", "name": "市场部", "text": null, "logo": null, "leaf": false, "type": 0, "children": null, "deptType": 0, "hasPermission": false }
                            ], "deptType": 0, "hasPermission": false
                        },
                        {
                            "id": "66592407", "name": "第五分公司", "text": null, "logo": null, "leaf": false, "type": 0,
                            "children": [
                                { "id": "66681373", "name": "研发部", "text": null, "logo": null, "leaf": false, "type": 0, "children": null, "deptType": 0, "hasPermission": false },
                                { "id": "96292065", "name": "市场部", "text": null, "logo": null, "leaf": false, "type": 0, "children": null, "deptType": 0, "hasPermission": false }
                            ], 
                            "deptType": 0, 
                            "hasPermission": false
                        },
                        { "id": "138159635", "name": "钉钉工程师", "text": null, "logo": null, "leaf": false, "type": 0, "children": null, "deptType": 0, "hasPermission": false }], "deptType": 1, "hasPermission": false
                }
            ],
            "Message": "操作成功！",
            "ErrList": [],
            "ErrCode": 200
        }
    }
]
