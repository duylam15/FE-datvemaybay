import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const ContactInfoForm = ({ contactData, setContactData, customers }) => {
	const [error, setError] = useState({});
	const [showForm, setShowForm] = useState(false);
	const [touched, setTouched] = useState({});
	const [prevCCCD, setPrevCCCD] = useState(''); // Lưu CCCD trước đó
	const [flag, setFlag] = useState(false)

	const isAuthenticated = useSelector(state => state.account.isAuthenticated);
	const idKhachHangIslog = useSelector(state => state.account.user.khachHang);

	console.log("isAuthenticated from seat", isAuthenticated)
	console.log("idKhachHangIslog from seat", idKhachHangIslog.idKhachHang)
	console.log("idKhachHangIslog from seat", idKhachHangIslog.cccd)
	console.log("idKhachHangIslog from seat", idKhachHangIslog.email)
	console.log("idKhachHangIslog from seat", idKhachHangIslog.soDienThoai)

	// Cập nhật contactData khi người dùng đăng nhập
	useEffect(() => {
		if (isAuthenticated && idKhachHangIslog) {
			setContactData({
				cccd: idKhachHangIslog.cccd || '',
				email: idKhachHangIslog.email || '',
				soDienThoai: idKhachHangIslog.soDienThoai || '',
				phoneType: 'personal',
			});
			setFlag(true); // Gắn cờ để khóa các trường nếu cần
		}
	}, [isAuthenticated, idKhachHangIslog, setContactData]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFlag(false)
		// Kiểm tra nếu CCCD thay đổi
		if (name === 'cccd' && value !== prevCCCD) {
			setPrevCCCD(value); // Cập nhật giá trị CCCD mới

			// Tìm khách hàng dựa trên CCCD
			const matchedCustomer = customers.find(customer => customer.cccd === value);

			// Nếu có khách hàng khớp, cập nhật thông tin
			if (matchedCustomer) {
				setFlag(true)
				setContactData({
					cccd: value,
					email: matchedCustomer.email || '',
					soDienThoai: matchedCustomer.soDienThoai || '',
					phoneType: "personal"
				});
			} else {
				// Nếu không tìm thấy, reset các trường khác
				setContactData({
					cccd: value,
					email: '',
					soDienThoai: '',
					phoneType: "personal"
				});
			}

			// Xóa lỗi
			setError({});
			return; // Ngừng xử lý tiếp các logic khác cho CCCD
		}

		// Cập nhật các trường khác ngoài CCCD
		setContactData(prevData => ({
			...prevData,
			[name]: value,
		}));

		// Xóa lỗi khi có thay đổi
		setError(prevError => ({ ...prevError, [name]: '' }));
	};

	const handleBlur = (e) => {
		const { name } = e.target;
		setTouched(prevTouched => ({ ...prevTouched, [name]: true }));
		validateField(name);
	};

	const validateEmail = (email) => {
		const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailPattern.test(email);
	};

	const validatePhone = (phone) => {
		const phonePattern = /^\d{10}$/; // Chỉ cho phép số điện thoại có 10 chữ số
		return phonePattern.test(phone);
	};

	const validateField = (fieldName) => {
		const newErrors = {};
		const value = contactData[fieldName];

		switch (fieldName) {
			case 'cccd':
				if (!value) {
					newErrors.cccd = 'Căn cước công dân không được để trống.';
				} else if (!/^\d{9}$|^\d{12}$/.test(value)) {
					newErrors.cccd = 'Căn cước công dân phải là 9 hoặc 12 số.';
				}
				break;
			case 'email':
				// if (!value) {
				// 	newErrors.email = 'Email không được để trống.';
				// } else if (!validateEmail(value)) {
				// 	newErrors.email = 'Email không hợp lệ.';
				// }
				break;
			case 'soDienThoai':
				// if (!value) {
				// 	newErrors.soDienThoai = 'Số điện thoại không được để trống.';
				// } else if (!validatePhone(value)) {
				// 	newErrors.soDienThoai = 'Số điện thoại không hợp lệ (10 chữ số).';
				// }
				break;
			default:
				break;
		}

		setError(prevError => ({ ...prevError, ...newErrors }));
	};

	const toggleForm = () => setShowForm(!showForm);

	console.log("contactData:", contactData);

	return (
		<div className='ContactInfoForm'>
			<h2 className='book--heading'>Liên lạc</h2>
			<div className="container">
				<div className="contact-info-form">
					<div className='adult-form__header' onClick={toggleForm}>
						<h1 className='form__heading '>THÔNG TIN LIÊN LẠC</h1>
					</div>
					<form className={`form-content show`} autoComplete="off">
						<div className="form-group-adultform">
							<label className={touched.cccd && error.cccd ? 'error-adult-label' : ''}>Căn cước công dân*</label>
							<input
								type="text"
								name="cccd"
								placeholder="Căn cước công dân"
								value={contactData.cccd || ''}
								onChange={handleChange}
								onBlur={handleBlur}
								className={touched.cccd && error.cccd ? 'error-adult-input' : ''}
								disabled={isAuthenticated}
							/>
							{touched.cccd && error.cccd && <span className="error-adult-form">{error.cccd}</span>}
						</div>
						<div className="form-group-adultform">
							<label className={touched.email && error.email ? 'error-adult-label' : ''}>Địa chỉ email</label>
							<input
								type="email"
								name="email"
								placeholder="Email"
								value={contactData.email || ''}
								className={error.email && touched.email ? 'error-adult-input' : ''}
								onChange={handleChange}
								onBlur={handleBlur}
								disabled={!!contactData.email && flag}
							/>
							{error.email && touched.email && <span className="error-adult-form">{error.email}</span>}
						</div>
						<div className="form-group-adultform">
							<label >Loại điện thoại</label>
							<select name="phoneType" onChange={handleChange}
							>
								<option value="personal">Cá nhân</option>
								<option value="business">Doanh nghiệp</option>
							</select>
						</div>
						<div className="form-group-adultform">
							<label className={touched.soDienThoai && error.soDienThoai ? 'error-adult-label' : ''}>Số điện thoại</label>
							<input
								type="text"
								name="soDienThoai"
								placeholder="Số điện thoại"
								value={contactData.soDienThoai || ''}
								className={error.soDienThoai && touched.soDienThoai ? 'error-adult-input' : ''}
								onChange={handleChange}
								onBlur={handleBlur}
								disabled={!!contactData.soDienThoai && flag}
							/>
							{error.soDienThoai && touched.soDienThoai && <span className="error-adult-form">{error.soDienThoai}</span>}
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default ContactInfoForm;
