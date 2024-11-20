import axios from "../utils/axios-80802"


const API_URL = 'http://localhost:8080'; 

export const getMayBay = async () => {
    const response = await fetch(`${API_URL}/admin/maybay/getAllPlane`);
    if (!response.ok) {
        throw new Error('Failed to fetch plane');
    }
    const data = await response.json(); 
    return data.data;
};

export const handleSort = async(field, sortOrder, setMayBay, setSortOrder, setSortField) => {
    console.log('getAllPlaneSorted')
    try {
        const response = await axios.get(`${API_URL}/admin/maybay/getAllPlaneSorted?sortBy=${field}&order=${sortOrder}`)
        setMayBay(response.data.data)
        setSortField(field)
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } catch(error){
        console.error('Error fetching sorted results:', error);
    }
}

export const searchPlanes = async (searchTerm, setMayBay) => {
    try {
        const response = await axios.get(`${API_URL}/admin/maybay/findPlane`, { params: { keyword: searchTerm } });
        console.log('Search results:', response.data);
        setMayBay(response.data.data);
    } catch (error) {
        if (error.response && error.response.status === 404) {
            setMayBay([]);
        }
        console.error('Error fetching search results:', error);
    }
};

export const editPlane = (navigate, idMayBay) => {
    console.log(`Navigating to edit plane with ID: ${idMayBay}`);
    navigate(`/admin/maybay/edit/${idMayBay}`);
};

export const blockPlane = async (idMayBay) => {
    try {
        const response1 = await axios.put(`${API_URL}/admin/maybay/blockPlane/${idMayBay}`);
        console.log('Block plane:', response1.data);
        const response2 = await fetch(`${API_URL}/admin/maybay/getAllPlane`);
        const data = await response2.json();
        return data.data;
    } catch (error) {
        console.error('Error fetching block plane:', error);
    }
};
export const getSoLuong = async (idMayBay) => {
    try {
        const response = await axios.get(`${API_URL}/admin/maybay/getPlane/${idMayBay}`);
        const data = response.data.data;

        if (!data) throw new Error('Không tìm thấy thông tin máy bay!');

        const soCotThuong = data.soCotGheThuong ? data.soCotGheThuong.length : 0;
        const soHangThuong = data.soHangGheThuong || 0;
        const soCotVIP = data.soCotGheVip ? data.soCotGheVip.length : 0;
        const soHangVip = data.soHangGheVip || 0;
        const soLuongGhe = (soCotThuong * soHangThuong) + (soCotVIP * soHangVip);
        return soLuongGhe;
    } catch (error) {
        console.error('Lỗi khi lấy số lượng ghế:', error.message);
        throw error;
    }
};
export const getByAirline = async(idHangBay, setMayBay) => {
    try {
        if(idHangBay === 'Lọc theo hãng bay'){
            const response = await axios.get(`${API_URL}/admin/maybay/getAllPlane`);
            setMayBay(response.data.data);
        }
        else {
            const response = await axios.get(`${API_URL}/admin/maybay/getPlaneByAirline/${idHangBay}`);
            console.log('Get plane by airline ', idHangBay, ' is ', response.data);
            setMayBay(response.data.data)
        }
    } catch (error) {
        // console.error('Not search by airlines!', error);
        if (error.response && error.response.status === 404) {
            setMayBay([]);
        }
        console.error('Error fetching search results:', error);
    }
}

export const getByAirport = async(idSanBay, setMayBay) => {
    try {
        if(idSanBay === 'Lọc theo sân bay'){
            const response = await axios.get(`${API_URL}/admin/maybay/getAllPlane`);
            setMayBay(response.data.data);
        }
        else {
            const response = await axios.get(`${API_URL}/admin/maybay/getPlaneByAirport/${idSanBay}`);
            console.log('Get plane by airport ', idSanBay, ' is ', response.data);
            setMayBay(response.data.data)
        }
    } catch (error) {
        // console.error('Not search by airlines!', error);
        if (error.response && error.response.status === 404) {
            setMayBay([]);
        }
        console.error('Error fetching search results:', error);
    }
}