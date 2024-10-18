import React from "react";

const LoaiHoaDonList =({
    loaiHoaDon,
    onEdit,
    searchTerm,
    setSearchTerm,
    handleSearch,
    handleSort,
    sortOrder,
    sortField,
}) => {
    return (
        <div>
            <div className="search-sort-controls">
                <input
                    type="text"
                    placeholder="Tìm kiếm loại hóa đơn..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button onClick={handleSearch}>Tìm Kiếm</button>
            </div>
            <table className="table table-hover table-bordered pad-x">
                <thead>
                    <tr>
                        <th scope="col" onClick={() => handleSort('idLoaiHoaDon')}>
                            ID {sortField === 'idLoaiHoaDon' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}   
                        </th>
                        <th scope="col" onClick={() => handleSort('tenLoaiHoaDon')}>
                            Tên loại hóa đơn {sortField === 'tenLoaiHoaDon' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                        </th>
						<th scope="col" onClick={() => handleSort('moTa')}>
                            Mô tả {sortField === 'moTa' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                        </th>
                        <th scope="col" onClick={() => handleSort('status')}>
                            Trạng thái {sortField === 'status' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                        </th>
                        <th>
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {LoaiHoaDonList.length > 0 ? (loaiHoaDon.map(lhd => (
                        <tr key={lhd.idLoaiHD}>
                            <td>{lhd.idLoaiHD}</td>
                            <td>{lhd.tenLoaiHD}</td>
                            <td>{lhd.moTa}</td>
                            <td>{lhd.status === 'ACTIVE' ? 'Kích Hoạt' : 'Không Kích Hoạt'}</td>
                            <td>
                                <button className="btn btn-primary mr-2" onClick={() => onEdit(lhd.idLoaiHD)}>Edit</button>
                            </td>
                        </tr>
                    )))
                    : (
                        <tr>
                            <td colSpan="9" className="text-center">Không tìm thấy kết quả tìm kiếm!</td>
                        </tr>
                    )
                    }
                </tbody>
                </table>
        </div>
    );
};

export default LoaiHoaDonList;