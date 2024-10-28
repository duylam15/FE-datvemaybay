import axios from 'axios';


const REST_API_BASE_URL = 'http://localhost:8080'

export const dataTuyenBay = () => axios.get(`${REST_API_BASE_URL}/getAllRoutes`);
