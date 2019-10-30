# 基于d2admin 搭建的后台管理系统基础模板项目

## 页面效果图

![用户页面效果图](https://upload-images.jianshu.io/upload_images/9814928-b87c3f17a889815c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![角色权限配置页面效果图](https://upload-images.jianshu.io/upload_images/9814928-6d228963ae0cd0ae.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
## 改造说明
基于 【[d2 admin](https://github.com/d2-projects/d2-admin)】，适配目前项目情况完成以下改造：

- 1.将默认主题皮肤改为蓝色风格，左上角系统logo和名称分离；
- 2.加入权限控制，所有菜单和路由根据用户权限动态生成；每个页面下的可操作按钮根据权限实现显示与隐藏；
 > 权限控制参考【[wjkang/d2-admin-pm](https://github.com/wjkang/d2-admin-pm)】,感谢作者！
- 3.基于钉钉环境实现免登，实现token过期后自动登录，非钉钉环境则正常跳转到登录页登录；
- 4.加入系统管理配置模块，实现组织机构、角色管理、用户管理、路由管理、功能菜单管理等基础页面的CRUD机制；

## 思考与不足
- 1.权限控制只控制到菜单及按钮的级别，是否有必要再控制到接口级别？
> 本项目之所以只控制到按钮级别，是因为考虑到前端化的权限控制其实都是乏力的，跳过前端控制比较容易，权限真正的控制还得靠后台。

- 2.系统配置通用模块实际应用中很难通用，还得根据项目需求做出改动；
- 3.对于vuex的使用，是全面使用还是只用于管理全局性的状态比较好？
> 本项目倾向于后者，vuex只管理全局性状态，页面内部状态还是页面内自己管理。