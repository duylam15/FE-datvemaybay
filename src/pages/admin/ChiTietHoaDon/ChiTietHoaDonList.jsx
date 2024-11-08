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
            {chiTietHoaDon.length > 0 ? (
                chiTietHoaDon.map(cthd => (
                    <div className="bill-detail-item" key={cthd.idChiTietHoaDon}>
                        <h3 style={{'paddingBottom': '10px'}}>#{cthd.idChiTietHoaDon}</h3>
                        <div className={`status ${cthd.hoaDon.status}`}>{cthd.hoaDon.status}</div>
                        <div  className="bill-detail-item-info">
                            {cthd.ve ? (
                            <>
                                <div className="item ve">
                                    <h3>Thông tin vé</h3>
                                    <p>Hành khách: {cthd.ve.hanhKhach.hoTen}</p>
                                    <p>Giới tính: {cthd.ve.hanhKhach.gioiTinhEnum}</p>
                                    <p>Vé: {cthd.ve.maVe}</p>
                                    <p>Giá vé: {cthd.ve.giaVe}VND</p>
                                    <p>Chuyến bay: {cthd.ve.chuyenBay.iataChuyenBay}</p>
                                </div>
                            </>
                            ): ''}
                            {cthd.hangHoa ? (
                                <>
                                <div className="item hang-hoa">
                                    <h3>Thông tin hàng hóa</h3>
                                    <p>Tên hàng hóa: {cthd.hangHoa.tenHangHoa}</p>
                                    <p>Loại hàng hóa: {cthd.hangHoa.loaiHangHoa.tenLoaiHangHoa}</p>
                                    <p>Tải trọng: {cthd.hangHoa.taiTrong}Kg</p>
                                    <p>Giá tiền: {cthd.hangHoa.giaPhatSinh}VND</p>
                                </div>
                                </>
                            ): ''}
                                
                            
                        </div>
                        <div className="foot">
                            <h2 className='so-tien'>Số tiền: {cthd.soTien}VND</h2>
                        </div>
                        
                    </div>
                ))
            ) : (
                <p>Không có thông tin đặt chỗ nào.</p>
            )}
            </div>
    );
};

export default ChiTietHoaDonList;
