import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';


const API_URL = 'http://localhost:8080'; // Thay đổi theo URL API của bạn

const MayBayEdit = () => {
    const { idMayBay } = useParams();
    const [mayBay, setMayBay] = useState({
        tenMayBay: '',
        hangBay: null,
        icaoMayBay: '',
        soHangGheThuong: '',
        soHangGheVip: '',
        soCotGheThuong: '',
        soCotGheVip: '',
        soHieu: '',
        namSanXuat: '',
        trangThaiActive: ''
    });
    const [listHangBay, setListHangBay] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [fieldErrors, setFieldErrors] = useState({}); // State để lưu lỗi cho từng trường

    useEffect(() => {
        axios.get(`${API_URL}/getPlane/${idMayBay}`)
            .then(response => {
                setMayBay(response.data.data);
                setLoading(false);
                console.log("Data fetched for plane:", response.data.data);
            })
            .catch(error => {
                setError('Failed to fetch plane data');
                setLoading(false);
            });
    }, [idMayBay]);
    
    const getHangBay = async () => {
        const response = await fetch(`${API_URL}/getAllAirline`); // Thay đổi endpoint theo API của bạn
        if (!response.ok) {
            throw new Error('Failed to fetch airline');
        }
        const data = await response.json(); // Chuyển đổi phản hồi thành JSON
        return data.data; // Trả về phần data bên trong JSON
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getHangBay();
                setListHangBay(data);
                console.log('Get list airline success!!', listHangBay)
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Xử lý submit form
    const handleSubmit = async (event) => {
        event.preventDefault(); // Ngăn chặn hành động mặc định của form
        try {
            // Chuyển đổi kiểu dữ liệu trước khi gửi
            const updatedMayBay = {
                ...mayBay,
                soCotGheThuong: parseInt(mayBay.soCotGheThuong, 10),
                soCotGheVip : parseInt(mayBay.soCotGheVip, 10),
                namSanXuat: parseInt(mayBay.namSanXuat, 10),
            };

            const response = await axios.put(`${API_URL}/updatePlane/${idMayBay}`, updatedMayBay);
            console.log('Plane updated successfully!', response.data);
            window.location.href = '/admin/maybay'; 
        } catch (error) {
            // Kiểm tra lỗi từ phản hồi của backend
            if (error.response && error.response.data) {
                const errors = error.response.data.data; // Lấy danh sách lỗi từ phản hồi
                setFieldErrors(errors);
                console.log(errors) // Cập nhật lỗi cho từng trường
            } else {
                setError('There was an error updating the plane!'); // Thông báo lỗi mặc định
            }
            console.error('There was an error updating the plane!', error);
        }
    };

    // Xử lý khi người dùng thay đổi thông tin trong form
    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === 'hangBay') {
            const selectedHangBay = listHangBay.find(hb => hb.idHangBay === parseInt(value, 10));
            setMayBay({ ...mayBay, hangBay: selectedHangBay });
        } else {
            setMayBay({ ...mayBay, [name]: value });
        }
        // Xóa lỗi cho trường đã chỉnh sửa
        setFieldErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="container">
            <h2>Chỉnh sửa thông tin máy bay</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Tên Máy Bay:</label>
                    <input
                        type="text"
                        name="tenMayBay"
                        className={`form-control ${fieldErrors.tenMayBay ? 'is-invalid' : ''}`} // Thêm lớp is-invalid nếu có lỗi
                        value={mayBay.tenMayBay}
                        onChange={handleChange}
                    />
                    {fieldErrors.tenMayBay && <div className="invalid-feedback">{fieldErrors.tenMayBay}</div>} {/* Hiển thị thông báo lỗi */}
                </div>
                <div className="form-group">
                    <label>Hãng Bay</label>
                    <select
                        name='hangBay'
                        className={`form-control ${fieldErrors.hangBay ? 'is-invalid' : ''}`}
                        value={mayBay.hangBay ? mayBay.hangBay.idHangBay : ''}
                        onChange={handleChange}
                    >
                        <option value="">Chọn hãng bay</option>
                        {listHangBay.map((hb) => (
                            <option value={hb.idHangBay} key={hb.idHangBay}>
                                {hb.tenHangBay}
                            </option>
                        ))}
                    </select>
                    {fieldErrors.hangBay && <div className="invalid-feedback">{fieldErrors.hangBay}</div>}
                </div>
                <div className="form-group">
                    <label>ICAO Máy Bay:</label>
                    <input
                        type="text"
                        name="icaoMayBay"
                        className={`form-control ${fieldErrors.icaoMayBay ? 'is-invalid' : ''}`}
                        value={mayBay.icaoMayBay}
                        onChange={handleChange}
                    />
                    {fieldErrors.icaoMayBay && <div className="invalid-feedback">{fieldErrors.icaoMayBay}</div>}
                </div>
                <div className="form-group">
                    <label>Số Hàng Ghế Thường:</label>
                    <input
                        type="text"
                        name="soHangGheThuong"
                        className={`form-control ${fieldErrors.soHangGheThuong ? 'is-invalid' : ''}`}
                        value={mayBay.soHangGheThuong}
                        onChange={handleChange}
                    />
                    {fieldErrors.soHangGheThuong && <div className="invalid-feedback">{fieldErrors.soHangGheThuong}</div>} 
                </div>
                <div className='form-group'>
                    <label>Số Hàng Ghế VIP:</label>
                    <input
                        type="text"
                        name="soHangGheVip"
                        className={`form-control ${fieldErrors.soHangGheVip ? 'is-invalid' : ''}`}
                        value={mayBay.soHangGheVip}
                        onChange={handleChange}
                    />
                    {fieldErrors.soHangGheVip && <div className="invalid-feedback">{fieldErrors.soHangGheVip}</div>}
                </div>
                <div className='form-group'>
                    <label>Số Cột Ghế Thường:</label>
                    <input
                        type="text"
                        name="soCotGheThuong"
                        className={`form-control ${fieldErrors.soCotGheThuong ? 'is-invalid' : ''}`}
                        value={mayBay.soCotGheThuong}
                        onChange={handleChange}
                    />
                    {fieldErrors.soCotGheThuong && <div className="invalid-feedback">{fieldErrors.soCotGheThuong}</div>}
                </div>
                <div className='form-group'>
                    <label>Số Cột Ghế VIP:</label>
                    <input
                        type="text"
                        name="soCotGheVip"
                        className={`form-control ${fieldErrors.soCotGheVip ? 'is-invalid' : ''}`}
                        value={mayBay.soCotGheVip}
                        onChange={handleChange}
                    />
                    {fieldErrors.soCotGheVip && <div className="invalid-feedback">{fieldErrors.soCotGheVip}</div>}
                </div>
                <div className="form-group">
                    <label>Số Hiệu:</label>
                    <input
                        type="text"
                        name="soHieu"
                        className={`form-control ${fieldErrors.soHieu ? 'is-invalid' : ''}`}
                        value={mayBay.soHieu}
                        onChange={handleChange}
                    />
                    {fieldErrors.soHieu && <div className="invalid-feedback">{fieldErrors.soHieu}</div>}
                </div>
                <div className="form-group">
                    <label>Năm Sản Xuất:</label>
                    <input
                        type="text"
                        name="namSanXuat"
                        className={`form-control ${fieldErrors.namSanXuat ? 'is-invalid' : ''}`}
                        value={mayBay.namSanXuat}
                        onChange={handleChange}
                    />
                    {fieldErrors.namSanXuat && <div className="invalid-feedback">{fieldErrors.namSanXuat}</div>}
                </div>
                <div className="form-group">
                    <label>Trạng Thái:</label>
                    <select
                        name="trangThaiActive"
                        className={`form-control ${fieldErrors.trangThaiActive ? 'is-invalid' : ''}`}
                        value={mayBay.trangThaiActive}
                        onChange={handleChange}
                    >
                        <option value="ACTIVE">Kích hoạt</option>
                        <option value="IN_ACTIVE">Không kích hoạt</option>
                    </select>
                    {fieldErrors.trangThaiActive && <div className="invalid-feedback">{fieldErrors.trangThaiActive}</div>}
                </div>
                <div className="btn-container">
                    <button type="submit" className="btn-primary">Cập nhật</button>
                </div>
            </form>
        </div>
    );
};

export default MayBayEdit;