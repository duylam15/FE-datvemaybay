const API_URL = 'http://localhost:8080'; // Thay đổi theo URL API của bạn

export const getKhachHang = async () => {
    const response = await fetch(`${API_URL}/getAllCustomer`); // Thay đổi endpoint theo API của bạn
    if (!response.ok) {
        throw new Error('Failed to fetch customers');
    }
    const data = await response.json(); // Chuyển đổi phản hồi thành JSON
    return data.data; // Trả về phần data bên trong JSON
};