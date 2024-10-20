import React from "react";
import { Dropdown, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom"; // Thêm useNavigate để điều hướng
import "./CustomDropdown.css";
import "../Sidebar/Sidebar.css";
import { SiGooglecampaignmanager360 } from "react-icons/si";
import { BsPersonBadge } from "react-icons/bs";
import { PiNetworkXBold } from "react-icons/pi";

const createDropdown = (items, onClick, title) => {
  return (
    <Dropdown
    className={`nav-item row ${
      location.pathname.includes("/admin/quanlinhanvien") ? "active" : ""
    }`}
      menu={{
        items,
        onClick,
      }}
    >
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          <SiGooglecampaignmanager360 />
          {title}
          <DownOutlined />
        </Space>
      </a>
    </Dropdown>
  );
};

const DropdownSidebar = () => {
  const navigate = useNavigate(); // Sử dụng useNavigate để điều hướng

  const items = [
    {
      label: (
        <Space>
          <BsPersonBadge/> Nhân viên
        </Space>
      ),
      key: "1",
      path: "/admin/quanlinhanvien/nhanvien", // Đường dẫn khi click vào item này
    },
    {
      label: (
        <Space>
          <PiNetworkXBold/> Chức vụ
        </Space>
      ),
      key: "2",
      path: "/admin/quanlinhanvien/chucvu", // Đường dẫn khi click vào item này
    },
  ];

  const handleClick = (e) => {
    const clickedItem = items.find((item) => item.key === e.key);
    if (clickedItem && clickedItem.path) {
      navigate(clickedItem.path); // Điều hướng đến đường dẫn được cấu hình
    }
  };

  return <div>{createDropdown(items, handleClick, "Quản lí nhân viên")}</div>;
};

export default DropdownSidebar;




