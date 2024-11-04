import axios from 'axios';


const REST_API_BASE_URL = 'http://localhost:8080/admin/maybay'

export const dataMayBay = () => axios.get(REST_API_BASE_URL + "/getAllPlane");

export const dataMayBayById = (id) => axios.get(`${REST_API_BASE_URL}/getPlane/${id}`);

export const editMayBay = (idMB, mayBay) => axios.put(`${REST_API_BASE_URL}/updatePlane/${idMB}`, mayBay, {
  headers: {
    'Content-Type': 'application/json'
  }
});