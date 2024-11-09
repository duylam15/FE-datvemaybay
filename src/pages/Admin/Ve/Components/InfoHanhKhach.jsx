import React from 'react';
import { Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const InfoHanhKhach = ({ hoTen, ngaySinh, gioiTinh, CCCD, SDT, email, hoChieu, handleInputChange }) => {
    return (
        <>
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
                                value={hoTen}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <p><span className='label'>Ngày sinh: </span>{ngaySinh}</p>
                    <p><span className='label'>Giới tính: </span>{gioiTinh}</p>
                    <p><span className='label'>CCCD: </span>{CCCD}</p>
                </div>
                <div className='content_hanhKhach'>
                    <p><span className='label'>SĐT: </span>{SDT}</p>
                    <p><span className='label'>Email: </span>{email}</p>
                    <p><span className='label'>Hộ chiếu: </span>{hoChieu}</p>
                </div>
            </div>
        </>
    );
};

export default InfoHanhKhach;