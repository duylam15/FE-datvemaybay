import axios from 'axios';


const REST_API_BASE_URL = 'http://localhost:8080/admin/sanbay'

export const dataSanBay = () => axios.get(REST_API_BASE_URL + "/getAllAirport");

export const dataSanBayById = (idSanBay) => axios.get(`${REST_API_BASE_URL}/getAirport/${idSanBay}`);

export const dataSanBayById1 = (idSanBay) => axios.get(`${REST_API_BASE_URL}/getAirport/${idSanBay}`);
