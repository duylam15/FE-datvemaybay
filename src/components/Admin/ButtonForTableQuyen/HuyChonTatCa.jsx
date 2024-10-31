import React from 'react';
import { Button } from 'antd';
import { CloseSquareOutlined } from '@ant-design/icons';

const HuyChonTatCa = () => (
    <Button
        type="primary"
        icon={<CloseSquareOutlined />}
        size="small"
        style={{ backgroundColor: '#ff4d4f', borderColor: '#ff4d4f', color: 'white' }}
    />
);

export default HuyChonTatCa;