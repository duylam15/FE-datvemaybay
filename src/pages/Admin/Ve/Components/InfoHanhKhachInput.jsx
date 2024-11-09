import React, { useState, useEffect } from 'react';
import { Input, DatePicker, Select } from 'antd';
import { UserOutlined, MailOutlined, IdcardOutlined, PhoneOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const { Option } = Select;
const dateFormat = 'YYYY-MM-DD';

const InfoHanhKhachInput = ({ hoTen, ngaySinh, gioiTinh, CCCD, SDT, email, hoChieu, handleInputChange }) => {
    const handleDateChange = (date, dateString) => {
        handleInputChange({ target: { name: 'ngaySinh', value: dateString } });
    };

    const handleSelectChange = (value) => {
        handleInputChange({ target: { name: 'gioiTinh', value } });
    };

    return (
        <>
            <p className='title_'>Thông tin hành khách</p>
            <div className="content">
                <div className='content_hanhKhach'>
                    <div className="row_input">
                        <div className='label'>Họ tên: </div>
                        <div className='w-260px'>
                            <Input
                                name='hoTen'
                                placeholder="Nhập tên hành khách"
                                prefix={<UserOutlined />}
                                value={hoTen}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    <div className="row_input">
                        <div className='label'>Ngày sinh: </div>
                        <div className='w-260px'>
                            <DatePicker
                                value={ngaySinh ? dayjs(ngaySinh, dateFormat) : null} // Ensure it's formatted correctly
                                format={dateFormat}
                                name="ngaySinh"  // Name for mapping
                                onChange={handleDateChange}
                            />

                        </div>
                    </div>

                    <div className="row_input">
                        <div className='label'>Giới tính: </div>
                        <div className='w-260px'>
                            <Select
                                name='gioiTinh'
                                value={gioiTinh}
                                style={{ width: 200 }}
                                onChange={handleSelectChange}
                                placeholder="Chọn giới tính"
                            >
                                <Option value="NAM">Nam</Option>
                                <Option value="NU">Nữ</Option>
                            </Select>
                        </div>
                    </div>

                    <div className="row_input">
                        <div className='label'>CCCD: </div>
                        <div className='w-260px'>
                            <Input
                                name='CCCD'
                                placeholder="Nhập CCCD hành khách"
                                value={CCCD}
                                showCount maxLength={12}
                                onChange={handleInputChange}

                            />
                        </div>
                    </div>
                </div>

                <div className='content_hanhKhach'>
                    <div className="row_input">
                        <div className='label'>SĐT: </div>
                        <div className='w-260px'>
                            <Input
                                name='SDT'
                                prefix={<PhoneOutlined />}
                                placeholder="Nhập SĐT hành khách"
                                value={SDT}
                                showCount maxLength={10}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    <div className="row_input">
                        <div className='label'>Email: </div>
                        <div className='w-260px'>
                            <Input
                                name='email'
                                placeholder="Nhập email hành khách"
                                prefix={<MailOutlined />}
                                value={email}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    <div className="row_input">
                        <div className='label'>Hộ chiếu: </div>
                        <div className='w-260px'>
                            <Input
                                name='hoChieu'
                                placeholder="Nhập hộ chiếu"
                                prefix={<IdcardOutlined />}
                                value={hoChieu}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

};


export default InfoHanhKhachInput;