import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../../utils/axios-80802.jsx';
import { message } from 'antd';

const API_URL = 'http://localhost:8080';

const AddMayBayForm = () => {
    console.log('ThemMayBay');
    const [tenMayBay, setTenMayBay] = useState('');
    const [hangBay, setHangBay] = useState(null);
    const [sanBay, setSanBay] = useState(null);
    const [icaoMayBay, setIcaoMaybay] = useState('');
    const [soHangGheThuong, setSoHangGheThuong] = useState('');
    const [soCotGheThuong, setSoCotGheThuong] = useState('');
    const [soHangGheVip, setSoHangGheVip] = useState('');
    const [soCotGheVip, setSoCotGheVip] = useState('');
    const [soHieu, setSoHieu] = useState('');
    const [namSanXuat, setNamSanXuat] = useState();
    const [trangThaiActive, setTrangThaiActive] = useState('ACTIVE');
    const [listHangBay, setListHangBay] = useState([]);
    const [listSanBay, setListSanBay] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [fieldErrors, setFieldErrors] = useState({}); // Thêm state cho lỗi từng trường
    const navigate = useNavigate();

    const getHangBay = async () => {
        const response = await fetch(`${API_URL}/admin/hangbay/getAllAirline`); // Thay đổi endpoint theo API của bạn
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
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const getSanBay = async () => {
        const response = await fetch(`${API_URL}/admin/sanbay/getAllAirport`); // Thay đổi endpoint theo API của bạn
        if (!response.ok) {
            throw new Error('Failed to fetch airport');
        }
        const data = await response.json(); // Chuyển đổi phản hồi thành JSON
        return data.data; // Trả về phần data bên trong JSON
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getSanBay();
                setListSanBay(data);
            } catch (err) {
                setError(err);
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
    const handleSelectSanBay = (e) => {
        const selectedId = parseInt(e.target.value, 10);
        const selectedSanBay = listSanBay.find(sb => sb.idSanBay === selectedId);
        console.log('Selected airport: ', selectedSanBay);
        setSanBay(selectedSanBay);
    }
    console.log(listHangBay)
    // Xử lý submit form
    const handleSubmit = async (event) => {
        event.preventDefault();

        const mayBay = {
            tenMayBay,
            hangBay, 
            sanBay,
            icaoMayBay,
            soCotGheThuong,
            soHangGheThuong: parseInt(soHangGheThuong),
            soHangGheVip: parseInt(soHangGheVip),
            soCotGheVip,
            soHieu,
            namSanXuat: parseInt(namSanXuat),
            trangThaiActive
        };
        console.log('NEW PLANE: ',mayBay);
        try {
            const response = await axios.post(`${API_URL}/admin/maybay/addPlane`, mayBay);
            console.log('Plane added successfully!', response.data);
            if (response.statusCode === 400) {
                const errors = response.data; // Lấy danh sách lỗi từ phản hồi
                setFieldErrors(errors);
            } else {
                message.success('Thêm mới máy bay thành công')
                navigate("/admin/maybay")
            }
            
        } catch (error) {
            message.error('Thêm mới máy bay không thành công')
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
        <form onSubmit={handleSubmit} className='container'>
            <h2>Thêm thông tin máy bay</h2>
            <div className="form-group">
                <label>Tên Máy Bay</label>
                <div className='form-insert'>
                    <input
                        type="text"
                        className={`form-control ${fieldErrors.tenMayBay ? 'is-invalid' : ''}`} 
                        value={tenMayBay}
                        onChange={(e) => setTenMayBay(e.target.value)}
                        required
                    />
                    {fieldErrors.tenMayBay && <div className="invalid-feedback">{fieldErrors.tenMayBay}</div>}
                </div>
            </div>
            <div className="form-group">
                <label>Hãng Bay</label>
                <select
                    className={`form-control ${fieldErrors.hangBay ? 'is-invalid' : ''}`}
                    value={hangBay ? hangBay.idHangBay : ''} // Chỉ lấy ID
                    onChange={handleSelectHangBay}
                    required
                >
                    <option value="">Chọn Hãng Bay</option>
                    {listHangBay.map((hb) => (
                        <option value={hb.idHangBay} key={hb.idHangBay}>
                            {hb.tenHangBay}
                        </option>
                    ))}
                </select>
                {fieldErrors.hangBay && <div className="invalid-feedback">{fieldErrors.hangBay}</div>}
            </div>
            <div className="form-group">
                <label>Sân Bay</label>
                <select
                    className={`form-control ${fieldErrors.sanBay ? 'is-invalid' : ''}`}
                    value={sanBay ? sanBay.idSanBay : ''} // Chỉ lấy ID
                    onChange={handleSelectSanBay}
                    required
                >
                    <option value="">Chọn Sân Bay</option>
                    {listSanBay.map((hb) => (
                        <option value={hb.idSanBay} key={hb.idSanBay}>
                            {hb.tenSanBay}
                        </option>
                    ))}
                </select>
                {fieldErrors.sanBay && <div className="invalid-feedback">{fieldErrors.sanBay}</div>}
            </div>
            <div className="form-group">
                <label>ICAO Máy Bay</label>
                <div className='form-insert'>
                    <input
                        type="text"
                        className={`form-control ${fieldErrors.icaoMayBay ? 'is-invalid' : ''}`} 
                        value={icaoMayBay}
                        onChange={(e) => setIcaoMaybay(e.target.value)}
                        required
                    />
                    {fieldErrors.icaoMayBay && <div className="invalid-feedback">{fieldErrors.icaoMayBay}</div>}
                </div>
            </div>
            <div className="form-group">
                <label>Số Hàng Ghế Thường</label>
                <div className='form-insert'>
                    <input
                        type="text"
                        className={`form-control ${fieldErrors.soHangGheThuong ? 'is-invalid' : ''}`} 
                        value={soHangGheThuong}
                        onChange={(e) => setSoHangGheThuong(e.target.value)}
                        required
                    />
                    {fieldErrors.soHangGheThuong && <div className="invalid-feedback">{fieldErrors.soHangGheThuong}</div>}
                </div>
            </div>
            <div className='form-group'>
                <label>Số Cột Ghế Thường</label>
                <div className='form-insert'>
                    <input
                        type="text"
                        className={`form-control ${fieldErrors.soCotGheThuong ? 'is-invalid' : ''}`} 
                        value={soCotGheThuong}
                        onChange={(e) => setSoCotGheThuong(e.target.value)}
                        required
                    />
                    {fieldErrors.soCotGheThuong && <div className="invalid-feedback">{fieldErrors.soCotGheThuong}</div>}
                </div>
            </div>
            <div className='form-group'>
                <label>Số Hàng Ghế VIP</label>
                <div className='form-insert'>
                    <input
                        type="text"
                        className={`form-control ${fieldErrors.soHangGheVip ? 'is-invalid' : ''}`} 
                        value={soHangGheVip}
                        onChange={(e) => setSoHangGheVip(e.target.value)}
                        required
                    />
                    {fieldErrors.soHangGheVip && <div className="invalid-feedback">{fieldErrors.soHangGheVip}</div>}
                </div>
            </div>
            <div className='form-group'>
                <label>Số Cột Ghế Vip</label>
                <div className='form-insert'>
                    <input
                        type="text"
                        className={`form-control ${fieldErrors.soCotGheVip ? 'is-invalid' : ''}`} 
                        value={soCotGheVip}
                        onChange={(e) => setSoCotGheVip(e.target.value)}
                        required
                    />
                    {fieldErrors.soCotGheVip && <div className="invalid-feedback">{fieldErrors.soCotGheVip}</div>}
                </div>
            </div>
            <div className="form-group">
                <label>Số Hiệu</label>
                <div className='form-insert'>
                    <input
                        type="text"
                        className={`form-control ${fieldErrors.soHieu ? 'is-invalid' : ''}`} 
                        value={soHieu}
                        onChange={(e) => setSoHieu(e.target.value)}
                        required
                    />
                    {fieldErrors.soHieu && <div className="invalid-feedback">{fieldErrors.soHieu}</div>}
                </div>
            </div>
            <div className="form-group">
                <label>Năm Sản Xuất</label>
                <div className='form-insert'>
                    <input
                        type="number"
                        className={`form-control ${fieldErrors.namSanXuat ? 'is-invalid' : ''}`} 
                        value={namSanXuat}
                        onChange={(e) => setNamSanXuat(e.target.value)}
                        required
                    />
                    {fieldErrors.namSanXuat && <div className="invalid-feedback">{fieldErrors.namSanXuat}</div>}
                </div>
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
            
            <div style={{display: "flex", alignItems: "center", margin: "10px"}}>
                    <div className="btn-container" style={{margin: "10px"}}>
                        <button onClick={() => navigate('/admin/maybay')}>Quay lại</button>
                    </div>
                    <div className="btn-container" style={{margin: "10px"}}>
                        <button type="submit">Thêm Máy Bay</button>
                    </div>
                    
            </div>
        </form>
    );
};

export default AddMayBayForm;