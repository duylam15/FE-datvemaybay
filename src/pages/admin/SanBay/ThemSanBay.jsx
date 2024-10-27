import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://localhost:8080';

const AddSanBayForm = () => {
    console.log('ThemSanBay');
    const [tenSanBay, setTenSanBay] = useState('');
    const [iataSanBay, setIataSanBay] = useState('');
    const [icaoSanBay, setIcaoSanBay] = useState('');
    const [diaChi, setDiaChi] = useState('');
    const [thanhPho, setThanhPho] = useState(null);
    const [trangThaiActive, setTrangThaiActive] = useState('ACTIVE');
    const [listThanhPho, setListThanhPho] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [fieldErrors, setFieldErrors] = useState({}); // Thêm state cho lỗi từng trường
    const navigate = useNavigate();

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
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);


    const handleSelectThanhPho = (e) => {
        const selectedId = parseInt(e.target.value, 10); // Lấy value từ sự kiện
        const selectedCity = listThanhPho.find(hb => hb.idThanhPho === selectedId); // Tìm hãng bay theo ID
        console.log('Selected city: ', selectedCity);
        setThanhPho(selectedCity);
    };
    console.log(listThanhPho)
    // Xử lý submit form
    const handleSubmit = async (event) => {
        event.preventDefault();

        const SanBay = {
            tenSanBay,
            iataSanBay,
            icaoSanBay,
            diaChi,
            thanhPho,
            trangThaiActive
        };
        console.log(SanBay);
        try {
            const response = await axios.post(`${API_URL}/admin/sanbay/addAirport`, SanBay);
            console.log('Airport added successfully!', response.data);
            navigate('/admin/sanbay'); 
        } catch (error) {
            // Kiểm tra lỗi từ phản hồi của backend
            if (error.response && error.response.data) {
                const errors = error.response.data.data; // Lấy danh sách lỗi từ phản hồi
                setFieldErrors(errors); // Cập nhật lỗi cho từng trường
            } else {
                setError('Đã xảy ra lỗi trong quá trình thêm sân bay!'); // Đặt thông báo lỗi chung
            }
            console.error('There was an error adding the Airport!', error);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    return (
        <form onSubmit={handleSubmit} className='form-add-Airport'>
            <h2>Thêm thông tin sân bay</h2>
            <div className="form-group">
                <label>Tên Sân Bay</label>
                <input
                    type="text"
                    className={`form-control ${fieldErrors.tenSanBay ? 'is-invalid' : ''}`} 
                    value={tenSanBay}
                    onChange={(e) => setTenSanBay(e.target.value)}
                    required
                />
                {fieldErrors.tenSanBay && <div className="invalid-feedback">{fieldErrors.tenSanBay}</div>}
            </div>
            <div className="form-group">
                <label>IATA Sân Bay</label>
                <input
                    type="text"
                    className={`form-control ${fieldErrors.iataSanBay ? 'is-invalid' : ''}`} 
                    value={iataSanBay}
                    onChange={(e) => setIataSanBay(e.target.value)}
                    required
                />
                {fieldErrors.iataSanBay && <div className="invalid-feedback">{fieldErrors.iataSanBay}</div>}
            </div>
            <div className="form-group">
                <label>ICAO Sân Bay</label>
                <input
                    type="text"
                    className={`form-control ${fieldErrors.icaoSanBay ? 'is-invalid' : ''}`} 
                    value={icaoSanBay}
                    onChange={(e) => setIcaoSanBay(e.target.value)}
                    required
                />
                {fieldErrors.icaoSanBay && <div className="invalid-feedback">{fieldErrors.icaoSanBay}</div>}
            </div>
            <div className="form-group">
                <label>Địa chỉ</label>
                <input
                    type="text"
                    className={`form-control ${fieldErrors.diaChi ? 'is-invalid' : ''}`} 
                    value={diaChi}
                    onChange={(e) => setDiaChi(e.target.value)}
                    required
                />
                {fieldErrors.diaChi && <div className="invalid-feedback">{fieldErrors.diaChi}</div>}
            </div>
            <div className='form-group'>
                <label>Thành Phố</label>
                <select
                    className={`form-control ${fieldErrors.thanhPho ? 'is-invalid' : ''}`}
                    value={thanhPho ? thanhPho.idThanhPho : ""} // Chỉ lấy ID
                    onChange={handleSelectThanhPho}
                    required
                >
                    <option value="">Chọn Thành Phố</option>
                    {listThanhPho.map((hb) => (
                        <option value={hb.idThanhPho} key={hb.idThanhPho}>
                            {hb.tenThanhPho}
                        </option>
                    ))}
                </select>
                {fieldErrors.thanhPho && <div className="invalid-feedback">{fieldErrors.thanhPho}</div>}
            </div>
            
            <div className="form-group">
                <label>Trạng Thái</label>
                <select
                    className={`form-control ${fieldErrors.trangThaiActive ? 'is-invalid' : ''}`} 
                    value={trangThaiActive}
                    onChange={(e) => setTrangThaiActive(e.target.value)}
                >
                    <option value="ACTIVE">Kích Hoạt</option>
                    <option value="IN_ACTIVE">Không Kích Hoạt</option>
                </select>
                {fieldErrors.trangThaiActive && <div className="invalid-feedback">{fieldErrors.trangThaiActive}</div>}
            </div>
            {error && <div className="alert alert-danger">{error}</div>} 
            <div className="btn-container">
                <button type="submit" className="btn btn-primary">Thêm Sân Bay</button>
            </div>
        </form>
    );
};

export default AddSanBayForm;