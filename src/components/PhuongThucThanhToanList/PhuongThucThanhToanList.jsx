import React from 'react';
import './PTTTList.scss';

    const PhuongThucTTList = ({
        phuongThucTT,          // Danh sách các phương thức thanh toán
        onEdit,              // Hàm gọi khi muốn chỉnh sửa phương thức thanh toán
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
                    placeholder="Tìm kiếm phương thức thanh toán..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button onClick={handleSearch}>Tìm Kiếm</button>
            </div>
            <table className="table table-hover table-bordered pad-x">
                <thead>
                    <tr>
                        <th scope="col" onClick={() => handleSort('idPhuongThucTT')}>
                            ID {sortField === 'idPhuongThucTT' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}   
                        </th>
                        <th scope="col" onClick={() => handleSort('tenPhuongThucTT')}>
                            Tên PTTT {sortField === 'tenPhuongThucTT' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                        </th>
                        <th scope="col">
                            Mô tả
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
                    {phuongThucTT.length > 0 ? (phuongThucTT.map(pttt => (
                        <tr key={pttt.idPTTT}>
                            <td>{pttt.idPTTT}</td>
                            <td>{pttt.tenPTTT}</td>
                            <td>{pttt.moTa}</td>
                            <td>{pttt.status === 'ACTIVE' ? 'Kích Hoạt' : 'Không Kích Hoạt'}</td>
                            <td>
                                <button className="btn btn-primary mr-2" onClick={() => onEdit(pttt.idPTTT)}>Edit</button>
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

export default PhuongThucTTList;
