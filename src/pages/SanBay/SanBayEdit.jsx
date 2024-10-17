import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
const API_URL = 'http://localhost:8080';
const SanBayEdit = () => {
    const {idSanBay} = useParams();
    const [sanBay, setSanBay] = useState({
        tenSanBay: '',
        iataSanBay: '',
        icaoSanBay: '',
        diaChi: '',
        thanhPho: null,
        trangThaiActive: ''
    })
    const [listCity, setListCity] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [fieldErrors, setFieldErrors] = useState({});

    useEffect(() => {
        axios.get(`${API_URL}/getAirport/${idSanBay}`)
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
    
    const getThanhPho = async() => {
        const response = await fetch(`${API_URL}/getAllCity`); // Thay đổi endpoint theo API của bạn
        if (!response.ok) {
            throw new Error('Failed to fetch airline');
        }
        const data = await response.json(); // Chuyển đổi phản hồi thành JSON
        return data.data; // Trả về phần data bên trong JSON
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getThanhPho();
                setListCity(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    });
    const handleSubmit = async(event) => {
        event.preventDefault();
        try {
            const response = await axios.put(`${API_URL}/updateAirport/${idSanBay}`, sanBay);
            console.log('Airport updated successfully!', response.data);
            window.location.href = '/airports'; 
        } catch (error) {
            if (error.response && error.response.data) {
                const errors = error.response.data.data; // Lấy danh sách lỗi từ phản hồi
                setFieldErrors(errors);
                console.log(errors) // Cập nhật lỗi cho từng trường
            } else {
                setError('There was an error updating the airport!'); // Thông báo lỗi mặc định
            }
            console.error('There was an error updating the airport!', error);
        }
    }
    
    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === 'thanhPho') {
            console.log(listCity);
            const selectedCity = listCity.find(ct => ct.idThanhPho === parseInt(value, 10));
            setSanBay({...sanBay, thanhPho: selectedCity});
            console.log('Selected city: ', selectedCity);
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
                        className={`form-control ${fieldErrors.iataSanBay ? 'is-invalid' : ''}`} // Thêm lớp is-invalid nếu có lỗi
                        value={sanBay.iataSanBay}
                        onChange={handleChange}
                    />
                    {fieldErrors.tenSanBay && <div className="invalid-feedback">{fieldErrors.tenSanBay}</div>} {/* Hiển thị thông báo lỗi */}
                </div>
                <div className="form-group">
                    <label>ICAO Sân Bay:</label>
                    <input
                        type="text"
                        name="icaoSanBay"
                        className={`form-control ${fieldErrors.icaoSanBay ? 'is-invalid' : ''}`} // Thêm lớp is-invalid nếu có lỗi
                        value={sanBay.icaoSanBay}
                        onChange={handleChange}
                    />
                    {fieldErrors.icaoSanBay && <div className="invalid-feedback">{fieldErrors.icaoSanBay}</div>} {/* Hiển thị thông báo lỗi */}
                </div>
                <div className="form-group">
                    <label>Địa Chỉ:</label>
                    <input
                        type="text"
                        name="diaChi"
                        className={`form-control ${fieldErrors.diaChi ? 'is-invalid' : ''}`} // Thêm lớp is-invalid nếu có lỗi
                        value={sanBay.diaChi}
                        onChange={handleChange}
                    />
                    {fieldErrors.diaChi && <div className="invalid-feedback">{fieldErrors.diaChi}</div>} {/* Hiển thị thông báo lỗi */}
                </div>
                <div className="form-group">
                    <label>Thành Phố</label>
                    <select
                        name="thanhPho"
                        className={`form-control ${fieldErrors.thanhPho ? 'is-invalid' : ''}`}
                        value={sanBay.thanhPho ? sanBay.thanhPho.idThanhPho : ''}
                        onChange={handleChange}
                    >
                        <option value="">Chọn Thành Phố</option>
                        {listCity.map((ct) => (
                            <option value={ct.idThanhPho} key={ct.idThanhPho}>
                                {ct.tenThanhPho}
                            </option>
                        ))}
                    </select>
                    {fieldErrors.thanhPho && <div className="invalid-feedback">{fieldErrors.thanhPho}</div>}
                </div>
                <div className="form-group">
                    <label>Trạng Thái</label>
                    <select
                        name="trangThaiActive"
                        className={`form-control ${fieldErrors.trangThaiActive ? 'is-invalid' : ''}`} 
                        value={sanBay.trangThaiActive}
                        onChange={handleChange}
                    >
                        <option value="ACTIVE">Kích Hoạt</option>
                        <option value="IN_ACTIVE">Không Kích Hoạt</option>
                    </select>
                    {fieldErrors.trangThaiActive && <div className="invalid-feedback">{fieldErrors.trangThaiActive}</div>}
                </div>
                <button type="submit" className="btn btn-primary">Cập nhật</button>            </form>
        </div>
    )
}
export default SanBayEdit;