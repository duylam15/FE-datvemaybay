import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://localhost:8080';

const PhuongThucTTAddForm = () => {
    const [tenPTTT, setTenPTTT] = useState('');
    const [moTa, setMoTa] = useState('');
    const [trangThaiActive, setTrangThaiActive] = useState('ACTIVE');
    const [error, setError] = useState(null); 
    const [fieldErrors, setFieldErrors] = useState({}); // Thêm state cho lỗi từng trường
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const phuongThucTT = {
            tenPTTT,
            moTa,
            trangThaiActive,
        };

        try {
            const response = await axios.post(`${API_URL}/addPTTT`, phuongThucTT);
            console.log('Thêm phương thức thanh toán thành công', response.data);
            navigate('/admin/pttt'); // Điều hướng về trang danh sách khách hàng
        } catch (error) {
            // Kiểm tra lỗi từ phản hồi của backend
            if (error.response && error.response.data) {
                const errors = error.response.data.data; // Lấy danh sách lỗi từ phản hồi
                setFieldErrors(errors); // Cập nhật lỗi cho từng trường
            } else {
                setError('Đã xảy ra lỗi trong quá trình thêm phương thức thanh toán!'); // Đặt thông báo lỗi chung
            }
            console.error('There was an error adding payment method!', error);
        }
    };

    return (
        <div className="add-form">
            <h2>Thêm phương thức thanh toán</h2>
            <form style={{margin: '20px'}} onSubmit={handleSubmit}>
             <div className="mb-3">
                 <label className="form-label">Tên phương thức thanh toán</label>
                 <input 
                    type="text" 
                    className={`form-control form-control-lg ${fieldErrors.tenPTTT ? 'is-invalid' : ''}`}
                    value={tenPTTT}
                    onChange={(e) => setTenPTTT(e.target.value)}
                    id="tenPTTT"
                 />
                 {fieldErrors.tenPTTT && <div className="invalid-feedback">{fieldErrors.tenPTTT}</div>} {/* Hiển thị thông báo lỗi */}
             </div>
             <div className="mb-3">
                 <label className="form-label">Mô tả</label>
                 <input 
                    type="area-text" 
                    className={`form-control form-control-lg`} 
                    value={moTa}
                    onChange={(e) => setMoTa(e.target.value)}
                    id="moTaPTTT"
                 />
             </div>
             <div className="mb-3">
                 <label className="form-label">Trạng thái</label>
                 <select
                    className={`form-control form-control-lg ${fieldErrors.trangThaiActive ? 'is-invalid' : ''}`} 
                    value={trangThaiActive}
                    onChange={(e) => setTrangThaiActive(e.target.value)}
                >
                    <option value="ACTIVE">Kích Hoạt</option>
                    <option value="INACTIVE">Không Kích Hoạt</option>
                </select>
             </div>
             <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
        
    );
};

export default PhuongThucTTAddForm;