import axios from 'axios';


const REST_API_BASE_URL = 'http://localhost:8080/admin/cong'

export const dataCong =() => axios.get(REST_API_BASE_URL+"/getallcong");

export const dataCongBySanBay = (sanBay) => axios.get(`${REST_API_BASE_URL}/getcongbysanbay/${sanBay}`);

export const getCongById = (idCong) => axios.get(`${REST_API_BASE_URL}/getcongbyid/${idCong}`);
