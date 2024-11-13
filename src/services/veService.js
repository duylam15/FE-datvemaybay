import axios from "../utils/axios-8080"

const REST_API_BASE_URL = 'http://localhost:8080';

export const getAllVe = (page = 0, size = 2) => {
    return axios.get(`${REST_API_BASE_URL}/ve`, {
        params: { page, size }
    });
};


export const searchVe = async (maVe, startDate, endDate, page = 0, size = 2) => {
    try {
        // Gọi API với tham số tìm kiếm và phân trang
        const response = await axios.get(`${REST_API_BASE_URL}/ve/search`, {
            params: {
                maVe: maVe,
                startDate: startDate,
                endDate: endDate,
                page,
                size
            }
        });
        console.log("search ~ ", response);
        return response
    } catch (error) {
        console.error("Error fetching search quyen:", error);
    }
};


export const getChiTietVeTheoId = (idVe) => {
    return axios.get(`${REST_API_BASE_URL}/ve/${idVe}`)
}

export const getAllStatusVe = () => {
    return axios.get(`${REST_API_BASE_URL}/ve/statuses`)
}

export const editVe = (idVe, data) => {
    return axios.put(`${REST_API_BASE_URL}/ve/${idVe}`, data)
}

