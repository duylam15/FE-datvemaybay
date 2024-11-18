import React, { useEffect, useState } from 'react';
import './themQuyen.css';
import { Input, message } from 'antd';
import { GradientButton, GradientButtonBack, GradientButtonCancel } from '../../../components/Admin/GradientButton';
import { getAllChucNang, getChiTietQuyenTheoId, suaQuyen } from '../../../services/quyenService';
import { useNavigate, useParams } from 'react-router-dom';
import ChonTatCa from '../../../components/Admin/ButtonForTableQuyen/ChonTatCa';
import HuyChonTatCa from '../../../components/Admin/ButtonForTableQuyen/HuyChonTatCa';
import { Select } from 'antd';
import { PermissionEditButton } from '../../../components/Admin/Sidebar';

const QuyenEdit = () => {
    const { idQuyen } = useParams();
    const [chucNang, setChucNang] = useState([]);
    const [permissions, setPermissions] = useState({});
    const [initialPermissions, setInitialPermissions] = useState({});
    const [tenQuyen, setTenQuyen] = useState("");
    const navigate = useNavigate();
    const { Option } = Select;
    const [selectedValue, setSelectedValue] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const chucNangResponse = await getAllChucNang();
                setChucNang(chucNangResponse.data);

                const initialPermissions = chucNangResponse.data.reduce((acc, item) => {
                    acc[item.tenChucNang] = { view: false, create: false, edit: false };
                    return acc;
                }, {});
                setPermissions(initialPermissions);
                setInitialPermissions(initialPermissions);

                const quyenResponse = await getChiTietQuyenTheoId(idQuyen);
                setTenQuyen(quyenResponse.data.tenQuyen);
                setSelectedValue(quyenResponse.data.trangThaiActive);

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
        if (tenChucNang === "Quản lí nhóm quyền" && idQuyen == 1 || tenChucNang === "Quản lí nhóm quyền" && idQuyen == 2) return; // Không cho phép thay đổi quyền này
        setPermissions(prev => ({
            ...prev,
            [tenChucNang]: {
                ...prev[tenChucNang],
                [permissionType]: !prev[tenChucNang][permissionType],
            },
        }));
    };

    const handleBack = () => {
        navigate('/admin/quyen');
    };

    const handleCancel = () => {
        setPermissions(initialPermissions);
        setSelectedValue(selectedValue);
    };

    const selectAllRow = (tenChucNang) => {
        if (tenChucNang === "Quản lí nhóm quyền" && idQuyen == 1 || tenChucNang === "Quản lí nhóm quyền" && idQuyen == 2) return; // Không cho phép chọn tất cả với quyền này
        setPermissions(prev => ({
            ...prev,
            [tenChucNang]: {
                view: true,
                create: true,
                edit: true,
            },
        }));
    };

    const deselectAllRow = (tenChucNang) => {
        if (tenChucNang === "Quản lí nhóm quyền" && idQuyen == 1 || tenChucNang === "Quản lí nhóm quyền" && idQuyen == 2) return; // Không cho phép huỷ chọn tất cả với quyền này
        setPermissions(prev => ({
            ...prev,
            [tenChucNang]: {
                view: false,
                create: false,
                edit: false,
            },
        }));
    };

    const handleUpdatePermissions = async () => {
        const permissionsToSend = Object.entries(permissions).flatMap(([key, value]) =>
            Object.entries(value)
                .filter(([, isAllowed]) => isAllowed)
                .map(([action]) => ({
                    idChucNang: chucNang.find(chucNang => chucNang.tenChucNang === key)?.idChucNang,
                    hanhDong: action.toUpperCase(),
                }))
        );

        const dataToSend = {
            tenQuyen,
            chiTietQuyenDTO: permissionsToSend,
            activeEnum: selectedValue,
        };

        suaQuyen(idQuyen, dataToSend)
            .then(response => {
                if (response.statusCode === 200) {
                    message.success('Cập nhật quyền thành công!');
                } else if (response.statusCode === 234) {
                    message.error('Tên quyền đã tồn tại!');
                } else {
                    message.error('Tên quyền không bỏ trống!');
                }
            })
            .catch(error => {
                message.error('Có lỗi xảy ra khi thêm quyền.');
                console.error("Lỗi khi thêm quyền:", error);
            });
    };

    const handleChangeSelectBox = (value) => {
        setSelectedValue(value);
    };

    return (
        <div className='them_quyen_container'>
            <h1 className="title">Chỉnh sửa nhóm quyền</h1>
            <div className='head_info'>
                <Input
                    placeholder="Nhập tên nhóm quyền"
                    value={tenQuyen}
                    onChange={(e) => setTenQuyen(e.target.value)}
                    disabled={idQuyen === "1" || idQuyen === "2"} // Vô hiệu hóa nếu idQuyen là 1
                />
                <Select
                    value={selectedValue}
                    style={{ width: 200 }}
                    onChange={handleChangeSelectBox}
                    disabled={idQuyen === "1" || idQuyen === "2"} // Vô hiệu hóa Select nếu idQuyen là 1 hoặc 2
                >
                    {idQuyen === "1" || idQuyen === "2" ? (
                        <Option value="ACTIVE">Hoạt động</Option> // Chỉ cho phép ACTIVE
                    ) : (
                        <>
                            <Option value="ACTIVE">Hoạt động</Option>
                            <Option value="IN_ACTIVE">Không hoạt động</Option>
                        </>
                    )}
                </Select>
            </div>
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
                                    disabled={item.tenChucNang == "Quản lí nhóm quyền" && idQuyen == 1 || item.tenChucNang === "Quản lí nhóm quyền" && idQuyen == 2}
                                />
                            </td>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={permissions[item.tenChucNang]?.create || false}
                                    onChange={() => handleCheckboxChange(item.tenChucNang, 'create')}
                                    disabled={item.tenChucNang == "Quản lí nhóm quyền" && idQuyen == 1 || item.tenChucNang === "Quản lí nhóm quyền" && idQuyen == 2}
                                />
                            </td>
                            <td>
                                <input
                                    type='checkbox'
                                    checked={permissions[item.tenChucNang]?.edit || false}
                                    onChange={() => handleCheckboxChange(item.tenChucNang, 'edit')}
                                    disabled={item.tenChucNang == "Quản lí nhóm quyền" && idQuyen == 1 || item.tenChucNang === "Quản lí nhóm quyền" && idQuyen == 2}
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
                    <PermissionEditButton feature="Quản lí nhóm quyền">
                        <div onClick={handleCancel}> <GradientButtonCancel /> </div>
                        <div onClick={handleUpdatePermissions}> <GradientButton /> </div>
                    </PermissionEditButton>
                </div>
            </div>
        </div>
    );
};

export default QuyenEdit;