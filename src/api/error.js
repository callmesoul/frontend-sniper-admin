import axios from "axios";


export default {
  index: (params) =>{
    console.log(this);
    return axios.get("/api/errors",params);
  },
  show: (id) =>{
    return axios.get(`/api/errors/${id}`);
  },
  create: (params) =>{
    return axios.post(`/api/errors`,params);
  },
  destroy: (id) =>{
    return axios.delete(`/api/errors/${id}`);
  },
  update: (params) =>{
    return axios.put(`/api/errors/${params.id}`,params);
  },
}
