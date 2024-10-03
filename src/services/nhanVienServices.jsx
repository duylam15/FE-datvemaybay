import axios from 'axios';

console.log("dang o nhan vien service");
const REST_API_BASE_URL = 'http://localhost:8080/admin/nhanvien'

export const dataNhanVien =() => axios.get(REST_API_BASE_URL+"/getallnhanvien");

export const addNhanVien =(nhanvien) => axios.post(REST_API_BASE_URL + "/addnhanvien" , nhanvien);

export const editNhanVien = (idNhanVien, nhanvien) => axios.put(`${REST_API_BASE_URL}/updatenhanvien/${idNhanVien}`, nhanvien);

export const deleteNhanVien =(nhanvien) => axios.put(REST_API_BASE_URL + "/delete" , nhanvien);