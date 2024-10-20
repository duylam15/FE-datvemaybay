import axios from "axios";

const API_URL = 'http://localhost:8080'; // Thay đổi theo URL API của bạn

export const getLoaiHoaDon = async () => {
    const response = await fetch(`${API_URL}/getAllLoaiHD`); // Thay đổi endpoint theo API của bạn
    if (!response.ok) {
        throw new Error('Failed to fetch bill type');
    }
    const data = await response.json(); // Chuyển đổi phản hồi thành JSON
    return data.data; // Trả về phần data bên trong JSON

};
export const editLoaiHoaDon= (navigate, idLoaiHD) => {
    navigate(`/loaihoadon/edit/${idLoaiHD}`);
};

export const searchLoaiHoaDon = async (searchTerm, setLoaiHoaDon) => {
    try {
        const response = await axios.get(`${API_URL}/getLoaiHDByKeyWord`, { params: { keyWord: searchTerm } });
        console.log('Search results:', response.data);
        setLoaiHoaDon(response.data.daa);
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
    axios.get(`${API_URL}/getAllLoaiHDSorted`, { params: { field, order: sortOrder } })
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

