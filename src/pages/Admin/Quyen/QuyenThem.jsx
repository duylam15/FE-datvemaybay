import React, { useEffect, useState } from 'react';
import './themQuyen.css';
import { Input } from 'antd';
import { GradientButton, GradientButtonBack, GradientButtonCancel } from '../../../components/Admin/GradientButton';
import { getAllChucNang, themQuyen } from '../../../services/quyenService';
import { useNavigate } from 'react-router-dom';
import ChonTatCa from '../../../components/Admin/ButtonForTableQuyen/ChonTatCa';
import HuyChonTatCa from '../../../components/Admin/ButtonForTableQuyen/HuyChonTatCa';
import { notification } from 'antd';

// Function to open a notification
const openNotification = (type, message, description) => {
    notification[type]({
        message: message,
        description: description,
        duration: 2, // Duration in seconds
    });
};

const QuyenThem = () => {
    const [chucNang, setChucNang] = useState([]);
    const [permissions, setPermissions] = useState({});
    const [tenQuyen, setTenQuyen] = useState("")
    const navigate = useNavigate();

    useEffect(() => {
        getAllChucNang()
            .then(response => {
                console.log("oke ne : ", response);
                setChucNang(response.data);
                const initialPermissions = response.data.reduce((acc, item) => {
                    acc[item.tenChucNang] = { view: false, create: false, edit: false, delete: false };
                    return acc;
                }, {});
                setPermissions(initialPermissions);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }, []);

    const handleCheckboxChange = (tenChucNang, permissionType) => {
        setPermissions(prev => ({
            ...prev,
            [tenChucNang]: {
                ...prev[tenChucNang],
                [permissionType]: !prev[tenChucNang][permissionType]
            }
        }));
    };

    const selectAllRow = (tenChucNang) => {
        setPermissions(prev => ({
            ...prev,
            [tenChucNang]: {
                view: true,
                create: true,
                edit: true
            }
        }));
    };

    const deselectAllRow = (tenChucNang) => {
        setPermissions(prev => ({
            ...prev,
            [tenChucNang]: {
                view: false,
                create: false,
                edit: false
            }
        }));
    };

    const handleBack = () => {
        console.log("backkk")
        navigate('/admin/quyen');
    };

    const handleCancel = () => {
        const resetPermissions = Object.keys(permissions).reduce((acc, key) => {
            acc[key] = { view: false, create: false, edit: false };
            return acc;
        }, {});
        setPermissions(resetPermissions);
    };
    console.log("23456789")
    console.log(permissions);
    
    const handleSubmit = () => {
        if(tenQuyen.length == 0) {
            openNotification('error', 'Thêm quyền thất bại', 'Tên quyền không được để trống');
            return;
        }
        // Assume that `chucNang` holds the mapping of tenChucNang to idChucNang
        const permissionsToSend = Object.entries(permissions)
            .flatMap(([key, value]) => {
                const actions = []; // Array to hold actions for the current permission
                if (value.create) actions.push({ idChucNang: chucNang.find(c => c.tenChucNang === key)?.idChucNang, hanhDong: 'CREATE' });
                if (value.edit) actions.push({ idChucNang: chucNang.find(c => c.tenChucNang === key)?.idChucNang, hanhDong: 'EDIT' });
                if (value.view) actions.push({ idChucNang: chucNang.find(c => c.tenChucNang === key)?.idChucNang, hanhDong: 'VIEW' });
                return actions; // Return the actions for the current permission
            });
    
        const dataToSend = {
            tenQuyen: tenQuyen, // Assuming tenQuyen is your group name
            chiTietQuyenDTO: permissionsToSend,
        };

        console.log("data to send: " , dataToSend)
    
        // Now, send dataToSend to your API
        themQuyen(dataToSend)
            .then(response => {
                if(response.statusCode == 201) {
                    console.log("Thêm quyền thành công:", response);
                    openNotification('success', 'Thêm quyền thành công', 'Quyền đã được thêm vào hệ thống.');
                } else if(response.statusCode == 400) {
                    openNotification('error', 'Thêm quyền thất bại', 'Tên quyền đã tồn tại');
                } else {
                    openNotification('error', 'Thêm quyền thất bại', 'Lỗi ngoài dự đoán');
                }
            })
            .catch(error => {
                openNotification('error', 'Thêm quyền thất bại', 'Có lỗi xảy ra khi thêm quyền.');
                console.error("Lỗi khi thêm quyền:", error);
            });
    };

    return (
        <div className='them_quyen_container'>
            <h1 className="title">Thêm nhóm quyền</h1>
            <Input placeholder="Nhập tên nhóm quyền"
            value={tenQuyen}
            onChange={(e) => setTenQuyen(e.target.value)}
            />
            <table className='table'>
                <thead>
                    <tr>
                        <td>Danh mục chức năng</td>
                        <td>Xem</td>
                        <td>Tạo mới</td>
                        <td>Sửa</td>
                        <td>Hành động</td>
                    </tr>
                </thead>
                <tbody>
                    {chucNang.map((item, index) => (
                        <tr key={index}>
                            <td>{item.tenChucNang}</td>
                            <td>
                                <input
                                    type='checkbox'
                                    checked={permissions[item.tenChucNang]?.view || false}
                                    onChange={() => handleCheckboxChange(item.tenChucNang, 'view')}
                                />
                            </td>
                            <td>
                                {item.tenChucNang !== "Quản lí đánh giá" && item.tenChucNang !== "Quản lí thống kê" && item.tenChucNang !== "Quản lí vé" && (
                                    <input
                                        type="checkbox"
                                        checked={permissions[item.tenChucNang]?.create || false}
                                        onChange={() => handleCheckboxChange(item.tenChucNang, 'create')}
                                    />
                                )}
                            </td>
                            <td>
                                {item.tenChucNang !== "Quản lí thống kê" && item.tenChucNang !== "Quản lí hoá đơn" && (
                                    <input
                                        type='checkbox'
                                        checked={permissions[item.tenChucNang]?.edit || false}
                                        onChange={() => handleCheckboxChange(item.tenChucNang, 'edit')}
                                    />
                                )}
                            </td>
                            <td>
                                <div className="btn_row">
                                    <div onClick={() => selectAllRow(item.tenChucNang)}>
                                        <ChonTatCa />
                                    </div>
                                    <div onClick={() => deselectAllRow(item.tenChucNang)}>
                                        <HuyChonTatCa />
                                    </div>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className='row_last'>
                <div onClick={handleBack}> <GradientButtonBack /> </div>
                
                <div className="btn_row_last">
                <div onClick={handleCancel}> <GradientButtonCancel/> </div>
                <div onClick={handleSubmit}> <GradientButton /></div>

                </div>
            </div>
        </div>
    );
};

export default QuyenThem;