import axios from "axios";

const API_URL = 'http://localhost:8080'; // Thay đổi theo URL API của bạn

export const getHoaDon = async () => {
    const response = await fetch(`${API_URL}/getAllHoaDon`); // Thay đổi endpoint theo API của bạn
    if (!response.ok) {
        throw new Error('Failed to fetch bills');
    }
    const data = await response.json(); // Chuyển đổi phản hồi thành JSON
    return data.data; // Trả về phần data bên trong JSON

};
export const editHoaDon= (navigate, idHoaDon) => {
    navigate(`/hoadon/edit/${idHoaDon}`);
};

export const searchHoaDon = async (searchTerm, setHoaDon) => {
    try {
        const response = await axios.get(`${API_URL}/getHoaDonByKeyWord`, { params: { keyWord: searchTerm } });
        console.log('Search results:', response.data);
        setHoaDon(response.data.data);
    } catch (error) {
        if (error.response && error.response.status === 404) {
            console.error("Error 404: Resource not found");
            // Xử lý lỗi 404
            setHoaDon([]);
        } else {
            console.error("An error occurred:", error.message);
        }
    }
};

export const handleSort = (field, sortOrder, setHoaDon, setSortOrder, setSortField) => {
    axios.get(`${API_URL}/getAllHoaDonSorted`, { params: { field, order: sortOrder } })
        .then(response => {
            console.log('Sorted results:', response.data);
            setHoaDon(response.data.data);
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
            setSortField(field); // Set the current field being sorted
        })
        .catch(error => {
            console.error('Error fetching sorted results:', error);
        });
};

export const detail = (navigate, idHoaDon) => {
    navigate(`/hoadon/chitiet/${idHoaDon}`);
};