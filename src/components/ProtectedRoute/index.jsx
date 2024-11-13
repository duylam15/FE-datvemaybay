import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import NotPermitted from './NotPermitted';
import { doGetAccountAction } from '../../redux/account/accountSlice'; // Đảm bảo đường dẫn chính xác

const RoleBaseRoute = (props) => {
	const isAdminRoute = window.location.pathname.startsWith('/admin');
	const user = useSelector(state => state.account.user);
	const userRole = user?.quyen?.tenQuyen;

	console.log("user in RoleBaseRoute", user);
	console.log("userRole", userRole);

	if (isAdminRoute && userRole === 'admin' ||
		!isAdminRoute && (userRole === 'USER' || userRole === 'ADMIN')
	) {
		return (<>{props.children}</>);
	} else {
		return (<NotPermitted />);
	}
};

const ProtectedRoute = (props) => {
	const dispatch = useDispatch();
	const isAuthenticated = useSelector(state => state.account.isAuthenticated);
	const user = useSelector(state => state.account.user);

	useEffect(() => {
		// Khi xác thực thành công nhưng user chưa có dữ liệu, gọi doGetAccountAction để lấy thông tin chi tiết
		if (isAuthenticated && !user?.quyen) {
			dispatch(doGetAccountAction(/* truyền tham số nếu cần */));

			console.log("isAuthenticated", isAuthenticated)
			console.log("user", user)
		}
	}, [isAuthenticated, user, dispatch]);

	console.log("isAuthenticated", isAuthenticated)
	console.log("user", user)
	return (
		<>
			{isAuthenticated ? (
				<RoleBaseRoute>
					{props.children}
				</RoleBaseRoute>
			) : (
				<Navigate to='/login' replace />
			)}
		</>
	);
};

export default ProtectedRoute;
