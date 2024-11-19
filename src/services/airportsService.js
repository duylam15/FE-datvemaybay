import axios from "../utils/axios-80802"

const API_URL = 'http://localhost:8080'; // Thay đổi theo URL API của bạn

export const getSanBay = async () => {
    const response = await fetch(`${API_URL}/admin/sanbay/getAllAirport`); // Thay đổi endpoint theo API của bạn
    if (!response.ok) {
        throw new Error('Failed to fetch airport');
    }
    const data = await response.json(); // Chuyển đổi phản hồi thành JSON
    return data.data; // Trả về phần data bên trong JSON
};

export const handleSortAirport = async(field, sortOrder, setSanBay, setSortOrder, setSortField) => {
    console.log('getAllAirportSorted')
    try {
        const response = await axios.get(`${API_URL}/admin/sanbay/getAllAirportSorted?sortBy=${field}&order=${sortOrder}`)
        setSanBay(response.data.data)
        setSortField(field)
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } catch(error){
        console.error('Error fetching sorted results:', error);
    }
}

export const searchAirports = async (searchTerm, setSanBay) => {
    try {
        const response = await axios.get(`${API_URL}/admin/sanbay/findAirport`, { params: { keyword: searchTerm } });
        console.log('Search airport results:', response.data);
        setSanBay(response.data.data);
    } catch (error) {
        if (error.response && error.response.status === 404) {
            setSanBay([]);
        }
        console.error('Error fetching search results:', error);
    }
};

export const editAirport = (navigate, idSanBay) => {
    console.log(`Navigating to edit airport with ID: ${idSanBay}`);
    navigate(`/admin/sanbay/edit/${idSanBay}`);
};

export const blockAirport = async (idSanBay) => {
    try {
        const response1 = await axios.put(`${API_URL}/admin/sanbay/blockAirport/${idSanBay}`);
        console.log('Block airport:', response1.data);
        const response2 = await fetch(`${API_URL}/admin/sanbay/getAllAirport`);
        const data = await response2.json();
        return data.data;
    } catch (error) {
        console.error('Error fetching block airport:', error);
    }
};

export const getByCity = async(idThanhPho, setSanBay) => {
    try {
        if(idThanhPho === 'Lọc theo thành phố'){
            const response = await axios.get(`${API_URL}/admin/sanbay/getAllAirport`);
            setSanBay(response.data.data);
        }
        else {
            const response = await axios.get(`${API_URL}/admin/sanbay/getAirportByCity/${idThanhPho}`);
            console.log('Get Airport by city ', idThanhPho, ' is ', response.data);
            setSanBay(response.data.data)
        }
    } catch (error) {
        // console.error('Not search by airlines!', error);
        if (error.response && error.response.status === 404) {
            setSanBay([]);
        }
        console.error('Error fetching search results:', error);
    }
}
export const getByNation = async(idQuocGia, setSanBay) => {
    try {
        if(idQuocGia === 'Lọc theo quốc gia'){
            const response = await axios.get(`${API_URL}/admin/sanbay/getAllAirport`);
            setSanBay(response.data.data);
        }
        else {
            const response = await axios.get(`${API_URL}/admin/sanbay/getAirportByNation/${idQuocGia}`);
            console.log('Get Airport by nation ', idQuocGia, ' is ', response.data);
            setSanBay(response.data.data)
        }
    } catch (error) {
        if (error.response && error.response.status === 404) {
            setSanBay([]);
        }
        console.error('Error fetching search results:', error);
    }
}
