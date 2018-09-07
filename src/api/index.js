import axios from 'axios'
import config from '../utils/config'
import store from '../vuex/store'
import router from '../router'
import {Message} from 'element-ui'
axios.defaults.baseURL = config.service();
axios.interceptors.request.use(
  config => {
    return config;
  }
);

axios.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    if (error.response) {
      if (error.response.status === 403 || error.response.status === 401) {
        store.commit('LOGOUT_USER');
        Message.error(error.response.data.message);
        if(router.app.$route.name !=='login' &&  router.app.$route.name !=='register'){
          router.push({name:'login'});
        }
      }
    }
    console.log(error)
    if(error.response && error.response.data){
      return Promise.reject(error.response.data);  // 返回接口返回的错误信息
    }else{
      return Promise.reject(error);  // 返回接口返回的错误信息
    }
  }
);



let api={
  login: (params) =>{
    return axios.post("/login",params);
  },
  register: (params) =>{
    return axios.post("/register",params);
  }
}

export default api;
