import axios from "../utils/axios-80802"

const API_URL = 'http://localhost:8080'; // Thay đổi theo URL API của bạn


export const getChiTietHoaDon = async (idHoaDon) => {
    const response = await axios.get(`${API_URL}/getListChiTietHoaDon/${idHoaDon}`); // Thay đổi endpoint theo API của bạn
    
    if (!response.ok) {
        throw new Error('Failed to fetch bills');
    }
    const data = await response.json(); // Chuyển đổi phản hồi thành JSON
    console.log(data.data);
    return data.data; // Trả về phần data bên trong JSON

};
export const editChiTietHoaDon= (navigate, idChiTietHoaDon) => {
    navigate(`/hoadon/chitiet/edit/${idChiTietHoaDon}`);
};

export const searchChiTietHoaDon = async (idHoaDon, searchTerm, setChiTietHoaDon) => {
    try {
        const response = await axios.get(`${API_URL}/getListChiTietHoaDonByKeyWord/${idHoaDon}`, { params: { keyWord: searchTerm } });
        console.log('Search results:', response.data);
        setChiTietHoaDon(response.data.data);
    } catch (error) {
        if (error.response && error.response.status === 404) {
            console.error("Error 404: Resource not found");
            // Xử lý lỗi 404
            setChiTietHoaDon([]);
        } else {
            console.error("An error occurred:", error.message);
        }
    }
};

export const handleSort = (field, sortOrder, idHoaDon, setChiTietHoaDon, setSortOrder, setSortField) => {
    axios.get(`${API_URL}/getListChiTietHoaDonSorted/${idHoaDon}`, { params: { field, order: sortOrder } })
        .then(response => {
            console.log('Sorted results:', response.data);
            setChiTietHoaDon(response.data.data);
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
            setSortField(field); // Set the current field being sorted
        })
        .catch(error => {
            console.error('Error fetching sorted results:', error);
        });
};

export const detail = (navigate, idChiTietHoaDon) => {
    navigate(`/hoadon/chitiet/${idChiTietHoaDon}`);
};