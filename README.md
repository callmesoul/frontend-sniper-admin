![logo](https://github.com/callmesoul/frontend-sniper-admin/blob/master/static/frontend-sniper.png)

# frontend-sniper-admin
### 前端错误监控系统后台管理端
其实线上已经有很多监控系统了，例如fundebug。试用了一下还是挺不错的。 可惜都是收费的，免费的只能创建一个项目，收费也不便宜。 对于一些小公司来说很难花钱去搞，而且对小公司来说功能也不需要太复杂。 一些js的报错和接口报错就可以大大加快bug的修复，和预知bug。（当上级和测试都还没发现时） 所以我还是写这么个系统，是从自身需求出发吧。功能可以慢慢完善。

现在初期只实现了简单的js和接口资源报错。后期会加入UA和用户等信息以完善错误信息追踪错误。 对服务端还是新手所以代码质量....graphql也是试手。 但好在错误监控系统一般内部人使用，独立不影响线上项目和用户。所以大胆地使用吧。

##demo
[demo](http://frontend-sniper-admin.callmesoul.cn)
username:test
password:test


## 项目集

- 服务端   [frontend-sniper-server](https://github.com/callmesoul/frontend-sniper-server)
- 管理后台 [frontend-sniper-admin](https://github.com/callmesoul/frontend-sniper-admin)
- 错误探针 [frontend-sniper-explorer](https://github.com/callmesoul/frontend-sniper-explorer)






## todo

- [x] 支持vue
- [x] 邮件通知（新错误报错，旧错误5n次发邮件报错）
- [ ] 添加UA信息
- [ ] 添加用户信息
- [ ] 记录用户行为
- [ ] 手动上传报错


> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
