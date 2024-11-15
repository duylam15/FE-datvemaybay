import React, { useEffect, useState } from 'react';
import './editVe.scss';
import { Select } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { GradientButton, GradientButtonBack, GradientButtonCancel } from '../../../components/Admin/GradientButton';
import { useNavigate, useParams } from 'react-router-dom';
import { getAllStatusVe, getChiTietVeTheoId, editVe } from '../../../services/veService';
import { message } from 'antd'; // Import Ant Design message component for notifications
import InfoHanhKhach from './Components/InfoHanhKhach';
import InfoHanhKhachInput from './Components/InfoHanhKhachInput';
import { PermissionEditButton } from '../../../components/Admin/Sidebar';
const { Option } = Select;


const EditVe = () => {
    const { idVe } = useParams();
    const navigate = useNavigate();
    const [statuses, setStatuses] = useState([])
    const [dataVePrint, setDataVePrint] = useState({
        hanhKhach: {
            hoTen: "",
            ngaySinh: "",
            gioiTinh: "",
            CCCD: '',
            SDT: '',
            email: "",
            hoChieu: ""
        },
        idVe: '',
        nameDepartCity: '',
        departureCity: '',
        nameArriveCity: '',
        arrivalCity: '',
        flightNumber: '',
        departureTime: '',
        arrivalTime: '',
        departureGate: '',
        departureDate: '',
        arriveDate: '',
        seatClass: '',
        carrier: '',
        flightDuration: '',
        issuingCarrier: '',
        baggageCode: '',
        giaVe: 0,
        maVe: '',
        idChoNgoi: '',
        trangThai: '',
        trangThaiActive: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const dataVeResponse = await getChiTietVeTheoId(idVe);
                transformData(dataVeResponse.data)
            } catch (e) {
                console.error("Error fetching data:", error);
            }
        }
        fetchData()
    }, [idVe])

    useEffect(() => {
        const fetchStatuses = async () => {
            try {
                const dataResponse = await getAllStatusVe()
                setStatuses(dataResponse.data)
            } catch (e) {
                console.error("Error fetching data status ve", error);
            }
        }
        fetchStatuses()
    }, [])


    const transformData = (data) => {
        setDataVePrint({
            hanhKhach: {
                hoTen: data?.hanhKhach?.hoTen,
                CCCD: data?.hanhKhach?.cccd,
                email: data?.hanhKhach?.email,
                SDT: data?.hanhKhach?.soDienThoai,
                ngaySinh: data?.hanhKhach?.ngaySinh,
                hoChieu: data?.hanhKhach?.hoChieu,
                gioiTinh: data?.hanhKhach?.gioiTinhEnum
            },
            idVe: data.idVe,
            nameDepartCity: data.chuyenBay.tuyenBay.sanBayBatDau.thanhPho.tenThanhPho,
            departureCity: data.chuyenBay.tuyenBay.sanBayBatDau.iataSanBay,
            nameArriveCity: data.chuyenBay.tuyenBay.sanBayKetThuc.thanhPho.tenThanhPho,
            arrivalCity: data.chuyenBay.tuyenBay.sanBayKetThuc.iataSanBay,
            flightNumber: data.chuyenBay.iataChuyenBay,
            departureTime: data.chuyenBay.thoiGianBatDauDuTinh,
            arrivalTime: data.chuyenBay.thoiGianKetThucDuTinh,
            departureGate: data.chuyenBay.cong.tenCong,
            departureDate: data.chuyenBay.ngayBay,
            arriveDate: data.chuyenBay.ngayBay,
            seatClass: data.hangVe.tenHangVe,
            carrier: data.chuyenBay.mayBay.hangBay.tenHangBay,
            flightDuration: data.chuyenBay.tuyenBay.thoiGianChuyenBay,
            issuingCarrier: data.chuyenBay.mayBay.hangBay.tenHangBay,
            baggageCode: data.loaiVe.moTa,
            giaVe: data.giaVe,
            maVe: data.maVe,
            maChoNgoi: data.choNgoi.columnIndex + data.choNgoi.rowIndex,
            trangThai: data.trangThai,
            trangThaiActive: data.trangThaiActive
        });
    };

    const handleChangeSelectBox = (value) => {
        setDataVePrint((prevData) => ({
            ...prevData,
            trangThai: value
        }))
    };
    const handleChangeSelectBox_2 = (value) => { // trang thai active or in_active
        setDataVePrint((prevData) => ({
            ...prevData,
            trangThaiActive: value
        }))
    };

    const handlePriceChange = (e) => {
        const price = e.target.value.replace(/\D/g, ''); // Remove non-digit characters
        setDataVePrint((prevData) => ({
            ...prevData,
            giaVe: price ? parseInt(price, 10) : 0, // Convert to integer or set to 0 if empty
        }));
    };


    const handleUpdateData = (updatedData) => {
        console.log("Updated Data received from child:", updatedData);
        setDataVePrint((prevData) => ({
            ...prevData,
            hanhKhach: updatedData || {} 
        }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target; // Get the name and value from the input element

        setDataVePrint((prevData) => ({
            ...prevData,
            hanhKhach: {
                ...prevData.hanhKhach,
                [name]: value, // Dynamically set the field in hanhKhach
            },
        }));
    };

    const handleBack = () => {
        navigate('/admin/ve');
    };

    function getHourAndMinute(timestamp) {
        const date = new Date(timestamp);
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}h${minutes}`;
    }
    function convertMinutesToHoursAndMinutes(minutes) {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        if (remainingMinutes == 0) {
            return `${hours}h`;
        }
        return `${hours}h${remainingMinutes}m`;
    }



    const handleEdit = async () => {
        if (dataVePrint.hanhKhach.hoTen.length < 2 || dataVePrint.hanhKhach.hoTen.length > 100) {
            message.error('Tên hành khách phải có độ dài từ 2 đến 100 kí tự')
            return
        }
        if (!dataVePrint.hanhKhach.email || !/\S+@\S+\.\S+/.test(dataVePrint.hanhKhach.email)) {
            message.error('Email không hợp lệ');
            return;
        }
        if (!dataVePrint.hanhKhach.SDT || !/^\d{10,11}$/.test(dataVePrint.hanhKhach.SDT)) {
            message.error('Số điện thoại không hợp lệ');
            return;
        }
        try {
            // Lấy dữ liệu từ dataVePrint để gửi lên server
            const data = {
                idVe: dataVePrint.idVe,
                giaVe: dataVePrint.giaVe,
                trangThai: dataVePrint.trangThai,
                tenHanhKhach: dataVePrint.hanhKhach.hoTen,
                trangThaiActive: dataVePrint.trangThaiActive
            };
            console.log("data to Edit: ", data)
            // Gọi API EditVe để cập nhật thông tin
            const response = await editVe(idVe, data);
            console.log("KEteq qua edit: ", response);
            // Kiểm tra kết quả trả về từ API
            if (response.statusCode === 200) {
                message.success('Cập nhật vé thành công'); // Hiển thị thông báo thành công
                // navigate('/admin/ve'); // Điều hướng về trang quản lý vé
            } else {
                message.error('Cập nhật vé thất bại'); // Hiển thị thông báo lỗi nếu không thành công
            }
        } catch (error) {
            console.error("Error updating ve:", error);
            message.error('Có lỗi xảy ra khi cập nhật vé'); // Hiển thị thông báo lỗi
        }
    };
    console.log("data ve thay doi: ", dataVePrint)

    return (
        <div className='page_edit_ve'>
            <p className='titleBIG'>Thông tin chi tiết vé</p>
            <div className='infoHanhKhach_XuatVe'>
                {dataVePrint.trangThai === "EMPTY" ? (
                    <InfoHanhKhachInput
                        hoTen={dataVePrint.hanhKhach.hoTen}
                        handleInputChange={handleInputChange}
                        ngaySinh={dataVePrint.hanhKhach.ngaySinh}
                        gioiTinh={dataVePrint.hanhKhach.gioiTinh}
                        CCCD={dataVePrint.hanhKhach.CCCD}
                        SDT={dataVePrint.hanhKhach.SDT}
                        email={dataVePrint.hanhKhach.email}
                        hoChieu={dataVePrint.hanhKhach.hoChieu}
                    />
                ) : (
                    <InfoHanhKhach
                        hoTen={dataVePrint.hanhKhach.hoTen}
                        handleInputChange={handleInputChange}
                        ngaySinh={dataVePrint.hanhKhach.ngaySinh}
                        gioiTinh={dataVePrint.hanhKhach.gioiTinh}
                        CCCD={dataVePrint.hanhKhach.CCCD}
                        SDT={dataVePrint.hanhKhach.SDT}
                        email={dataVePrint.hanhKhach.email}
                        hoChieu={dataVePrint.hanhKhach.hoChieu}
                    />
                )}

            </div>
            <div className="seperate"></div>
            <div className="content">
                <div className="seperate_block">
                    <span>Thông tin vé</span>
                </div>
                <div className='row_'>
                    <div>
                        <p className='pb_10'><span className='label'>Mã vé: </span> {dataVePrint.maVe}</p>
                        <p className='pb_10'><span className='label'>Mã chổ ngồi: </span> {dataVePrint.maChoNgoi}</p>
                    </div>
                    <div>
                        <p className='pb_10'><span className='label'>Giá tiền: </span></p>
                        <Input
                            prefix="đ"
                            suffix="VND"
                            value={dataVePrint.giaVe}
                            onChange={handlePriceChange} // Handle price changes
                        />
                    </div>
                    <div>
                        <p className='pb_10'><span className='label'>Trạng thái: </span></p>
                        <Select
                            value={dataVePrint.trangThai} // Set the value of the Select
                            style={{ width: 200 }}
                            onChange={handleChangeSelectBox}
                        >
                            {statuses.map((e, index) => (
                                <Option key={index} value={e}>{e}</Option>
                            ))}
                        </Select>
                    </div>
                    <div>
                        <p className='pb_10'><span className='label'>Trạng thái: </span></p>
                        <Select
                            value={dataVePrint.trangThaiActive} // Set the value of the Select
                            style={{ width: 200 }}
                            onChange={handleChangeSelectBox_2}
                        >
                            <Option value="ACTIVE">Hoạt động</Option>
                            <Option value="IN_ACTIVE">Không hoạt động</Option>
                        </Select>
                    </div>
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <td>Từ</td>
                            <td>Đến</td>
                            <td>Chuyến bay</td>
                            <td>Khởi hành</td>
                            <td>Điểm đến</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="row_first">
                            <td><span className="bold">{dataVePrint.nameDepartCity}</span> <span>{dataVePrint.departureCity}</span></td>
                            <td><span className="bold">{dataVePrint.nameArriveCity}</span> <span>{dataVePrint.arrivalCity}</span></td>
                            <td>{dataVePrint.flightNumber}</td>
                            <td className="bold">{getHourAndMinute(dataVePrint.departureTime)}</td>
                            <td className="bold">{getHourAndMinute(dataVePrint.arrivalTime)}</td>
                        </tr>
                        <tr className="row_first">
                            <td>Cổng: <span>{dataVePrint.departureGate}</span></td>
                            <td></td>
                            <td></td>
                            <td>{dataVePrint.departureDate}</td>
                            <td>{dataVePrint.arriveDate}</td>
                        </tr>
                        <tr>
                            <td rowSpan="2"><span className="label">Hạng: </span> <span>{dataVePrint.seatClass}</span></td>
                            <td colSpan="2"><span className="label">Hãng vận chuyển: </span><span>{dataVePrint.carrier}</span></td>
                            <td colSpan="2"><span className="label">Thời gian bay: </span><span>{convertMinutesToHoursAndMinutes(dataVePrint.flightDuration)}</span></td>
                        </tr>
                        <tr>
                            <td colSpan="2"><span className="label">Hãng xuất vé: </span><span>{dataVePrint.issuingCarrier}</span></td>
                        </tr>
                    </tbody>
                </table>
                <div className="seperate"></div>
                <div className='row_last '>
                    <div onClick={handleBack}> <GradientButtonBack /> </div>
                    <div className="btn_row_last">
                        <PermissionEditButton feature="Quản lí vé">
                            <div onClick={handleEdit}> <GradientButton /> </div> {/* Save Button */}
                        </PermissionEditButton>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditVe;