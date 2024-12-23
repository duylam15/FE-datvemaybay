import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../../../utils/axios-80802.jsx';
import { message } from 'antd';
import { PermissionEditButton } from '../../../components/Admin/Sidebar';


const API_URL = 'http://localhost:8080'; // Thay đổi theo URL API của bạn

const MayBayEdit = () => {
    const { idMayBay } = useParams();
    const [mayBay, setMayBay] = useState({
        tenMayBay: '',
        hangBay: null,
        sanBay: null,
        icaoMayBay: '',
        soHangGheThuong: '',
        soHangGheVip: '',
        soCotGheThuong: '',
        soCotGheVip: '',
        soHieu: '',
        namSanXuat: '',
        trangThaiActive: ''
    });
    const navigate = useNavigate();
    const [listHangBay, setListHangBay] = useState([]);
    const [listSanBay, setListSanBay] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [fieldErrors, setFieldErrors] = useState({}); // State để lưu lỗi cho từng trường

    useEffect(() => {
        axios.get(`${API_URL}/admin/maybay/getPlane/${idMayBay}`)
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
                console.log('Get list airline success!!', listHangBay)
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


    // Xử lý submit form
    const handleSubmit = async (event) => {
        event.preventDefault(); // Ngăn chặn hành động mặc định của form
        try {
            // Chuyển đổi kiểu dữ liệu trước khi gửi
            const updatedMayBay = {
                ...mayBay,
                soHangGheThuong: parseInt(mayBay.soHangGheThuong, 10),
                soHangGheVip: parseInt(mayBay.soHangGheVip, 10),
                namSanXuat: parseInt(mayBay.namSanXuat, 10),
            };

            const response = await axios.put(`${API_URL}/admin/maybay/updatePlane/${idMayBay}`, updatedMayBay);
            if (response.statusCode == 400) {
                const errors = response.data; // Lấy danh sách lỗi từ phản hồi
                setFieldErrors(errors);
            } else {
                message.success('Cập nhật máy bay thành công')
                navigate("/admin/maybay")
            }
                
        } catch (error) {
            // Kiểm tra lỗi từ phản hồi của backend
            message.error('Cập nhật máy bay không thành công')
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
        } else if (name == 'sanBay') {
            const selectedSanBay = listSanBay.find(sb => sb.idSanBay === parseInt(value, 10));
            setMayBay({ ...mayBay, sanBay: selectedSanBay });
        }
        else {
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
                    <div className='form-insert'>
                        <input
                            type="text"
                            name="tenMayBay"
                            className={`form-control ${fieldErrors.tenMayBay ? 'is-invalid' : ''}`} 
                            value={mayBay.tenMayBay}
                            onChange={handleChange}
                        />
                        {fieldErrors.tenMayBay && <div className="invalid-feedback">{fieldErrors.tenMayBay}</div>}
                    </div>
                     
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
                    <label>Sân Bay</label>
                    <select
                        name='sanBay'
                        className={`form-control ${fieldErrors.sanBay ? 'is-invalid' : ''}`}
                        value={mayBay.sanBay ? mayBay.sanBay.idSanBay : ''}
                        onChange={handleChange}
                    >
                        <option value="">Chọn sân bay</option>
                        {listSanBay.map((hb) => (
                            <option value={hb.idSanBay} key={hb.idSanBay}>
                                {hb.tenSanBay}
                            </option>
                        ))}
                    </select>
                    {fieldErrors.sanBay && <div className="invalid-feedback">{fieldErrors.sanBay}</div>}
                </div>
                <div className="form-group">
                    <label>ICAO Máy Bay:</label>
                    <div className='form-insert'>
                        <input
                        type="text"
                        name="icaoMayBay"
                        className={`form-control ${fieldErrors.icaoMayBay ? 'is-invalid' : ''}`}
                        value={mayBay.icaoMayBay}
                        onChange={handleChange}
                    />
                    {fieldErrors.icaoMayBay && <div className="invalid-feedback">{fieldErrors.icaoMayBay}</div>}
                    </div>
                    
                </div>
                <div className="form-group">
                    <label>Số Hàng Ghế Thường:</label>
                    <span
                        name='soHangGheThuong'
                        className='form-control'
                        value={mayBay.soHangGheThuong}
                        onChange={handleChange}
                    >
                        {mayBay.soHangGheThuong}
                    </span>
                </div>
                <div className='form-group'>
                    <label>Số Hàng Ghế VIP:</label>
                    <span
                        name='soHangGheVip'
                        className='form-control'
                        value={mayBay.soHangGheVip}
                        onChange={handleChange}
                    >
                        {mayBay.soHangGheVip}
                    </span>
                    {fieldErrors.soHangGheVip && <div className="invalid-feedback">{fieldErrors.soHangGheVip}</div>}
                </div>
                <div className='form-group'>
                    <label>Số Cột Ghế Thường:</label>
                    <span
                        name='soCotGheThuong'
                        className='form-control'
                        value={mayBay.soCotGheThuong}
                        onChange={handleChange}
                    >
                        {mayBay.soCotGheThuong}
                    </span>
                </div>
                <div className='form-group'>
                    <label>Số Cột Ghế VIP:</label>
                    <span
                        name='soCotGheVip'
                        className='form-control'
                        value={mayBay.soCotGheVip}
                        onChange={handleChange}
                    >
                        {mayBay.soCotGheVip}
                    </span>
                </div>
                <div className="form-group">
                    <label>Số Hiệu:</label>
                    <div className='form-insert'>
                        <input
                        type="text"
                        name="soHieu"
                        className={`form-control ${fieldErrors.soHieu ? 'is-invalid' : ''}`}
                        value={mayBay.soHieu}
                        onChange={handleChange}
                    />
                    {fieldErrors.soHieu && <div className="invalid-feedback">{fieldErrors.soHieu}</div>}
                    </div>
                    
                </div>
                <div className="form-group">
                    <label>Năm Sản Xuất:</label>
                    <div className='form-insert'>
                        <input
                        type="text"
                        name="namSanXuat"
                        className={`form-control ${fieldErrors.namSanXuat ? 'is-invalid' : ''}`}
                        value={mayBay.namSanXuat}
                        onChange={handleChange}
                    />
                    {fieldErrors.namSanXuat && <div className="invalid-feedback">{fieldErrors.namSanXuat}</div>}
                    </div>
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
                <div style={{ display: "flex", alignItems: "center", margin: "10px" }}>
                    <div className="btn-container" style={{ margin: "10px" }}>
                        <button onClick={() => navigate('/admin/maybay')}>Quay lại</button>
                    </div>
                    <PermissionEditButton feature="Quản lí máy bay">
                        <div className="btn-container" style={{ margin: "10px" }}>
                            <button type="submit">Cập nhật</button>
                        </div>
                    </PermissionEditButton>
                </div>
            </form>
        </div>
    );
};

export default MayBayEdit;