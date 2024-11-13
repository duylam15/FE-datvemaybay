import axios from "axios";

const API_URL = 'http://localhost:8080'; // Thay đổi theo URL API của bạn

export const getTaiKhoan = async (page, size) => {
    try {
        const response = await axios.get(`${API_URL}/taikhoan`, {
            params: { // Sử dụng thuộc tính `params` của axios
                page: page,
                size: size
            }
        });
        return response.data; // Trả về dữ liệu JSON từ server
    } catch (error) {
        console.error('Failed to fetch accounts:', error);
        throw new Error('Failed to fetch accounts');
    }
};
export const editTaiKhoan= (navigate, idTaiKhoan) => {
    navigate(`/admin/taikhoan/edit/${idTaiKhoan}`);
};

export const searchTaiKhoan = async (searchTerm, setTaiKhoan) => {
    try {
        const response = await axios.get(`${API_URL}/taikhoan/findByKeyWord?keyWord=${searchTerm}`);
        console.log('Search results:', response.data);
        setTaiKhoan(response.data.data);
    } catch (error) {
        if (error.response && error.response.status === 404) {
            console.error("Error 404: Resource not found");
            // Xử lý lỗi 404
            setTaiKhoan([]);
        } else {
            console.error("An error occurred:", error.message);
        }
    }
};

export const handleSort = async (field, sortOrder, setTaiKhoan, setSortOrder, setSortField) => {
    axios.get(`${API_URL}/taikhoan/getAllTaiKhoanSorted?sortBy=${field}&order=${sortOrder}`)
        .then(response => {
            console.log('Sorted results:', response.data);
            setTaiKhoan(response.data.data);
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
            setSortField(field); // Set the current field being sorted
        })
        .catch(error => {
            console.error('Error fetching sorted results:', error);
        });
};

export const handlePaginatonServ = async (page, size, setTaiKhoan) => {
    const response = await fetch(`${API_URL}/taikhoan`, { params: { keyWord: searchTerm, page: page, size: size } }); // Thay đổi endpoint theo API của bạn
    if (!response.ok) {
        throw new Error('Failed to fetch accounts');
    }
    const data = await response.json(); // Chuyển đổi phản hồi thành JSON
    setTaiKhoan(data.data.content);

}

