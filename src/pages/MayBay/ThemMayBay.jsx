import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://localhost:8080';

const AddMayBayForm = () => {
    const [tenMayBay, setTenMayBay] = useState('');
    const [hangBay, setHangBay] = useState(null);
    const [icaoMayBay, setIcaoMaybay] = useState('');
    const [soLuongGhe, setSoLuongGhe] = useState('');
    const [soHieu, setSoHieu] = useState('');
    const [namSanXuat, setNamSanXuat] = useState();
    const [trangThaiActive, setTrangThaiActive] = useState('ACTIVE');
    const [listHangBay, setListHangBay] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [fieldErrors, setFieldErrors] = useState({}); // Thêm state cho lỗi từng trường
    const navigate = useNavigate();

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
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);


    const handleSelectHangBay = (e) => {
        const selectedId = parseInt(e.target.value, 10); // Lấy value từ sự kiện
        const selectedHangBay = listHangBay.find(hb => hb.idHangBay === selectedId); // Tìm hãng bay theo ID
        console.log('Selected airline: ', selectedHangBay);
        setHangBay(selectedHangBay);
    };
    console.log(listHangBay)
    // Xử lý submit form
    const handleSubmit = async (event) => {
        event.preventDefault();

        const mayBay = {
            tenMayBay,
            hangBay, // Gửi ID của hãng bay
            icaoMayBay,
            soLuongGhe: parseInt(soLuongGhe),
            soHieu,
            namSanXuat: parseInt(namSanXuat),
            trangThaiActive
        };

        try {
            const response = await axios.post(`${API_URL}/addPlane`, mayBay);
            console.log('Plane added successfully!', response.data);
            navigate('/planes'); 
        } catch (error) {
            // Kiểm tra lỗi từ phản hồi của backend
            if (error.response && error.response.data) {
                const errors = error.response.data.data; // Lấy danh sách lỗi từ phản hồi
                setFieldErrors(errors); // Cập nhật lỗi cho từng trường
            } else {
                setError('Đã xảy ra lỗi trong quá trình thêm máy bay!'); // Đặt thông báo lỗi chung
            }
            console.error('There was an error adding the plane!', error);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Tên Máy Bay</label>
                <input
                    type="text"
                    className={`form-control ${fieldErrors.tenMayBay ? 'is-invalid' : ''}`} 
                    value={tenMayBay}
                    onChange={(e) => setTenMayBay(e.target.value)}
                    required
                />
                {fieldErrors.tenMayBay && <div className="invalid-feedback">{fieldErrors.tenMayBay}</div>}
            </div>
            <div className="form-group">
                <label>Hãng Bay</label>
                <select
                    className={`form-control ${fieldErrors.hangBay ? 'is-invalid' : ''}`}
                    value={hangBay ? hangBay.idHangBay : ''}
                    onChange={handleSelectHangBay}
                    required
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
                <label>ICAO Máy Bay</label>
                <input
                    type="text"
                    className={`form-control ${fieldErrors.icaoMayBay ? 'is-invalid' : ''}`} 
                    value={icaoMayBay}
                    onChange={(e) => setIcaoMaybay(e.target.value)}
                    required
                />
                {fieldErrors.icaoMayBay && <div className="invalid-feedback">{fieldErrors.icaoMayBay}</div>}
            </div>
            <div className="form-group">
                <label>Số Lượng Ghế</label>
                <input
                    type="text"
                    className={`form-control ${fieldErrors.soLuongGhe ? 'is-invalid' : ''}`} 
                    value={soLuongGhe}
                    onChange={(e) => setSoLuongGhe(e.target.value)}
                    required
                />
                {fieldErrors.soLuongGhe && <div className="invalid-feedback">{fieldErrors.soLuongGhe}</div>}
            </div>
            <div className="form-group">
                <label>Số Hiệu</label>
                <input
                    type="text"
                    className={`form-control ${fieldErrors.soHieu ? 'is-invalid' : ''}`} 
                    value={soHieu}
                    onChange={(e) => setSoHieu(e.target.value)}
                    required
                />
                {fieldErrors.soHieu && <div className="invalid-feedback">{fieldErrors.soHieu}</div>}
            </div>
            <div className="form-group">
                <label>Năm Sản Xuất</label>
                <input
                    type="number"
                    className={`form-control ${fieldErrors.namSanXuat ? 'is-invalid' : ''}`} 
                    value={namSanXuat}
                    onChange={(e) => setNamSanXuat(e.target.value)}
                    required
                />
                {fieldErrors.namSanXuat && <div className="invalid-feedback">{fieldErrors.namSanXuat}</div>}
            </div>
            <div className="form-group">
                <label>Trạng Thái</label>
                <select
                    className={`form-control ${fieldErrors.trangThaiActive ? 'is-invalid' : ''}`} 
                    value={trangThaiActive}
                    onChange={(e) => setTrangThaiActive(e.target.value)}
                >
                    <option value="ACTIVE">Kích Hoạt</option>
                    <option value="INACTIVE">Không Kích Hoạt</option>
                </select>
                {fieldErrors.trangThaiActive && <div className="invalid-feedback">{fieldErrors.trangThaiActive}</div>}
            </div>
            {error && <div className="alert alert-danger">{error}</div>} 
            <button type="submit" className="btn btn-primary">Thêm Máy Bay</button>
        </form>
    );
};

export default AddMayBayForm;