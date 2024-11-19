import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import NotPermitted from './NotPermitted';

// Thành phần kiểm tra quyền truy cập dựa trên vai trò người dùng
const RoleBaseRoute = (props) => {
	// Kiểm tra xem đường dẫn hiện tại có bắt đầu bằng '/admin' không
	const isAdminRoute = window.location.pathname.startsWith('/cmt');
	// Lấy thông tin người dùng từ Redux store
	const user = useSelector(state => state.account.user);
	const userRole = user?.quyen?.tenQuyen; // Lấy vai trò của người dùng
	// Kiểm tra quyền truy cập dựa trên vai trò người dùng và loại đường dẫn
	if (isAdminRoute && userRole === 'user'
	) {
		// Nếu người dùng có quyền truy cập, hiển thị nội dung của props (children)
		return (<>{props.children}</>)
	} else {
		// Nếu người dùng không có quyền truy cập, hiển thị thành phần NotPermitted
		return (<NotPermitted />)
	}
}

const ProtectedRouteDanhGia = (props) => {
	// Lấy thông tin xác thực người dùng từ Redux store
	const isAuthenticated = useSelector(state => state.account.isAuthenticated);
	console.log("isAuthenticated from ProtectedRouteDanhGia", isAuthenticated)
	return (
		<>
			{isAuthenticated === true ?
				<>
					{/* Nếu người dùng đã xác thực, kiểm tra quyền truy cập dựa trên vai trò */}
					<RoleBaseRoute>
						{props.children}
					</RoleBaseRoute>
				</>
				:
				// Nếu người dùng chưa xác thực, chuyển hướng đến trang đăng nhập
				{
					
				}
			}
		</>
	)
}

export default ProtectedRouteDanhGia;