import axios from 'axios';


const REST_API_BASE_URL = 'http://localhost:8080'

export const dataMayBay =() => axios.get(REST_API_BASE_URL+"/getAllPlane");

export const dataMayBayById = (id) => axios.get(`${REST_API_BASE_URL}/getPlane/${id}`);