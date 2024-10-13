import axios from 'axios';

const API_URL = 'http://localhost:8080'; // Thay đổi theo URL API của bạn

export const getMayBay = async () => {
    const response = await fetch(`${API_URL}/getAllPlane`); // Thay đổi endpoint theo API của bạn
    if (!response.ok) {
        throw new Error('Failed to fetch plane');
    }
    const data = await response.json(); // Chuyển đổi phản hồi thành JSON
    return data.data; // Trả về phần data bên trong JSON
};

export const handleSort = async(field, sortOrder, setMayBay, setSortOrder, setSortField) => {
    console.log('getAllPlaneSorted')
    try {
        const response = await axios.get(`${API_URL}/getAllPlaneSorted?sortBy=${field}&order=${sortOrder}`)
        setMayBay(response.data.data)
        setSortField(field)
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } catch(error){
        console.error('Error fetching sorted results:', error);
    }
}

export const searchPlanes = async (searchTerm, setMayBay) => {
    try {
        const response = await axios.get(`${API_URL}/findPlane`, { params: { keyword: searchTerm } });
        console.log('Search results:', response.data);
        setMayBay(response.data.data);
    } catch (error) {
        console.error('Error fetching search results:', error);
    }
};

export const editPlane = (navigate, idMayBay) => {
    navigate(`/plane/edit/${idMayBay}`);
};

export const blockPlane = async (idMayBay) => {
    console.log('blockPlane')
    try {
        const response = await axios.put(`${API_URL}/blockPlane/${idMayBay}`);
        console.log(`Blocked plane with ID: ${idMayBay}`, response.data);
    } catch (error) {
        console.error('There was an error blocking the plane!', error);
    }
};
