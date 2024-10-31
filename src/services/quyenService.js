import axios from "../utils/axios-8080"

const REST_API_BASE_URL = 'http://localhost:8080';

export const getAllQuyen = (page = 0, size = 2) => {
    return axios.get(`${REST_API_BASE_URL}/quyen`, {
        params: { page, size }
    });
};


export const searchQuyen = async (tenQuyen, page = 0, size = 2) => {
    try {
        // Gọi API với tham số tìm kiếm và phân trang
        const response = await axios.get(`${REST_API_BASE_URL}/quyen/search`, {
            params: {
                name: tenQuyen,
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

export const getAllChucNang = () => {
    return axios.get(`${REST_API_BASE_URL}/chucnang`)
}

export const getChiTietQuyenTheoId = (idQuyen) => {
    return axios.get(`${REST_API_BASE_URL}/quyen/${idQuyen}`)
}