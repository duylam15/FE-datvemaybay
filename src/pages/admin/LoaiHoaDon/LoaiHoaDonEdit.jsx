import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://localhost:8080'; // Thay đổi theo URL API của bạn

const LoaiHoaDonEdit = () => {
    const { idLoaiHD } = useParams();
    const [loaiHoaDon, setLoaiHoaDon] = useState({
        tenLoaiHD: '',
        moTa: '',
        status: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [fieldErrors, setFieldErrors] = useState({}); // State để lưu lỗi cho từng trường

    const params = useParams();
    console.log("Params:", params); // Kiểm tra toàn bộ đối tượng params

    // Fetch thông tin khách hàng khi component được mount
    useEffect(() => {
        axios.get(`${API_URL}/getLoaiHDByID/${idLoaiHD}`)
            .then(response => {
                setLoaiHoaDon(response.data.data);
                setLoading(false);
                console.log("Data fetched for payment method:", response.data.data);
            })
            .catch(error => {
                setError('Failed to fetch payment method data');
                setLoading(false);
            });
    }, [idLoaiHD]);

    // Xử lý submit form
    const handleSubmit = async (event) => {
        event.preventDefault(); // Ngăn chặn hành động mặc định của form
        try {
            const response = await axios.put(`${API_URL}/updateLoaiHoaDon/${idLoaiHD}`, loaiHoaDon);
            console.log('Customer updated successfully!', response.data);
            window.location.href = '/admin/loaihoadon'; // Chuyển hướng đến danh sách khách hàng
        } catch (error) {
            // Kiểm tra lỗi từ phản hồi của backend
            if (error.response && error.response.data) {
                const errors = error.response.data.data; // Lấy danh sách lỗi từ phản hồi
                setFieldErrors(errors);
                console.log(errors) // Cập nhật lỗi cho từng trường
            } else {
                setError('There was an error updating the customer!'); // Thông báo lỗi mặc định
            }
            console.error('There was an error updating the customer!', error);
        }
    };

    // Xử lý khi người dùng thay đổi thông tin trong form
    const handleChange = (event) => {
        const { name, value } = event.target;
        setLoaiHoaDon({ ...loaiHoaDon, [name]: value });
        // Xóa lỗi cho trường đã chỉnh sửa
        setFieldErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="edit-form">
            <h2>Chỉnh sửa thông tin loại hóa đơn</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label">Tên loại hóa đơn</label>
                    <input
                        type="text"
                        name="tenLoaiHD"
                        className={`form-control form-control-lg ${fieldErrors.tenLoaiHD ? 'is-invalid' : ''}`} // Thêm lớp is-invalid nếu có lỗi
                        value={loaiHoaDon.tenLoaiHD}
                        onChange={handleChange}
                    />
                    {fieldErrors.tenLoaiHD && <div className="invalid-feedback">{fieldErrors.tenLoaiHD}</div>} {/* Hiển thị thông báo lỗi */}
                </div>
                <div className="form-group">
                    <label className="form-label">Mô tả</label>
                    <input
                        type="area-text"
                        name="moTa"
                        className={`form-control form-control-lg ${fieldErrors.moTa ? 'is-invalid' : ''}`}
                        value={loaiHoaDon.moTa}
                        onChange={handleChange}
                    />
                    {fieldErrors.moTa && <div className="invalid-feedback">{fieldErrors.moTa}</div>}
                </div>
                <div className="form-group">
                    <label className="form-label">Trạng Thái:</label>
                    <select
                        name="status"
                        className={`form-control form-control-lg ${fieldErrors.status ? 'is-invalid' : ''}`}
                        value={loaiHoaDon.status}
                        onChange={handleChange}
                    >
                        <option value="ACTIVE">Kích hoạt</option>
                        <option value="IN_ACTIVE">Không kích hoạt</option>
                    </select>
                    {fieldErrors.status && <div className="invalid-feedback">{fieldErrors.status}</div>}
                </div>
                <button type="submit" className="btn btn-primary">Cập nhật</button>
            </form>
        </div>
    );
};

export default LoaiHoaDonEdit;
