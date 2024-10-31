import React, { useState } from 'react';
import { Select } from 'antd';

const { Option } = Select;

const SelectExample = () => {
    const [selectedValue, setSelectedValue] = useState(null);

    const handleChange = (value) => {
        setSelectedValue(value);
        console.log(`Selected: ${value}`);
    };

    return (
        <div>
            <h1>Chọn một giá trị</h1>
            <Select
                defaultValue="Chọn một giá trị"
                style={{ width: 200 }}
                onChange={handleChange}
            >
                <Option value="value1">Giá trị 1</Option>
                <Option value="value2">Giá trị 2</Option>
                <Option value="value3">Giá trị 3</Option>
            </Select>
        </div>
    );
};

export default SelectExample;