import axios from "../utils/axios-80802"

const API_URL = 'http://localhost:8080'; // Thay đổi theo URL API của bạn

export const getHoaDon = async () => {
    try {
        const response = await axios.get(`${API_URL}/getAllHoaDon`); // Gọi API lấy danh sách hóa đơn
        return response.data.data; // Trả về dữ liệu bên trong "data" của phản hồi
    } catch (error) {
        console.error('Failed to fetch bills:', error); // In lỗi nếu có vấn đề khi gọi API
        throw new Error('Failed to fetch bills');
    }
};
export const editHoaDon= (navigate, idHoaDon) => {
    navigate(`/hoadon/edit/${idHoaDon}`);
};

export const searchHoaDon = async (searchTerm, setHoaDon) => {
    console.log("tu khoa: ", searchTerm);
    try {
        const response = await axios.get(`${API_URL}/getHoaDonByKeyWord`, { params: { keyWord: searchTerm } });
        console.log('Search results:', response.data);
        setHoaDon(response.data.data);
    } catch (error) {
        if (error.response && error.response.status === 404) {
            // Xử lý lỗi 404
            setHoaDon([]);
        } else {
            setHoaDon([]);
        }
    }
};

export const handleSort = (field, sortOrder, setHoaDon, setSortOrder, setSortField) => {
    axios.get(`${API_URL}/getAllHoaDonSorted`, { params: { sortBy: field, order: sortOrder } })
        .then(response => {
            console.log('Sorted results:', response.data);
            setHoaDon(response.data.data);
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
            setSortField(field); // Set the current field being sorted
        })
        .catch(error => {
            console.error('Error fetching sorted results:', error);
        });
};

export const detail = (navigate, idHoaDon) => {
    navigate(`/admin/hoadon/chitiet/${idHoaDon}`);
};
 
export const filHoaDon = async (field, input, setHoaDon) => {
    try {
        const response = await axios.get(`${API_URL}/getHoaDonByField`, { params: { field, input}});
        console.log(response.data);
        setHoaDon(response.data ? response.data.data : []);
    } catch (error) {
        console.error('Lỗi khi lấy danh sách hóa đơn:', error);
        throw error;
    }
};

export const updateHoaDonStatus = async (id, newStatus, setHoaDon) => {
    try {
        const response = await axios.put(`${API_URL}/updateHoaDonState/${id}`, { status: newStatus });

        if (response.data && response.data.data) {
            console.log('Cập nhật thành công:', response.data.data);
            setHoaDon(prevHoaDons =>
                prevHoaDons.map(hoaDon =>
                    hoaDon.idHoaDon === id ? { ...hoaDon, status: newStatus } : hoaDon
                )
            );
        } else {
            console.warn('Không có dữ liệu trả về từ API.');
            setHoaDon([]);
        }
    } catch (error) {
        console.error('Lỗi khi cập nhật trạng thái hóa đơn:', error);
    }
};

export const getComboboxValue = async (field, setComboBoxValues) => {
    try {
        let response = null;
        let value = [];
        switch (field) {
            case "nhanVien":
                response = await axios.get(`${API_URL}/admin/nhanvien/getallnhanvien`);
                value = response.data.data.map(item => ({ id: item.idNhanVien, ten: item.hoTen }));
                console.log(response.data);
                break;
            case "khachHang":
                response = await axios.get(`${API_URL}/khachhang/getAllCustomer`);
                value = response.data.data.map(item => ({ id: item.idKhachHang, ten: item.hoTen }));
                break;
            case "phuongThucThanhToan":
                response = await axios.get(`${API_URL}/getAllPTTT`);
                value = response.data.data.map(item => ({ id: item.idPTTT, ten: item.tenPTTT }));
                break;
            case "loaiHoaDon":
                response = await axios.get(`${API_URL}/getAllLoaiHD`);
                value = response.data.data.map(item => ({ id: item.idLoaiHD, ten: item.tenLoaiHD }));
                break;
            default:
                break;
        }
        console.log("response: ", response.data);
        console.log("value: ", value);
        setComboBoxValues(value);
    } catch (error) {
        console.error('Lỗi khi lấy dữ liệu combobox:', error);
    }
}

export const fetchRevenueByTimeFrame = async (timeFrame) => {
    const endpoint = {
        monthly: '/thongke/thang',
        quarterly: '/thongke/quy',
        yearly: '/thongke/nam',
    };
    try {
        const response = await axios.get(`http://localhost:8080${endpoint[timeFrame]}`);
        return response.data; // Giả sử API trả về đúng cấu trúc { data: [...] }
    } catch (error) {
        console.error(`Error fetching revenue for ${timeFrame}:`, error);
        throw error;
    }
};
