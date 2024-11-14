import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { message } from 'antd';


const API_URL = 'http://localhost:8080'; // Thay đổi theo URL API của bạn

const SanBayEdit = () => {
    const { idSanBay } = useParams();
    const [sanBay, setSanBay] = useState({
        tenSanBay: '',
        iataSanBay: '',
        icaoSanBay: '',
        diaChi: '',
        thanhPho: null,
        trangThaiActive: ''
    });
    const navigate = useNavigate();
    const [listThanhPho, setListThanhPho] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [fieldErrors, setFieldErrors] = useState({}); // State để lưu lỗi cho từng trường

    useEffect(() => {
        axios.get(`${API_URL}/admin/sanbay/getAirport/${idSanBay}`)
            .then(response => {
                setSanBay(response.data.data);
                setLoading(false);
                console.log("Data fetched for airport:", response.data.data);
            })
            .catch(error => {
                setError('Failed to fetch airport data');
                setLoading(false);
            });
    }, [idSanBay]);
    console.log(sanBay)
    const getThanhPho = async () => {
        const response = await fetch(`${API_URL}/admin/thanhpho/getAllCity`); // Thay đổi endpoint theo API của bạn
        if (!response.ok) {
            throw new Error('Failed to fetch city');
        }
        const data = await response.json(); // Chuyển đổi phản hồi thành JSON
        return data.data; // Trả về phần data bên trong JSON
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getThanhPho();
                setListThanhPho(data);
                console.log('Get list city success!!', listThanhPho)
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    console.log(listThanhPho)
    // Xử lý submit form
    const handleSubmit = async (event) => {
        event.preventDefault(); // Ngăn chặn hành động mặc định của form
        try {

            const response = await axios.put(`${API_URL}/admin/sanbay/updateAirport/${idSanBay}`, sanBay);
            console.log('Airport updated successfully!', response.data);
            message.success('Cập nhật sân bay thành công'); 
        } catch (error) {
            // Kiểm tra lỗi từ phản hồi của backend
            message.error('Cập nhật thông tin không thành công')
            if (error.response && error.response.data) {
                const errors = error.response.data.data; // Lấy danh sách lỗi từ phản hồi
                setFieldErrors(errors);
                console.log(errors) // Cập nhật lỗi cho từng trường
            } else {
                setError('There was an error updating the airport!'); // Thông báo lỗi mặc định
            }
            console.error('There was an error updating the airport!', error);
        }
    };

    // Xử lý khi người dùng thay đổi thông tin trong form
    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === 'thanhPho') {
            const selectedThanhPho = listThanhPho.find(tp => tp.idThanhPho === parseInt(value, 10));
            setSanBay({ ...sanBay, thanhPho: selectedThanhPho });
        } else {
            setSanBay({ ...sanBay, [name]: value });
        }
        // Xóa lỗi cho trường đã chỉnh sửa
        setFieldErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="container">
            <h2>Chỉnh sửa thông tin sân bay</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Tên Sân Bay:</label>
                    <input
                        type="text"
                        name="tenSanBay"
                        className={`form-control ${fieldErrors.tenSanBay ? 'is-invalid' : ''}`} // Thêm lớp is-invalid nếu có lỗi
                        value={sanBay.tenSanBay}
                        onChange={handleChange}
                    />
                    {fieldErrors.tenSanBay && <div className="invalid-feedback">{fieldErrors.tenSanBay}</div>} {/* Hiển thị thông báo lỗi */}
                </div>
                <div className="form-group">
                    <label>IATA Sân Bay:</label>
                    <input
                        type="text"
                        name="iataSanBay"
                        className={`form-control ${fieldErrors.iataSanBay ? 'is-invalid' : ''}`}
                        value={sanBay.iataSanBay}
                        onChange={handleChange}
                    />
                    {fieldErrors.iataSanBay && <div className="invalid-feedback">{fieldErrors.iataSanBay}</div>}
                </div>
                <div className="form-group">
                    <label>ICAO Sân Bay:</label>
                    <input
                        type="text"
                        name="icaoSanBay"
                        className={`form-control ${fieldErrors.icaoSanBay ? 'is-invalid' : ''}`}
                        value={sanBay.icaoSanBay}
                        onChange={handleChange}
                    />
                    {fieldErrors.icaoSanBay && <div className="invalid-feedback">{fieldErrors.icaoSanBay}</div>}
                </div>
                <div className="form-group">
                    <label>Địa chỉ:</label>
                    <input
                        type="text"
                        name="diaChi"
                        className={`form-control ${fieldErrors.soHangGheThuong ? 'is-invalid' : ''}`}
                        value={sanBay.diaChi}
                        onChange={handleChange}
                    />
                    {fieldErrors.diaChi && <div className="invalid-feedback">{fieldErrors.diaChi}</div>} 
                </div>
                <div className='form-group'>
                    <label>Thành Phố</label>
                    <select
                        name='thanhPho'
                        className={`form-control ${fieldErrors.thanhPho ? 'is-invalid' : ''}`}
                        value={sanBay.thanhPho ? sanBay.thanhPho.idThanhPho : ''}
                        onChange={handleChange}
                    >
                        <option value="">Chọn thành phố</option>
                        {listThanhPho.map((hb) => (
                            <option value={hb.idThanhPho} key={hb.idThanhPho}>
                                {hb.tenThanhPho}
                            </option>
                        ))}
                    </select>
                    {fieldErrors.thanhPho && <div className="invalid-feedback">{fieldErrors.thanhPho}</div>}
                </div>
                
                <div className="form-group">
                    <label>Trạng Thái:</label>
                    <select
                        name="trangThaiActive"
                        className={`form-control ${fieldErrors.trangThaiActive ? 'is-invalid' : ''}`}
                        value={sanBay.trangThaiActive}
                        onChange={handleChange}
                    >
                        <option value="ACTIVE">Kích hoạt</option>
                        <option value="IN_ACTIVE">Không kích hoạt</option>
                    </select>
                    {fieldErrors.trangThaiActive && <div className="invalid-feedback">{fieldErrors.trangThaiActive}</div>}
                </div>
                <div style={{display: "flex", alignItems: "center", margin: "10px"}}>
                    <div className="btn-container" style={{margin: "10px"}}>
                        <button onClick={() => navigate('/admin/sanbay')}>Quay lại</button>
                    </div>
                    <div className="btn-container" style={{margin: "10px"}}>
                        <button type="submit">Cập nhật</button>
                    </div>
                
                </div>
            </form>
        </div>
    );
};

export default SanBayEdit;