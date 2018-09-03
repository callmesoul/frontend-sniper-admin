// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHome,faTorah,faCog,faExclamationTriangle} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import store from './vuex/store'
import apolloProvider from './apolloProvider'
import filter from './filter'

library.add(faHome,faTorah,faCog,faExclamationTriangle)

Vue.component('icon', FontAwesomeIcon)

Vue.use(ElementUI);

Object.keys(filter).forEach(key => {///挂载过滤器
  Vue.filter(key, filter[key])
})


//路由拦截
router.beforeEach(async (to, from, next) => { //to:目标，from：来源
  if (to.meta.title) {//设置title
    document.title = to.meta.title
  }
  if(to.name==="login"){
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

/* eslint-disable no-new */
new Vue({
  el: '#app',
  provide: apolloProvider.provide(),
  router,
  store,
  components: { App },
  template: '<App/>'
})
