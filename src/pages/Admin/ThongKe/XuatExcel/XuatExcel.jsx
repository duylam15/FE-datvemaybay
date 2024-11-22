import React, { useState } from 'react';
import { DatePicker, Space } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { xuatExcelThongKe } from '../../../../services/xuatExcelService';
import './xuatExcel.scss';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { FileExcelOutlined } from '@ant-design/icons';

dayjs.extend(customParseFormat);
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';

const XuatExcel = () => {
    const [selectedDates, setSelectedDates] = useState(["", ""]); // State để lưu ngày

    // Xử lý khi thay đổi ngày
    const handleDateChange = (dates) => {
        if (dates && dates.length === 2 && dates[0] && dates[1]) {
            const startDate = dates[0].format(dateFormat); // Định dạng ngày bắt đầu
            const endDate = dates[1].format(dateFormat); // Định dạng ngày kết thúc
            setSelectedDates([startDate, endDate]); // Lưu ngày vào state
        } else {
            setSelectedDates(["", ""]);
        }
    };

    // Xử lý khi nhấn nút "Xuất Excel"
    const handleExportExcel = () => {
        const [startDate, endDate] = selectedDates;
        if (startDate && endDate) {
            console.log("Xuất Excel với ngày bắt đầu:", startDate, "và ngày kết thúc:", endDate);
            xuatExcelThongKe(startDate, endDate); // Gọi API xuất Excel
        } else {
            console.warn("Chưa chọn khoảng thời gian!");
        }
    };

    return (
        <div className="xuat_excel_componet">
            <div className="blockInput">
                <h2 className="title_input">Thống kê tổng quát Excel</h2>
                <div className="container_excel">
                    <div>
                        <Space direction="vertical" size={12}>
                            <RangePicker
                                format={dateFormat}
                                onChange={handleDateChange} // Xử lý chọn ngày
                            />
                        </Space>
                    </div>

                    <div onClick={handleExportExcel}>
                        <Stack direction="row" spacing={2}>
                            <Button
                                variant="outlined"
                                color="primary"
                                startIcon={<FileExcelOutlined />}
                                size="large"
                                sx={{ fontSize: '1.25rem' }}
                            >
                                Xuất Excel
                            </Button>
                        </Stack>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default XuatExcel;