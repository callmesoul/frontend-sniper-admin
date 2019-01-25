import axios from "axios";


export default {
  index: (params) =>{
    return axios.get("/api/emails",params);
  },
  show: (id) =>{
    return axios.get(`/api/emails/${id}`);
  },
  create: (params) =>{
    return axios.post(`/api/emails`,params);
  },
  destroy: (id) =>{
    return axios.delete(`/api/emails/${id}`);
  },
  update: (params) =>{
    return axios.put(`/api/emails/${params.id}`,params);
  },
}
