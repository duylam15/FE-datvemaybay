// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// const API_URL = 'http://localhost:8080'; // Thay đổi theo URL API của bạn

// const TaiKhoanEdit = () => {
//     const { idTaiKhoan } = useParams();
//     const [taiKhoan, setTaiKhoan] = useState({
//         tenDangNhap: '',
//         matKhau: '',
//         quyen: null,
//         khachHang: null,
//         nhanVien: null,
//         thoiGianTao: '',
//         trangThaiActive: '',
//     });
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [fieldErrors, setFieldErrors] = useState({});
//     const [listNhanVien, setListNhanVien] = useState([]);
//     const [listQuyen, setListQuyen] = useState([]);
//     const [listKhachHang, setListKhachHang] = useState([]);

//     // Fetch thông tin tài khoản khi component được mount
//     useEffect(() => {
//         const fetchTaiKhoan = async () => {
//             try {
//                 const response = await axios.get(`${API_URL}/taikhoan/${idTaiKhoan}`);
//                 setTaiKhoan(response.data.data);
//                 console.log("Data fetched for account:", response.data.data);
//             } catch (error) {
//                 setError('Failed to fetch account data');
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchTaiKhoan();
//     }, [idTaiKhoan]);

//     // Fetch danh sách nhân viên
//     useEffect(() => {
//         const fetchNhanVien = async () => {
//             try {
//                 const response = await fetch(`${API_URL}/admin/nhanvien/getallnhanvien`);
//                 if (!response.ok) throw new Error('Failed to fetch nhanvien');
//                 const data = await response.json();
//                 setListNhanVien(data.data);
//                 console.log('Get list nhanvien success!!', data.data);
//             } catch (err) {
//                 setError(err.message);
//             }
//         };
//         fetchNhanVien();
//     }, []);

//     // Fetch danh sách quyền
//     useEffect(() => {
//         const fetchQuyen = async () => {
//             try {
//                 const response = await fetch(`${API_URL}/khachhang/getKhachHangChuaCoTaiKhoan`);
//                 if (!response.ok) throw new Error('Failed to fetch roles');
//                 const data = await response.json();
//                 setListQuyen(data.data.content);
//                 console.log('Get list quyen success!!', data.data.content);
//             } catch (err) {
//                 setError(err.message);
//             }
//         };
//         fetchQuyen();
//     }, []);

//     // Fetch danh sách khách hàng
//     useEffect(() => {
//         const fetchKhachHang = async () => {
//             try {
//                 const response = await fetch(`${API_URL}/khachhang/getAllCustomer`);
//                 if (!response.ok) throw new Error('Failed to fetch customers');
//                 const data = await response.json();
//                 setListKhachHang(data.data);
//                 console.log('Get list khach hang success!!', data.data);
//             } catch (err) {
//                 setError(err.message);
//             }
//         };
//         fetchKhachHang();
//     }, []);
    
//     // Xử lý submit form
//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         try {
//             const response = await axios.put(`${API_URL}/taikhoan/updateTaiKhoan/${idTaiKhoan}`, taiKhoan);
//             console.log('Account updated successfully!', response.data);
//             window.location.href = '/admin/taikhoan';
//         } catch (error) {
//             if (error.response && error.response.data) {
//                 const errors = error.response.data.data;
//                 setFieldErrors(errors);
//                 console.log(errors);
//             } else {
//                 setError('There was an error updating the account!');
//             }
//             console.error('There was an error updating the account!', error);
//         }
//     };

//     // Xử lý thay đổi thông tin trong form
//     const handleChange = (event) => {
//         const { name, value } = event.target;
//         if (name === 'nhanVien') {
//             const selectedNhanVien = listNhanVien.find(nv => nv.idNhanVien === parseInt(value, 10));
//             setTaiKhoan({ ...taiKhoan, nhanVien: selectedNhanVien });
//         } else if (name === 'quyen') {
//             const selectedQuyen = listQuyen.find(q => q.idQuyen === parseInt(value, 10));
//             setTaiKhoan({ ...taiKhoan, quyen: selectedQuyen });
//         } else if (name === 'khachHang') {
//             const selectedKhachHang = listKhachHang.find(kh => kh.idKhachHang === parseInt(value, 10));
//             setTaiKhoan({ ...taiKhoan, khachHang: selectedKhachHang });
//         } else {
//             setTaiKhoan({ ...taiKhoan, [name]: value });
//         }
//         setFieldErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
//     };

