// Import React và các hook cần thiết
import React from 'react';

const ChiTietHoaDonList = ({
    chiTietHoaDon,          // Danh sách các phương thức thanh toán
    onEdit,   
    viewDetail,           // Hàm gọi khi muốn chỉnh sửa phương thức thanh toán
    searchTerm,          // Giá trị tìm kiếm
    setSearchTerm,       // Hàm cập nhật giá trị tìm kiếm
    handleSearch,        // Hàm xử lý sự kiện tìm kiếm
    handleSort,          // Hàm xử lý sắp xếp danh sách
    sortOrder,           // Thứ tự sắp xếp (tăng dần hoặc giảm dần)
    sortField            // Trường dữ liệu để sắp xếp
}) => {
    console.log(chiTietHoaDon)
    return (
        <div>
            <div className="search-sort-controls">
                <input
                    type="text"
                    placeholder="Tìm kiếm hóa đơn..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button onClick={handleSearch}>Tìm Kiếm</button>
            </div>
            <table className="table table-hover table-bordered pad-x">
                <thead>
                    <tr>
                        <th scope="col" onClick={() => handleSort('idChiTietHoaDon')}>
                            ID {sortField === 'idChiTietHoaDon' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}   
                        </th>
                        <th scope="col" onClick={() => handleSort('hangHoa.tenHangHoa')}>
                            Hàng hóa {sortField === 'hangHoa.tenHangHoa' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                        </th>
						<th scope="col" onClick={() => handleSort('ve.codeVe')}>
                            Vé {sortField === 've.codeVe' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                        </th>
						<th scope="col" onClick={() => handleSort('soTien')}>
                            Số tiền {sortField === 'soTien' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                        </th>
                        <th>
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {chiTietHoaDon.length > 0 ? (chiTietHoaDon.map(cthd => (
                        <tr key={cthd.idChiTietHoaDon}>
                            <td>{cthd.idChiTietHoaDon}</td>
                            <td>{cthd.hangHoa.tenHangHoa}</td>
                            <td>{cthd.ve.codeVe}</td>
                            <td>{cthd.soTien}</td>
                            <td>
                                <button className="btn btn-primary mr-2" onClick={() => viewDetail(cthd.idChiTietHoaDon)}>Detail</button>
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

export default ChiTietHoaDonList;
