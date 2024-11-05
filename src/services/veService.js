import axios from "../utils/axios-8080"

const REST_API_BASE_URL = 'http://localhost:8080';

export const getAllVe = (page = 0, size = 2) => {
    return axios.get(`${REST_API_BASE_URL}/ve`, {
        params: { page, size }
    });
};


export const searchVe = async (maVe, page = 0, size = 2) => {
    try {
        // Gọi API với tham số tìm kiếm và phân trang
        const response = await axios.get(`${REST_API_BASE_URL}/ve/search`, {
            params: {
                maVe: maVe,
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

