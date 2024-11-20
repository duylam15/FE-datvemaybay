import axios from "../utils/axios-80802"

const API_URL = 'http://localhost:8080'; // Thay đổi theo URL API của bạn

export const getLoaiHoaDon = async () => {
    try {
        const response = await axios.get(`${API_URL}/getAllLoaiHD`); // Gọi API lấy danh sách hóa đơn
        return response.data.data; // Trả về dữ liệu bên trong "data" của phản hồi
    } catch (error) {
        console.error('Failed to fetch bill types:', error); // In lỗi nếu có vấn đề khi gọi API
        throw new Error('Failed to fetch bill types');
    }
};
export const editLoaiHoaDon= (navigate, idLoaiHD) => {
    navigate(`/admin/loaihoadon/edit/${idLoaiHD}`);
};

export const searchLoaiHoaDon = async (searchTerm, setLoaiHoaDon) => {
    try {
        const response = await axios.get(`${API_URL}/getLoaiHDByKeyWord`, { params: { keyWord: searchTerm } });
        console.log('Search results:', response.data);
        setLoaiHoaDon(response.data.data);
    } catch (error) {
        if (error.response && error.response.status === 404) {
            console.error("Error 404: Resource not found");
            // Xử lý lỗi 404
            setLoaiHoaDon([]);
        } else {
            console.error("An error occurred:", error.message);
        }
    }
};

export const handleSort = (field, sortOrder, setLoaiHoaDon, setSortOrder, setSortField) => {
    axios.get(`${API_URL}/getAllLoaiHDSorted`, { params: { sortBy: field, order: sortOrder } })
        .then(response => {
            console.log('Sorted results:', response.data);
            setLoaiHoaDon(response.data.data);
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
            setSortField(field); // Set the current field being sorted
        })
        .catch(error => {
            console.error('Error fetching sorted results:', error);
        });
};

