import React from 'react';

    const HoaDonList = ({
        hoaDon,          // Danh sách các phương thức thanh toán
        onEdit,   
        viewDetail,           // Hàm gọi khi muốn chỉnh sửa phương thức thanh toán
        searchTerm,          // Giá trị tìm kiếm
        setSearchTerm,       // Hàm cập nhật giá trị tìm kiếm
        handleSearch,        // Hàm xử lý sự kiện tìm kiếm
        handleSort,          // Hàm xử lý sắp xếp danh sách
        sortOrder,           // Thứ tự sắp xếp (tăng dần hoặc giảm dần)
        sortField            // Trường dữ liệu để sắp xếp
    }) => {
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
                        <th scope="col" onClick={() => handleSort('idHoaDon')}>
                            ID {sortField === 'idHoaDon' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}   
                        </th>
                        <th scope="col" onClick={() => handleSort('khachHang.hoTen')}>
                            Tên Khách hàng {sortField === 'khachHang.hoTen' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                        </th>
						<th scope="col" onClick={() => handleSort('nhanVien.hoTen')}>
                            Tên Nhân viên {sortField === 'nhanVien.hoTen' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                        </th>
						<th scope="col" onClick={() => handleSort('soLuongVe')}>
                            Số lượng vé {sortField === 'soLuongVe' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                        </th>
						<th scope="col" onClick={() => handleSort('loaiHoaDon')}>
                            Loại hóa đơn {sortField === 'loaiHoaDon' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                        </th>
						<th scope="col" onClick={() => handleSort('tenPhuongThucTT')}>
                            Phương thức thanh toán {sortField === 'tenPhuongThucTT' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                        </th>
						<th scope="col" onClick={() => handleSort('tongTien')}>
                            Tổng tiền {sortField === 'tongTien' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
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
                    {hoaDon.length > 0 ? (hoaDon.map(hd => (
                        <tr key={hd.idHoaDon}>
                            <td>{hd.idHoaDon}</td>
                            <td>{hd.khachHang.hoTen}</td>
                            <td>{hd.nhanVien.hoTen}</td>
                            <td>{hd.soLuongVe}</td>
                            <td>{hd.loaiHoaDon.tenLoaiHoaDon}</td>
                            <td>{hd.phuongThucThanhToan.tenPhuongThucTT}</td>
                            <td>{hd.tongTien}</td>
                            <td>{hd.status === 'ACTIVE' ? 'Kích Hoạt' : 'Không Kích Hoạt'}</td>
                            <td>
                                <button className="btn btn-primary mr-2" onClick={() => viewDetail(hd.idHoaDon)}>Detail</button>
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

export default HoaDonList;
