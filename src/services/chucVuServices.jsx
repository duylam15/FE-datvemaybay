import axios from "axios";


const REST_API_BASE_URL = 'http://localhost:8080'

export const dataChucVu = () => axios.get(`${REST_API_BASE_URL}/admin/chucvu/getallchucvu`);

export const dataChucVuById = (id) => axios.get(`${REST_API_BASE_URL}/admin/chucvu/getchucvubyid?id=${id}`);

export const addChucVuService = (chucVu) => axios.post(`${REST_API_BASE_URL}/admin/chucvu/addchucvu`, chucVu);

export const updateChucVuService = (idChucVu, chucVu) => axios.put(`${REST_API_BASE_URL}/admin/chucvu/updatechucvu/${idChucVu}`, chucVu);

export const filterChucVuService = (ten, trangThaiActive) => axios.get(`${REST_API_BASE_URL}/admin/chucvu/filter?ten=${ten}&trangThaiActive=${trangThaiActive}`);
