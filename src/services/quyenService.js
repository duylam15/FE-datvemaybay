import axios from "../utils/axios-8080"

const REST_API_BASE_URL = 'http://localhost:8080';

export const getAllQuyen = (page = 0, size = 2) => {
    return axios.get(`${REST_API_BASE_URL}/quyen`, {
        params: { page, size }
    });
};


export const searchQuyen = async (tenQuyen, page = 0, size = 2, setNhomQuyen) => {
    try {
        // Gọi API với tham số tìm kiếm và phân trang
        const response = await axios.get(`${REST_API_BASE_URL}/quyen/search`, {
            params: {
                name: tenQuyen,
                page,
                size
            }
        });

        // Thiết lập dữ liệu vào state
        console.log("search ~ ", response);
        setNhomQuyen(response);
    } catch (error) {
        console.error("Error fetching quyen:", error);
        // Bạn có thể xử lý lỗi tại đây nếu cần
    }
};