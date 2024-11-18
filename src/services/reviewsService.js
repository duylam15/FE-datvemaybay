import { message } from 'antd';
import axios from 'axios';

const API_URL = 'http://localhost:8080';

export const getDanhGia = async () => {
    const response = await fetch(`${API_URL}/admin/danhgia/getAllReview`);
    if (!response.ok) {
        throw new Error('Failed to fetch reviews');
    }
    const data = await response.json();
    return data.data;
};

export const searchByTenKhachHang = async (searchTerm, setDanhGia) => {
    try {
        const response = await axios.get(`${API_URL}/admin/danhgia/getReviewByNameOfCustomer?tenKhachHang=${searchTerm}`);
        console.log('Search results:', response.data);
        setDanhGia(response.data.data);
    } catch (error) {
        if (error.response && error.response.status === 500) {
            setDanhGia([]);
        }
        console.error('Error fetching search results:', error);
    }
}

export const searchByAirline = async (idHangBay, setDanhGia) => {
    try {
        if(idHangBay === 'Lọc theo hãng bay'){
            const response = await axios.get(`${API_URL}/admin/danhgia/getAllReview`);
            setDanhGia(response.data.data);
        }
        else {
            const response = await axios.get(`${API_URL}/admin/danhgia/getReviewByHangBay/${idHangBay}`);
            console.log('Get reviews by airline: ', idHangBay, ' is ', response.data);
            setDanhGia(response.data.data);
        }
    } catch (error) {
        if (error.response && error.response.status === 500) {
            setDanhGia([]);
        }
        console.error('Error fetching search results:', error);
    }
}

export const searchByStartTimeAndEndTime = async (start, end) => {
    try {
        if(start === '' && end === '') {
            const response = await fetch(`${API_URL}/admin/danhgia/getAllReview`);
            if (!response.ok) {
                throw new Error('Failed to fetch reviews');
            }
            const data = await response.json();
            return data.data;
        } else {
            const response = await axios.get(`${API_URL}/admin/danhgia/getReviewByStartTimeAndEndTime?startTime=${start}&endTime=${end}`);
            console.log('Get reviews by starttime and endtime:', response.data);
            return response.data.data;
        }  
    } catch (error) {
        console.error('Error fetching search results by start and end time:', error);
        return [];
    }
}

export const blockReview = async (idDanhGia) => {
    try {
        const response = await axios.get(`${API_URL}/admin/danhgia/getReview/${idDanhGia}`);
        const result = response.data.data;
        console.log('Result: ', result);
        if (result.trangThaiActive === 'ACTIVE') {
            const response1 = await axios.put(`${API_URL}/admin/danhgia/blockReview/${idDanhGia}`);
            console.log('Block review:', response1.data);
            const reviewStatus = response1.data.data;

            if (reviewStatus) {
                message.success('Bình luận này sẽ không được hiển thị!');
            } else {
                message.error('Không thể cập nhật trạng thái bình luận!');
            }

            const response2 = await fetch(`${API_URL}/admin/danhgia/getAllReview`);
            const data = await response2.json();
            return data.data;
        } else {
            const response1 = await axios.put(`${API_URL}/admin/danhgia/blockReview/${idDanhGia}`);
            console.log('Unblock review:', response1.data);
            const reviewStatus = response1.data.data;

            if (reviewStatus) {
                message.success('Bình luận này sẽ được hiển thị!');
            } else {
                message.error('Không thể cập nhật trạng thái bình luận!');
            }

            const response2 = await fetch(`${API_URL}/admin/danhgia/getAllReview`);
            const data = await response2.json();
            return data.data;
        }
    } catch (error) {
        console.error('Error fetching block review:', error);
    }
}