//     // if (loading) return <p>Loading...</p>;
//     if (error) return <p>Error: {error}</p>;

//     return (
//         <div className="edit-form">
//             <h2>Chỉnh sửa thông tin tài khoản</h2>
//             <form style={{ margin: '20px' }} onSubmit={handleSubmit}>
//                 <div className="mb-3">
//                     <label className="form-label">Tên đăng nhập</label>
//                     <input 
//                         type="text" 
//                         name='tenDangNhap'
//                         className={`form-control form-control-lg ${fieldErrors.tenDangNhap ? 'is-invalid' : ''}`}
//                         value={taiKhoan.tenDangNhap}
//                         onChange={handleChange}
//                         id="tenDangNhap"
//                     />
//                     {fieldErrors.tenDangNhap && <div className="invalid-feedback">{fieldErrors.tenDangNhap}</div>}
//                 </div>
//                 <div className="mb-3">
//                     <label className="form-label">Mật khẩu</label>
//                     <input 
//                         name='matKhau'
//                         type="password" 
//                         className={`form-control form-control-lg`} 
//                         value={taiKhoan.matKhau}
//                         onChange={handleChange}
//                         id="matKhau"
//                     />
//                     {fieldErrors.matKhau && <div className="invalid-feedback">{fieldErrors.matKhau}</div>}
//                 </div>

//                 <div className="mb-3">
//                     <label className="form-label">Khách hàng</label>
//                     <select className={`form-control form-control-lg ${fieldErrors.khachHang ? 'is-invalid' : ''}`} 
//                             onChange={handleChange} 
//                             value={taiKhoan.khachHang?.idKhachHang || ''} 
//                             id="khachHang"
//                             name='khachHang'
//                     >
//                         <option value="">Chọn khách hàng</option>
//                         {listKhachHang.map(kh => (
//                             <option value={kh.idKhachHang} key={kh.idKhachHang}>
//                                 {kh.idKhachHang} - {kh.hoTen}
//                             </option>
//                         ))}
//                     </select>
//                     {fieldErrors.khachHang && <div className="invalid-feedback">{fieldErrors.khachHang}</div>}
//                 </div>

//                 <div className="mb-3">
//                     <label className="form-label">Nhân viên</label>
//                     <select className={`form-control form-control-lg ${fieldErrors.nhanVien ? 'is-invalid' : ''}`} 
//                             onChange={handleChange} 
//                             value={taiKhoan.nhanVien?.idNhanVien || ''} 
//                             id="nhanVien"
//                             name='nhanVien'
//                     >
//                         <option value="">Chọn nhân viên</option>
//                         {listNhanVien.map(nv => (
//                             <option value={nv.idNhanVien} key={nv.idNhanVien}>
//                                 {nv.idNhanVien} - {nv.hoTen}
//                             </option>
//                         ))}
//                     </select>
//                     {fieldErrors.nhanVien && <div className="invalid-feedback">{fieldErrors.nhanVien}</div>}
//                 </div>

//                 <div className="mb-3">
//                     <label className="form-label">Quyền</label>
//                     <select className={`form-control form-control-lg ${fieldErrors.quyen ? 'is-invalid' : ''}`} 
//                             onChange={handleChange} 
//                             value={taiKhoan.quyen?.idQuyen || ''} 
//                             id="quyen" 
//                             name='quyen'
//                     >
//                         <option value="">Chọn quyền</option>
//                         {listQuyen.map(q => (
//                             <option value={q.idQuyen} key={q.idQuyen}>
//                                 {q.idQuyen} - {q.tenQuyen}
//                             </option>
//                         ))}
//                     </select>
//                     {fieldErrors.quyen && <div className="invalid-feedback">{fieldErrors.quyen}</div>}
//                 </div>
//                 <div className="mb-3">
//                     <label className="form-label">Thời gian tạo</label>
//                     <input 
//                         name='thoiGianTao'
//                         type="date" 
//                         className={`form-control form-control-lg`} 
//                         value={taiKhoan.thoiGianTao}
//                         onChange={handleChange}
//                         id="thoiGianTao"
//                     />
//                     {fieldErrors.thoiGianTao && <div className="invalid-feedback">{fieldErrors.thoiGianTao}</div>}
//                 </div>
//                 <div className="mb-3">
//                     <label className="form-label">Trạng thái</label>
//                     <select
//                         name='trangThaiActive'
//                         className={`form-control form-control-lg ${fieldErrors.trangThaiActive ? 'is-invalid' : ''}`} 
//                         value={taiKhoan.trangThaiActive}
//                         onChange={handleChange}
//                     >
//                         <option value="ACTIVE">Kích Hoạt</option>
//                         <option value="INACTIVE">Không Kích Hoạt</option>
//                     </select>
//                 </div>
//                 <button type="submit" className="btn btn-primary">Cập nhật</button>
//             </form>
//         </div>
//     );
// };

