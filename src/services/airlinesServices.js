import axios from 'axios';

const API_URL = 'http://localhost:8080'; // Thay đổi theo URL API của bạn

export const getHangBay = async () => {
    const response = await fetch(`${API_URL}/getAllAirline`); // Thay đổi endpoint theo API của bạn
    if (!response.ok) {
        throw new Error('Failed to fetch airline');
    }
    const data = await response.json(); // Chuyển đổi phản hồi thành JSON
    console.log(data.data)
    return data.data; // Trả về phần data bên trong JSON
};