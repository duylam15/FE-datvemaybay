import axios from "../utils/axios-80802"

const API_URL = 'http://localhost:8080/khachhang'; // Thay đổi theo URL API của bạn

export const getKhachHang = async () => {
    const response = await fetch(`${API_URL}/getAllCustomer`); // Thay đổi endpoint theo API của bạn
    if (!response.ok) {
        throw new Error('Failed to fetch customers');
    }
    const data = await response.json(); // Chuyển đổi phản hồi thành JSON
    return data.data; // Trả về phần data bên trong JSON
};

export const handleSort = (field, sortOrder, setKhachHang, setSortOrder, setSortField) => {
    axios.get(`${API_URL}/getAllCustomerSorted`, { params: { field, order: sortOrder } })
        .then(response => {
            console.log('Sorted results:', response.data);
            setKhachHang(response.data.data);
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
            setSortField(field); // Set the current field being sorted
        })
        .catch(error => {
            console.error('Error fetching sorted results:', error);
        });
};

export const searchCustomers = async (searchTerm, setKhachHang) => {
    try {
        const response = await axios.get(`${API_URL}/findKhachHang`, { params: { keyword: searchTerm } });
        console.log('Search results:', response.data);
        setKhachHang(response.data.data);
    } catch (error) {
        console.error('Error fetching search results:', error);
    }
};

export const editCustomer = (navigate, idKhachHang) => {
    navigate(`/admin/customer/edit/${idKhachHang}`);
};

export const blockCustomer = async (idKhachHang) => {
    try {
        const response = await axios.put(`${API_URL}/khachhang/block/${idKhachHang}`);
        console.log(`Blocked customer with ID: ${idKhachHang}`, response.data);
    } catch (error) {
        console.error('There was an error blocking the customer!', error);
    }
};

export const sortCustomers = async (field, sortOrder, setKhachHang, setSortOrder) => {
    try {
        const response = await axios.get(`${API_URL}/getAllCustomerSorted`, { params: { field, order: sortOrder } });
        console.log('Sorted results:', response.data);
        setKhachHang(response.data.data);
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } catch (error) {
        console.error('Error fetching sorted results:', error);
    }
};