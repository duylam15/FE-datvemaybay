import axios from "../utils/axios-80802";
import { saveAs } from 'file-saver'; // Thêm thư viện để lưu file

const REST_API_BASE_URL = 'http://localhost:8080';

export const xuatExcelThongKe = async (startDate, endDate) => {
    try {
        // Gửi yêu cầu tới server với ngày bắt đầu và ngày kết thúc
        const response = await axios.get(`${REST_API_BASE_URL}/thongke/export`, {
            params: {
                startDate: startDate,
                endDate: endDate
            },
            responseType: 'blob', // Chỉ định rằng phản hồi là file (blob)
        });

        // Kiểm tra nếu phản hồi có dữ liệu
        if (response && response.data) {
            // Lưu file Excel với tên file
            saveAs(response.data, 'thong_ke_tong_quat.xlsx');
        }
    } catch (error) {
        console.error('Error downloading the file:', error);
    }
};