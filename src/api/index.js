import axios from 'axios'
import config from '../utils/config'
import store from '../vuex/store'
import router from '../router'
import {Message} from 'element-ui'

axios.defaults.baseURL = config.service();
axios.interceptors.request.use(
  config => {
    if (store.state.auth.token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers['token'] = store.state.auth.token;
    }
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
    if(error.response.status === 400){
      debugger;
      Message.error(error.response.data.msg);
      return Promise.reject(error.response.data);  // 返回接口返回的错误信息
    }else{
      return Promise.reject(error);  // 返回接口返回的错误信息
    }
  }
);

let set= (apiName)=> {
  let _api={
    index: (params) =>{
      return axios.get(`/api/${apiName}`,{params:params});
    },
    show: (id) =>{
      return axios.get(`/api/${apiName}/${id}`);
    },
    create: (params) =>{
      return axios.post(`/api/${apiName}`,params);
    },
    destroy: (id) =>{
      return axios.delete(`/api/${apiName}/${id}`);
    },
    update: (params) =>{
      return axios.put(`/api/${apiName}/${params.id}`,params);
    },
  };
  return _api;
};


let api={
  login: (params) =>{
    return axios.post("/login",params);
  },
  register: (params) =>{
    return axios.post("/register",params);
  },
  error:set('errors'),
  email:set('emails'),
  app:set('apps'),
};

export default api;
