import React, { useState } from 'react';
import { DatePicker, Space, Input } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { xuatExcelThongKe } from '../../../../services/xuatExcelService';
dayjs.extend(customParseFormat);
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';
const XuatExcel = () => {

    const [selectedDates, setSelectedDates] = useState(["", ""]); // State để lưu ngày

    const handleDateChange = (dates) => {
        if (dates && dates.length === 2 && dates[0] && dates[1]) {
             // Chuyển đổi ngày tháng sang chuỗi theo định dạng 'YYYY-MM-DD'
            const startDate = dates[0].format(dateFormat);  // Định dạng ngày bắt đầu
            const endDate = dates[1].format(dateFormat);  
            setSelectedDates([startDate, endDate]);
            console.log("NGAY BD: ", startDate)
            console.log("NGAY KT: ", endDate)
            xuatExcelThongKe(startDate, endDate);
        } else {
            setSelectedDates(["", ""]);
        }
    };
    console.log("Ngay chon thong ke: ",selectedDates)
    return (
        <div className='xuat_excel_componet'>
            <div className="blockInput">
                <Space direction="vertical" size={12}>
                    <RangePicker
                        format={dateFormat}
                        onChange={handleDateChange}
                    />
                </Space>
            </div>
        </div>
    );
};

export default XuatExcel;