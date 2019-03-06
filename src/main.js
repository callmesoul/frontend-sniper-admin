// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import './assets/style/element/index.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHome,faTorah,faCog,faExclamationTriangle,faEnvelope,faPenSquare,faBellSlash,faBell,faTrashAlt} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import  api from '@/api';




import store from './vuex/store'
import filter from './filter'


library.add(faHome,faTorah,faCog,faExclamationTriangle,faEnvelope,faPenSquare,faBellSlash,faBell,faTrashAlt);

Vue.component('icon', FontAwesomeIcon);

Vue.use(ElementUI);

Object.keys(filter).forEach(key => {///挂载过滤器
  Vue.filter(key, filter[key])
});

Vue.config.errorHandler = function (err, vm, info) {
  let { message, name, script, line, column, stack } = err;
  // 在vue提供的error对象中，script、line、column目前是空的。但这些信息其实在错误栈信息里可以看到。
  script = !_.isUndefined(script) ? script : '';
  line = !_.isUndefined(line) ? line : 0;
  column = !_.isUndefined(column) ? line : 0;
  // 解析错误栈信息
  let stackStr = stack ? stack.toString() : `${name}:${message}`;

  console.log('------------------');
  console.log(stackStr);

};
//路由拦截
router.beforeEach(async (to, from, next) => { //to:目标，from：来源
  if (to.meta.title) {//设置title
    document.title = to.meta.title
  }
  if(to.name==="login" || to.name==="register"){
    next();
  }else {
    if(store.state.auth.token){
      next();
    }else{
      next({path:"/login"});
    }
  }
});

Vue.config.productionTip = false
Vue.prototype.$api=api;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
