import axios from 'axios';


const REST_API_BASE_URL = 'http://localhost:8080/admin/chuyenbay'

export const dataChuyenBay = () => axios.get(REST_API_BASE_URL + "/getallchuyenbay");

export const dataChuyenBaySorted = (sortField, sortOrder) => axios.get(`${REST_API_BASE_URL}/getallchuyenbaysorted?sortField=${sortField}&sortOrder=${sortOrder}`);

export const addChuyenbay = (ChuyenBay) => axios.post(`${REST_API_BASE_URL}/addchuyenbay`, ChuyenBay);

export const getChuyenBayById = (idChuyenBay) => axios.get(`${REST_API_BASE_URL}/getchuyenbaybyid/${idChuyenBay}`);

export const updateChuyenBay = (idChuyenBay, chuyenBay) => axios.put(`${REST_API_BASE_URL}/updatechuyenbay/${idChuyenBay}`, chuyenBay);