// export default TaiKhoanEdit;
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://localhost:8080';

const TaiKhoanEdit = () => {
    const { idTaiKhoan } = useParams();
    const [taiKhoan, setTaiKhoan] = useState({
        tenDangNhap: '',
        matKhau: '',
        quyen: null,
        khachHang: null,
        nhanVien: null,
        thoiGianTao: '',
        trangThaiActive: '',
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [fieldErrors, setFieldErrors] = useState({});
    const [listNhanVien, setListNhanVien] = useState([]);
    const [listQuyen, setListQuyen] = useState([]);
    const [listKhachHang, setListKhachHang] = useState([]);

    useEffect(() => {
        const fetchTaiKhoan = async () => {
            setLoading(true); // Thiết lập loading trước khi bắt đầu fetch
            try {
                const response = await axios.get(`${API_URL}/taikhoan/${idTaiKhoan}`);
                if (response.data && response.data.data) {
                    setTaiKhoan(response.data.data);
                    console.log("Data fetched for account:", response.data.data);
                } else {
                    throw new Error('No account data found');
                }
            } catch (error) {
                setError('Failed to fetch account data');
                console.error('Error fetching account data:', error); // Log lỗi chi tiết
            } finally {
                setLoading(false); // Đảm bảo loading được thiết lập lại ở cuối
            }
        };
    
        if (idTaiKhoan) { // Kiểm tra xem idTaiKhoan có giá trị không
            fetchTaiKhoan();
        }
    }, [idTaiKhoan]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [nhanVienResponse, quyenResponse, khachHangResponse] = await Promise.all([
                    fetch(`${API_URL}/admin/nhanvien/getallnhanvien`),
                    fetch(`${API_URL}/quyen`),
                    fetch(`${API_URL}/khachhang/getKhachHangChuaCoTaiKhoan`)
                ]);
    
                if (!nhanVienResponse.ok) throw new Error('Failed to fetch nhanvien');
                if (!quyenResponse.ok) throw new Error('Failed to fetch roles');
                if (!khachHangResponse.ok) throw new Error('Failed to fetch customers');
                
                const nhanVienData = nhanVienResponse.status === 204 ? { data: { content: [] } } : await nhanVienResponse.json();
                const quyenData = quyenResponse.status === 204 ? { data: { content: [] } } : await quyenResponse.json();
                const khachHangData = khachHangResponse.status === 204 ? { data: { content: [] } } : await khachHangResponse.json();
                
                console.log(khachHangData);

                setListNhanVien(nhanVienData.data.content || []);
                setListQuyen(quyenData.data.content || []);
                setListKhachHang(khachHangData.data || []);
                
            } catch (err) {
                setError(err.message);
                console.error('Error fetching data:', err); // Log lỗi ra console để kiểm tra
            }
        };
        fetchData();
    }, []);
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
            const response = await axios.put(`${API_URL}/taikhoan/updateTaiKhoan/${idTaiKhoan}`, taiKhoan);
            console.log('Account updated successfully!', response.data);
            window.location.href = '/admin/taikhoan';
        } catch (error) {
            if (error.response && error.response.data) {
                const errors = error.response.data.data;
                setFieldErrors(errors);
                console.log(errors);
            } else {
                setError('There was an error updating the account!');
            }
            console.error('There was an error updating the account!', error);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === 'nhanVien') {
            const selectedNhanVien = listNhanVien.find(nv => nv.idNhanVien === parseInt(value, 10));
            setTaiKhoan({ ...taiKhoan, nhanVien: selectedNhanVien });
        } else if (name === 'quyen') {
            const selectedQuyen = listQuyen.find(q => q.idQuyen === parseInt(value, 10));
            setTaiKhoan({ ...taiKhoan, quyen: selectedQuyen });
        } else if (name === 'khachHang') {
            const selectedKhachHang = listKhachHang.find(kh => kh.idKhachHang === parseInt(value, 10));
            setTaiKhoan({ ...taiKhoan, khachHang: selectedKhachHang });
        } else {
            setTaiKhoan({ ...taiKhoan, [name]: value });
        }
        setFieldErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
    };
    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="edit-form">
            <h2>Chỉnh sửa thông tin tài khoản</h2>
                <form style={{ margin: '20px' }} onSubmit={handleSubmit}>
                 <div className="mb-3">
                     <label className="form-label">Tên đăng nhập</label>
                     <input 
                        type="text" 
                        name='tenDangNhap'
                        className={`form-control form-control-lg `}
                        value={taiKhoan.tenDangNhap}
                        onChange={handleChange}
                        id="tenDangNhap"
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Mật khẩu</label>
                    <input 
                        name='matKhau'
                        type="password" 
                        className={`form-control form-control-lg`} 
                        value={taiKhoan.matKhau}
                        onChange={handleChange}
                        id="matKhau"
                    />
                </div>

                {taiKhoan.khachHang ? (
                    <div className="mb-3">
                        <label className="form-label">Khách hàng</label>
                        <select
                            className={`form-control form-control-lg`}
                            onChange={handleChange}
                            value={taiKhoan.khachHang?.idKhachHang || ''} // Sử dụng '' làm giá trị mặc định
                            id="khachHang"
                            name="khachHang"
                        >
                            <option value={taiKhoan.khachHang.idKhachHang}>{taiKhoan.khachHang.hoTen}</option>
                            {listKhachHang.map((kh) => (
                                <option value={kh.idKhachHang} key={kh.idKhachHang}>
                                    {kh.idKhachHang} - {kh.hoTen}
                                </option>
                            ))}
                        </select>
                    </div>
                ) : (
                    <>
                    <div className="mb-3">
                        <label className="form-label">Nhân viên</label>
                        <select
                            className={`form-control form-control-lg`}
                            onChange={handleChange}
                            value={taiKhoan.nhanVien?.idNhanVien || ''}
                            id="nhanVien"
                            name="nhanVien"
                        >
                            {listNhanVien.map((nv) => (
                                <option value={nv.idNhanVien} key={nv.idNhanVien}>
                                    {nv.idNhanVien} - {nv.hoTen}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-3">
                    <label className="form-label">Quyền</label>
                    <select className={`form-control form-control-lg`} 
                            onChange={handleChange} 
                            value={taiKhoan.quyen?.idQuyen || ''} 
                            id="quyen" 
                            name='quyen'
                    >
                        <option value="">Chọn quyền</option>
                        {listQuyen.map(q => (
                            <option value={q.idQuyen} key={q.idQuyen}>
                                {q.idQuyen} - {q.tenQuyen}
                            </option>
                        ))}
                    </select>
                    </div>
                    </>
                )}

                
                <div className="mb-3">
                    <label className="form-label">Thời gian tạo</label>
                    <input 
                        name='thoiGianTao'
                        type="date" 
                        className={`form-control form-control-lg`} 
                        value={taiKhoan.thoiGianTao}
                        onChange={handleChange}
                        id="thoiGianTao"
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Trạng thái</label>
                    <select
                        name='trangThaiActive'
                        className={`form-control form-control-lg`} 
                        value={taiKhoan.trangThaiActive}
                        onChange={handleChange}
                    >
                        <option value="ACTIVE">Kích Hoạt</option>
                        <option value="INACTIVE">Không Kích Hoạt</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Cập nhật</button>
            </form>
        </div>
    );
};

export default TaiKhoanEdit;
