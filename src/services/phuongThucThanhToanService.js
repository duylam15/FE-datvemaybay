import axios from "../utils/axios-80802"

const API_URL = 'http://localhost:8080'; // Thay đổi theo URL API của bạn

export const getPhuongThucTT = async () => {
    try {
        const response = await axios.get(`${API_URL}/getAllPTTT`); // Gọi API lấy danh sách hóa đơn
        return response.data.data; // Trả về dữ liệu bên trong "data" của phản hồi
    } catch (error) {
        console.error('Failed to fetch payment methods:', error); // In lỗi nếu có vấn đề khi gọi API
        throw new Error('Failed to fetch payment methods');
    }
};
export const editPhuongThucTT= (navigate, idPhuongThucTT) => {
    navigate(`/admin/pttt/edit/${idPhuongThucTT}`);
};

export const searchPhuongThucTT = async (searchTerm, setPhuongThucTT) => {
    try {
        const response = await axios.get(`${API_URL}/getPTTTByKeyWord`, { params: { keyWord: searchTerm } });
        console.log('Search results:', response.data);
        setPhuongThucTT(response.data.data);
    } catch (error) {
        if (error.response && error.response.status === 404) {
            console.error("Error 404: Resource not found");
            // Xử lý lỗi 404
            setPhuongThucTT([]);
        } else {
            console.error("An error occurred:", error.message);
        }
    }
};

export const handleSort = (field, sortOrder, setPhuongThucTT, setSortOrder, setSortField) => {
    axios.get(`${API_URL}/getAllPTTTSorted`, { params: { sortBy: field, order: sortOrder } })
        .then(response => {
            console.log('Sorted results:', response.data);
            setPhuongThucTT(response.data.data);
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
            setSortField(field); // Set the current field being sorted
        })
        .catch(error => {
            console.error('Error fetching sorted results:', error);
        });
};

