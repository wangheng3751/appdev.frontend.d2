var dataList = [
    { "Name": "系统配置", "Icon": "/images/control.png", "Description": "系统权限配置", "Status": 1, "Path": "http://www.baidu.com", "AppId": "302169912", "CorpId": "", "CorpSecret": "", "AppKey": "", "AppSecret": "", "WebAppId": "", "WebAppSecret": "", "IsPrimary": true, "LoginType": 1, "AccessToken": "", "AccessTokenExpired": "", "JsTicket": null, "JsTicketExpired": null, "Background": "#709af5", "Id": 5 },
    { "Name": "XXXX应用", "Icon": "/images/arrange.png", "Description": "XXXX应用", "Status": 1, "Path": "http://www.baidu.com", "AppId": null, "CorpId": null, "CorpSecret": null, "AppKey": null, "AppSecret": null, "WebAppId": null, "WebAppSecret": null, "IsPrimary": false, "LoginType": 0, "AccessToken": null, "AccessTokenExpired": null, "JsTicket": null, "JsTicketExpired": null, "Background": "#e4ae52", "Id": 9 },
    { "Name": "XXXX应用", "Icon": "/images/zhineng.png", "Description": "XXXX应用", "Status": 1, "Path": "http://www.baidu.com", "AppId": null, "CorpId": null, "CorpSecret": null, "AppKey": null, "AppSecret": null, "WebAppId": null, "WebAppSecret": null, "IsPrimary": false, "LoginType": 0, "AccessToken": null, "AccessTokenExpired": null, "JsTicket": null, "JsTicketExpired": null, "Background": "#4dc499", "Id": 10 },
    { "Name": "XXXX应用", "Icon": "/images/jingqing.png", "Description": "XXXX应用", "Status": 1, "Path": "http://www.baidu.com", "AppId": null, "CorpId": null, "CorpSecret": null, "AppKey": null, "AppSecret": null, "WebAppId": null, "WebAppSecret": null, "IsPrimary": false, "LoginType": 0, "AccessToken": null, "AccessTokenExpired": null, "JsTicket": null, "JsTicketExpired": null, "Background": "#4c9ef6", "Id": 11 }
]

export default [
    {
        path: '/system/application/getList',
        method: 'get',
        handle: {
            "OK": true,
            "Url": "",
            "IsMobile": false,
            "ObjectData": {
                "total": 4,
                "rows": dataList
            },
            "Message": "操作成功！",
            "ErrList": [],
            "ErrCode": 200
        }
    },
    {
        path: '/system/application/getAll',
        method: 'get',
        handle: {
            "OK": true,
            "Url": "",
            "IsMobile": false,
            "ObjectData": {
                "total": 4,
                "rows": dataList
            },
            "Message": "操作成功！",
            "ErrList": [],
            "ErrCode": 200
        }
    }
]
