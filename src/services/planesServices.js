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
    console.log('blockPlane');
    try {
        const response = await axios.put(`${API_URL}/blockPlane/${idMayBay}`);
        console.log(`Blocked plane with ID: ${idMayBay}`, response.data);
        return response.data; // Trả về dữ liệu sau khi block
    } catch (error) {
        console.error('There was an error blocking the plane!', error);
        throw error; // Ném lỗi nếu có vấn đề
    }
};
export const getSoLuong = async (idMayBay) => {
    // console.log('Get so luong ghe');
    try {
        const response = await axios.get(`${API_URL}/getPlane/${idMayBay}`);
        const data = response.data.data;

        // Kiểm tra dữ liệu trả về
        if (!data) throw new Error('Không tìm thấy thông tin máy bay!');

        const soCotThuong = data.soCotGheThuong || 0;
        const soHangThuong = data.soHangGheThuong ? data.soHangGheThuong.length : 0;
        const soCotVIP = data.soCotGheVip || 0;
        const soHangVip = data.soHangGheVip ? data.soHangGheVip.length : 0;

        // Tính tổng số ghế
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
            const response = await axios.get(`${API_URL}/getAllPlane`);
            setMayBay(response.data.data);
        }
        else {
            const response = await axios.get(`${API_URL}/getPlaneByAirline/${idHangBay}`);
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
