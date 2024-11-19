import axios from "../utils/axios-8080"

console.log("dang o nhan vien service");
const REST_API_BASE_URL = 'http://localhost:8080/admin/nhanvien'

export const dataNhanVien = () => axios.get(REST_API_BASE_URL + "/getallnhanvien");

export const dataNhanVienSorted = (sortField, sortOrder) => axios.get(`${REST_API_BASE_URL}/getallnhanviensorted?sortField=${sortField}&sortOrder=${sortOrder}`);

export const addNhanVien = (nhanvien) => axios.post(REST_API_BASE_URL + "/addnhanvien", nhanvien, {
  headers: {
    'Content-Type': 'application/json'
  }
});

export const editNhanVien = (idNhanVien, nhanvien) => axios.put(`${REST_API_BASE_URL}/updatenhanvien/${idNhanVien}`, nhanvien);

export const getNhanVienById = (idNhanVien) => axios.get(`${REST_API_BASE_URL}/getnhanvienbyid?id=${idNhanVien}`, idNhanVien);

export const getNhanVienBetween = (start, end) => axios.get(`${REST_API_BASE_URL}/getnhanvienbetween?start=${start}&end=${end}`);

export const getNhanVienByHoTen = (hoTen) => axios.get(`${REST_API_BASE_URL}/getnhanvienbyhoten?hoTen=${hoTen}`, hoTen);

export const getNhanVienByCCCD = (cccd) => axios.get(`${REST_API_BASE_URL}/getnhanvienbycccd?cccd=${cccd}`, cccd);

export const getNhanVienByEmail = (email) => axios.get(`${REST_API_BASE_URL}/getnhanvienbyemail?email=${email}`, email);

export const getNhanVienBySDT = (sdt) => axios.get(`${REST_API_BASE_URL}/getnhanvienbysodienthoai?sdt=${sdt}`, sdt);

export const filterNhanVien = (hoTen, email, sodienThoai, cccd, chucVuId) => axios.get(`${REST_API_BASE_URL}/filter?hoTen=${hoTen}&email=${email}&soDienThoai=${sodienThoai}&cccd=${cccd}&chucVuId=${chucVuId}`);