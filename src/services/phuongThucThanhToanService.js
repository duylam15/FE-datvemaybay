import axios from "axios";

const API_URL = 'http://localhost:8080'; // Thay đổi theo URL API của bạn

export const getPhuongThucTT = async () => {
    const response = await fetch(`${API_URL}/getAllPTTT`); // Thay đổi endpoint theo API của bạn
    if (!response.ok) {
        throw new Error('Failed to fetch payment methods');
    }
    const data = await response.json(); // Chuyển đổi phản hồi thành JSON
    return data.data; // Trả về phần data bên trong JSON

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

