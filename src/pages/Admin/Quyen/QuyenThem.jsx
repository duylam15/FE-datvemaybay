import React, { useEffect, useState } from 'react';
import './themQuyen.css';
import { Input } from 'antd';
import { GradientButton, GradientButtonBack, GradientButtonCancel } from '../../../components/Admin/GradientButton';
import { getAllChucNang } from '../../../services/quyenService';
import { useNavigate } from 'react-router-dom';

const QuyenThem = () => {
    const [chucNang, setChucNang] = useState([]);
    const [permissions, setPermissions] = useState({});
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

    const handleBack = () => {
        console.log("backkk")
        navigate('/admin/quyen');
    };

    const handleCancel = () => {
        const resetPermissions = Object.keys(permissions).reduce((acc, key) => {
            acc[key] = { view: false, create: false, edit: false, delete: false };
            return acc;
        }, {});
        setPermissions(resetPermissions);
    };

    return (
        <div className='them_quyen_container'>
            <h1 className="title">Thêm nhóm quyền</h1>
            <Input placeholder="Nhập tên nhóm quyền" />
            <table className='table'>
                <thead>
                    <tr>
                        <td>Danh mục chức năng</td>
                        <td>Xem</td>
                        <td>Tạo mới</td>
                        <td>Sửa</td>
                        <td>Xoá</td>
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
                                <input
                                    type='checkbox'
                                    checked={permissions[item.tenChucNang]?.create || false}
                                    onChange={() => handleCheckboxChange(item.tenChucNang, 'create')}
                                />
                            </td>
                            <td>
                                <input
                                    type='checkbox'
                                    checked={permissions[item.tenChucNang]?.edit || false}
                                    onChange={() => handleCheckboxChange(item.tenChucNang, 'edit')}
                                />
                            </td>
                            <td>
                                <input
                                    type='checkbox'
                                    checked={permissions[item.tenChucNang]?.delete || false}
                                    onChange={() => handleCheckboxChange(item.tenChucNang, 'delete')}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className='row_last'>
                <div onClick={handleBack}> <GradientButtonBack /> </div>
                
                <div className="btn_row_last">
                <div onClick={handleCancel}> <GradientButtonCancel/> </div>
                <div > <GradientButton /></div>

                </div>
            </div>
        </div>
    );
};

export default QuyenThem;