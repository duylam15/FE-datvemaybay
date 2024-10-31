import React, { useEffect, useState } from 'react';
import './themQuyen.css';
import { Input } from 'antd';
import { GradientButton, GradientButtonBack, GradientButtonCancel } from '../../../components/Admin/GradientButton';
import { getAllChucNang, getChiTietQuyenTheoId } from '../../../services/quyenService';
import { useNavigate, useParams } from 'react-router-dom';
import ChonTatCa from '../../../components/Admin/ButtonForTableQuyen/ChonTatCa';
import HuyChonTatCa from '../../../components/Admin/ButtonForTableQuyen/HuyChonTatCa';

const QuyenEdit = () => {
    const { idQuyen } = useParams();
    const [chucNang, setChucNang] = useState([]);
    const [permissions, setPermissions] = useState({});
    const [initialPermissions, setInitialPermissions] = useState({}); // State để lưu quyền ban đầu
    const [tenQuyen, setTenQuyen] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Lấy tất cả các chức năng và khởi tạo các quyền cho từng chức năng
                const chucNangResponse = await getAllChucNang();
                setChucNang(chucNangResponse.data);

                const initialPermissions = chucNangResponse.data.reduce((acc, item) => {
                    acc[item.tenChucNang] = { view: false, create: false, edit: false, delete: false };
                    return acc;
                }, {});
                setPermissions(initialPermissions);
                setInitialPermissions(initialPermissions); // Lưu quyền ban đầu

                // Lấy thông tin quyền theo ID sau khi permissions đã được khởi tạo
                const quyenResponse = await getChiTietQuyenTheoId(idQuyen);
                setTenQuyen(quyenResponse.data.tenQuyen);

                // Cập nhật các quyền từ API
                const updatedPermissions = { ...initialPermissions };
                quyenResponse.data.chiTietQuyenDTOList.forEach(({ tenChucNang, hanhDong }) => {
                    if (updatedPermissions[tenChucNang]) {
                        updatedPermissions[tenChucNang][hanhDong.toLowerCase()] = true;
                    }
                });
                setPermissions(updatedPermissions);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [idQuyen]);

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
        navigate('/admin/quyen');
    };

    const handleCancel = () => {
        setPermissions(initialPermissions); // Quay trở lại trạng thái ban đầu
    };

    const selectAllRow = (tenChucNang) => {
        setPermissions(prev => ({
            ...prev,
            [tenChucNang]: {
                view: true,
                create: true,
                edit: true,
                delete: true
            }
        }));
    };

    const deselectAllRow = (tenChucNang) => {
        setPermissions(prev => ({
            ...prev,
            [tenChucNang]: {
                view: false,
                create: false,
                edit: false,
                delete: false
            }
        }));
    };

    return (
        <div className='them_quyen_container'>
            <h1 className="title">Chỉnh sửa nhóm quyền</h1>
            <Input
                placeholder="Nhập tên nhóm quyền"
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
                        <td>Xoá</td>
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
                    <div onClick={handleCancel}> <GradientButtonCancel /> </div>
                    <div> <GradientButton /> </div>
                </div>
            </div>
        </div>
    );
};

export default QuyenEdit;