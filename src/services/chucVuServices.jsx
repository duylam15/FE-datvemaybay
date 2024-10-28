import axios from "axios";


const REST_API_BASE_URL = 'http://localhost:8080'

export const dataChucVu = () => axios.get(`${REST_API_BASE_URL}/admin/chucvu/getallchucvu`);

export const dataChucVuById = (id) => axios.get(`${REST_API_BASE_URL}/admin/chucvu/getchucvubyid?id=${id}`);