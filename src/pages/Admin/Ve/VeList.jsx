import React, { useState } from "react";
import "./ve.css";
import PaginationRounded from "../../../components/Admin/Pagination";
import SearchBtn from "../../../components/Admin/ColorButtons/SearchBtn";
import EditBtn from "../../../components/Admin/ColorButtons/EditBtn";
import DeleteBtn from "../../../components/Admin/ColorButtons/deleteBtn";
import { PermissionButton } from "../../../components/Admin/Sidebar";
import XemChiTietBtn from "../../../components/Admin/ColorButtons/XemChiTietBtn";

const VeList = ({
    ve,
    handleSort,
    sortOrder,
    sortField,
    loading,
    onEdit,
}) => {

    if (loading) return <p>Loading...</p>;

    return (
        <div>
            <table className="table">
                <thead className="thead-dark">
                    <tr>
                        <th>ID</th>
                        <th>Mã vé</th>
                        <th>Tên máy bay</th>
                        <th>Giá vé</th>
                        <th>Hạng vé</th>
                        <th>Loại vé</th>
                        <th>Ngày bay</th>
                        <th>Trạng thái</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {ve && ve == "" ? (
                        <tr>
                            <td colSpan="9" className="text-center">
                                Không tìm thấy kết quả tìm kiếm!
                            </td>
                        </tr>
                    ) : (
                        ve &&
                        ve.map((v) => (
                            <tr key={v.idVe}>
                                <td>{v.idVe}</td>
                                <td>{v.maVe}</td>
                                <td>{v.chuyenBay.mayBay.tenMayBay}</td>
                                <td>{v.giaVe}</td>
                                <td>{v.hangVe.tenHangVe}</td>
                                <td>{v.loaiVe.tenLoaiVe}</td>
                                <td>{v.chuyenBay.ngayBay}</td>
                                <td>{v.trangThai}</td>
                                <td>
                                    <PermissionButton feature="Quản lí vé" idButton={v.idVe} onEdit={onEdit}>
                                    </PermissionButton>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default VeList;
