import axios from 'axios';

const API_URL = 'http://localhost:8080'; // Thay đổi theo URL API của bạn

export const getSanBay = async () => {
    const response = await fetch(`${API_URL}/getAllAirport`); // Thay đổi endpoint theo API của bạn
    if (!response.ok) {
        throw new Error('Failed to fetch airport');
    }
    const data = await response.json(); // Chuyển đổi phản hồi thành JSON
    return data.data; // Trả về phần data bên trong JSON
};

export const handleSort = async(field, sortOrder, setSanBay, setSortOrder, setSortField) => {
    console.log('getAllPlaneSorted')
    try {
        const response = await axios.get(`${API_URL}/getAllAirportSorted?sortBy=${field}&order=${sortOrder}`)
        setSanBay(response.data.data)
        setSortField(field)
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } catch(error){
        console.error('Error fetching sorted results:', error);
    }
}

export const searchAirports = async (searchTerm, setSanBay) => {
    try {
        const response = await axios.get(`${API_URL}/findAirport`, { params: { keyword: searchTerm } });
        console.log('Search results:', response.data);
        setSanBay(response.data.data);
    } catch (error) {
        if (error.response && error.response.status === 404) {
            setSanBay([]);
        }
        console.error('Error fetching search results:', error);
    }
};

export const editAirport = (navigate, idSanBay) => {
    navigate(`/airport/edit/${idSanBay}`);
};

export const blockAirport = async (idSanBay) => {
    console.log('blockAirport')
    try {
        const response = await axios.put(`${API_URL}/blockAirport/${idSanBay}`);
        console.log(`Blocked airport with ID: ${idSanBay}`, response.data);
        return response.data;
    } catch (error) {
        console.error('There was an error blocking the airport!', error);
    }
};

export const searchByCity = async (idThanhPho, setSanBay) => {
    try {
        const response = await axios.get(`${API_URL}/getAirportByCity/${idThanhPho}`);
        console.log('Get airport by city', idThanhPho, 'is', response.data);
        setSanBay(response.data.data);
    } catch (error) {
        console.error('Failed to get airport by city!', error);
        const fallbackResponse = await axios.get(`${API_URL}/getAllAirport`);
        setSanBay(fallbackResponse.data.data);
    }
};