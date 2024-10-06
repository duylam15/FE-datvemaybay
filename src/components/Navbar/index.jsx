// UserItem.jsx
import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Menu } from 'antd';
import { AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import './Navbar.scss';

const menuData = {
  menu: [
    {
      h1title: 'Khám phá',
      items: [
        // Sử dụng một mảng cho các mục
        {
          id: 1,
          title: 'Thông tin đặt vé',
          subTitle: [
            'Điều kiện giá vé',
            'Giá vé đặc biệt',
            'Hoàn, hủy, đổi vé',
            'Thuế, phí và phụ thu',
            'Trễ chuyến, Go - show',
            'Vé giờ chót',
            'Phương thức thanh toán',
          ],
        },
        {
          id: 2,
          title: 'Thông tin đặt vé',
          subTitle: [
            'Điều kiện giá vé',
            'Giá vé đặc biệt',
            'Hoàn, hủy, đổi vé',
            'Thuế, phí và phụ thu',
            'Trễ chuyến, Go - show',
            'Vé giờ chót',
            'Phương thức thanh toán',
          ],
        },
        {
          id: 3,
          title: 'Thông tin đặt vé',
          subTitle: [
            'Điều kiện giá vé',
            'Giá vé đặc biệt',
            'Hoàn, hủy, đổi vé',
            'Thuế, phí và phụ thu',
            'Trễ chuyến, Go - show',
            'Vé giờ chót',
            'Phương thức thanh toán',
          ],
        },
        {
          id: 4,
          title: 'Thông tin đặt vé',
          subTitle: [
            'Điều kiện giá vé',
            'Giá vé đặc biệt',
            'Hoàn, hủy, đổi vé',
            'Thuế, phí và phụ thu',
            'Trễ chuyến, Go - show',
            'Vé giờ chót',
            'Phương thức thanh toán',
          ],
        },
      ],
    },
    {
      h1title: 'Đặt vé',
      items: [
        // Sử dụng một mảng cho các mục
        {
          id: 1,
          title: 'Thông tin đặt vé',
          subTitle: [
            'Điều kiện giá vé',
            'Giá vé đặc biệt',
            'Hoàn, hủy, đổi vé',
            'Thuế, phí và phụ thu',
            'Trễ chuyến, Go - show',
            'Vé giờ chót',
            'Phương thức thanh toán',
          ],
        },
        {
          id: 2,
          title: 'Thông tin hướng dẫn',
          subTitle: [
            'Điều kiện giá vé',
            'Giá vé đặc biệt',
            'Hoàn, hủy, đổi vé',
            'Thuế, phí và phụ thu',
            'Trễ chuyến, Go - show',
            'Vé giờ chót',
            'Phương thức thanh toán',
          ],
        },
        {
          id: 3,
          title: 'Thông tin đặt vé',
          subTitle: [
            'Điều kiện giá vé',
            'Giá vé đặc biệt',
            'Hoàn, hủy, đổi vé',
            'Thuế, phí và phụ thu',
            'Trễ chuyến, Go - show',
            'Vé giờ chót',
            'Phương thức thanh toán',
          ],
        },
        {
          id: 4,
          title: 'Thông tin đặt vé',
          subTitle: [
            'Điều kiện giá vé',
            'Giá vé đặc biệt',
            'Hoàn, hủy, đổi vé',
            'Thuế, phí và phụ thu',
            'Trễ chuyến, Go - show',
            'Vé giờ chót',
            'Phương thức thanh toán',
            'Phương thức thanh toán',
            'Phương thức thanh toán',
          ],
        },
      ],
    },
    {
      h1title: 'Thông tin hành trình',
      items: [
        // Sử dụng một mảng cho các mục
        {
          id: 1,
          title: 'Thông tin đặt vé',
          subTitle: [
            'Điều kiện giá vé',
            'Giá vé đặc biệt',
            'Hoàn, hủy, đổi vé',
            'Thuế, phí và phụ thu',
            'Trễ chuyến, Go - show',
            'Vé giờ chót',
            'Phương thức thanh toán',
          ],
        },
        {
          id: 2,
          title: 'Thông tin hướng dẫn',
          subTitle: [
            'Điều kiện giá vé',
            'Giá vé đặc biệt',
            'Hoàn, hủy, đổi vé',
            'Thuế, phí và phụ thu',
            'Trễ chuyến, Go - show',
            'Vé giờ chót',
            'Phương thức thanh toán',
          ],
        },
        {
          id: 3,
          title: 'Thông tin đặt vé',
          subTitle: [
            'Điều kiện giá vé',
            'Giá vé đặc biệt',
            'Hoàn, hủy, đổi vé',
            'Thuế, phí và phụ thu',
            'Trễ chuyến, Go - show',
            'Vé giờ chót',
            'Phương thức thanh toán',
          ],
        },
        {
          id: 4,
          title: 'Thông tin đặt vé',
          subTitle: [
            'Điều kiện giá vé',
            'Giá vé đặc biệt',
            'Hoàn, hủy, đổi vé',
            'Thuế, phí và phụ thu',
            'Trễ chuyến, Go - show',
            'Vé giờ chót',
            'Phương thức thanh toán',
            'Phương thức thanh toán',
            'Phương thức thanh toán',
          ],
        },
      ],
    },
    {
      h1title: 'Bamboo Club',
      items: [
        // Sử dụng một mảng cho các mục
        {
          id: 1,
          title: 'Thông tin đặt vé',
          subTitle: [
            'Điều kiện giá vé',
            'Giá vé đặc biệt',
            'Hoàn, hủy, đổi vé',
            'Thuế, phí và phụ thu',
            'Trễ chuyến, Go - show',
            'Vé giờ chót',
            'Phương thức thanh toán',
          ],
        },
        {
          id: 2,
          title: 'Thông tin hướng dẫn',
          subTitle: [
            'Điều kiện giá vé',
            'Giá vé đặc biệt',
            'Hoàn, hủy, đổi vé',
            'Thuế, phí và phụ thu',
            'Trễ chuyến, Go - show',
            'Vé giờ chót',
            'Phương thức thanh toán',
          ],
        },
        {
          id: 3,
          title: 'Thông tin đặt vé',
          subTitle: [
            'Điều kiện giá vé',
            'Giá vé đặc biệt',
            'Hoàn, hủy, đổi vé',
            'Thuế, phí và phụ thu',
            'Trễ chuyến, Go - show',
            'Vé giờ chót',
            'Phương thức thanh toán',
          ],
        },
        {
          id: 4,
          title: 'Thông tin đặt vé',
          subTitle: [
            'Điều kiện giá vé',
            'Giá vé đặc biệt',
            'Hoàn, hủy, đổi vé',
            'Thuế, phí và phụ thu',
            'Trễ chuyến, Go - show',
            'Vé giờ chót',
            'Phương thức thanh toán',
            'Phương thức thanh toán',
            'Phương thức thanh toán',
          ],
        },
      ],
    },
  ],
};

const Navbar = ({}) => {
  const navigate = useNavigate();

  return (
    <>
      <nav className='navbar'>
        <div className='container'>
          <div className='navbar__inner'>
            <div className='navbar__logo' onClick={() => navigate('/')}>
              <img src='/public/icons/logo.svg' alt='' />
            </div>
            <div className='navbar__menu'>
              {menuData.menu.map((section, sectionIndex) => (
                <div key={sectionIndex} className='navbar__menu-item'>
                  <span className='navbar__menu-link'>
                    <Link to={'/post/' + sectionIndex}>{section.h1title}</Link>
                  </span>
                  <div className='navbar__submenu--list'>
                    <div className='navbar__submenu'>
                      {section.items.map((item, itemIndex) => (
                        <div key={itemIndex} className='navbar__submenu-item'>
                          <p className='navbar__submenu-item navbar__submenu-item--heading'>
                            {item.title}
                          </p>
                          {item.subTitle.map((subTitle, subIndex) => (
                            <p key={subIndex} className='navbar__submenu-item'>
                              <Link
                                to={'/post/' + sectionIndex + '/' + subIndex}
                              >
                                {subTitle}
                              </Link>
                            </p>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className='navbar__auth'>
              <span
                className='navbar__login'
                onClick={() => navigate('/LoginForm')}
              >
                Đăng nhập
              </span>
              <span
                className='navbar__register'
                onClick={() => navigate('/SignupForm')}
              >
                Đăng kí
              </span>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

// <NavLink to="/" >Home</NavLink>
