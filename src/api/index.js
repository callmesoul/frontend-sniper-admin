import axios from 'axios'



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
        store.dispatch({type: 'REMOVE_TOKEN'});
        alert(error.response.data.error);
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

if (process.env.NODE_ENV === 'development') {//测试域名
  // axios.defaults.baseURL = "http://172.18.16.232:8080";
  axios.defaults.baseURL = "http://127.0.0.1:7001";
} else {//正式域名
  // axios.defaults.baseURL = "http://192.168.1.150:81";
  axios.defaults.baseURL = "";
}

let api={
  login: (params) =>{
    return axios.post("/login",params);
  }
}

export default api;
