import React, { useEffect, useState } from 'react';
import './editVe.scss';
import { Select } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Input, Tooltip} from 'antd';
import { GradientButton, GradientButtonBack, GradientButtonCancel } from '../../../components/Admin/GradientButton';
import { useNavigate, useParams } from 'react-router-dom';
import { getAllStatusVe, getChiTietVeTheoId } from '../../../services/veService';

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
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log("1234abc")
                const dataVeResponse = await getChiTietVeTheoId(idVe);
                console.log("data Ve: ", dataVeResponse)
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
                console.log("data status ve: ", dataResponse)
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
                hoTen: data.hanhKhach.hoTen,
                CCCD: data.hanhKhach.cccd,
                email: data.hanhKhach.email,
                SDT: data.hanhKhach.soDienThoai,
                ngaySinh: data.hanhKhach.ngaySinh,
                hoChieu: data.hanhKhach.hoChieu,
                gioiTinh: data.hanhKhach.gioiTinhEnum
            },
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
            trangThai: data.trangThai
        });
    };

    const handleChangeSelectBox = (value) => {
        setDataVePrint((prevData) => ({
            ...prevData,
            trangThai: value
        }))
        console.log(`Selected: ${value}`);
    };

    const handlePriceChange = (e) => {
        const price = e.target.value.replace(/\D/g, ''); // Remove non-digit characters
        setDataVePrint((prevData) => ({
            ...prevData,
            giaVe: price ? parseInt(price, 10) : 0, // Convert to integer or set to 0 if empty
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

    console.log("het cai nay di ngu: ", dataVePrint.trangThai)

    return (
        <div className='page_edit_ve'>
            <p className='titleBIG'>Thông tin chi tiết vé</p>
            <div className='infoHanhKhach_XuatVe'>
                <p className='title_'>Thông tin hành khách</p>
                <div className="content">
                    <div className='content_hanhKhach'>
                        <div className="row_input">
                            <div className='label'>Họ tên: </div>
                            <div className='w-260px'>
                                <Input
                                    placeholder="Nhập tên hành khách"
                                    name="hoTen"
                                    prefix={<UserOutlined />}
                                    value={dataVePrint.hanhKhach.hoTen} 
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <p><span className='label'>Ngày sinh: </span>{dataVePrint.hanhKhach.ngaySinh}</p>
                        <p><span className='label'>Giới tính: </span>{dataVePrint.hanhKhach.gioiTinh}</p>
                        <p><span className='label'>CCCD: </span>{dataVePrint.hanhKhach.CCCD}</p>
                    </div>
                    <div className='content_hanhKhach'>
                        <p><span className='label'>SĐT: </span>{dataVePrint.hanhKhach.SDT}</p>
                        <p><span className='label'>Email: </span>{dataVePrint.hanhKhach.email}</p>
                        <p><span className='label'>Hộ chiếu: </span>{dataVePrint.hanhKhach.hoChieu}</p>
                    </div>
                </div>
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
                        {statuses.map((e) => (
                            <Option key={e} value={e}>{e}</Option>
                        ))}
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
                        <div> <GradientButton /> </div> {/* Save Button */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditVe;