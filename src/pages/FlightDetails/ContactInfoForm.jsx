import React, { useState, useEffect } from 'react';

const ContactInfoForm = ({ contactData, setContactData }) => {
	const [error, setError] = useState({});
	const [showForm, setShowForm] = useState(false);
	const [touched, setTouched] = useState({});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setContactData(prevData => ({
			...prevData,
			[name]: value,
		}));
		setError(prevError => ({ ...prevError, [name]: '' })); // Xóa lỗi khi có thay đổi
	};

	const handleBlur = (e) => {
		const { name } = e.target;
		setTouched(prevTouched => ({ ...prevTouched, [name]: true })); // Đánh dấu trường đã chạm vào
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

	const validateCountryCode = (code) => {
		const countryCodePattern = /^\d{1,3}$/; // Chỉ cho phép mã quốc gia có từ 1 đến 3 chữ số
		return countryCodePattern.test(code);
	};

	const validateField = (fieldName) => {
		const newErrors = {};
		const value = contactData[fieldName];

		switch (fieldName) {
			case 'email':
				if (!value) {
					newErrors.email = 'Email không được để trống.';
				} else if (!validateEmail(value)) {
					newErrors.email = 'Email không hợp lệ.';
				}
				break;
			case 'phone':
				if (!value) {
					newErrors.phone = 'Số điện thoại không được để trống.';
				} else if (!validatePhone(value)) {
					newErrors.phone = 'Số điện thoại không hợp lệ (10 chữ số).';
				}
				break;
			case 'countryCode':
				if (!value) {
					newErrors.countryCode = 'Vui lòng nhập mã quốc gia.';
				} else if (!validateCountryCode(value)) {
					newErrors.countryCode = 'Mã quốc gia không hợp lệ (1-3 chữ số).';
				}
				break;
			default:
				break;
		}

		setError(prevError => ({ ...prevError, ...newErrors }));
	};

	const toggleForm = () => setShowForm(!showForm);

	useEffect(() => {
		Object.keys(contactData).forEach(field => validateField(field));
	}, [contactData]);

	return (
		<div className='ContactInfoForm'>
			<h2 className='book--heading'>Liên lạc</h2>
			<div className="container">
				<div className="contact-info-form">
					<div className='adult-form__header' onClick={toggleForm}>
						<h1 className='form__heading '>THÔNG TIN LIÊN LẠC</h1>
						<div onClick={toggleForm} className="toggle-button-adult-form">
							{showForm ? 'Ẩn Thông Tin' : 'Điền Thông Tin'}
						</div>
					</div>
					<div className={`form-content ${showForm ? 'show' : ''}`}>
						<div className="form-group">
							<label className={touched.email && error.email ? 'error-adult-label' : ''}>Địa chỉ email</label>
							<input
								type="email"
								name="email"
								placeholder="Email"
								className={error.email && touched.email ? 'error-adult-input' : ''}
								onChange={handleChange}
								onBlur={handleBlur}
							/>
							{error.email && touched.email && <span className="error-adult-form">{error.email}</span>}
						</div>
						<div className="form-group">
							<label >Loại điện thoại</label>
							<select name="phoneType" onChange={handleChange}>
								<option value="personal">Cá nhân</option>
								<option value="business">Doanh nghiệp</option>
							</select>
						</div>
						<div className="form-group">
							<label className={touched.countryCode && error.countryCode ? 'error-adult-label' : ''}>Mã quốc gia</label>
							<input
								type="text"
								name="countryCode"
								placeholder="249"
								className={error.countryCode && touched.countryCode ? 'error-adult-input' : ''}
								onChange={handleChange}
								onBlur={handleBlur}
							/>
							{error.countryCode && touched.countryCode && <span className="error-adult-form">{error.countryCode}</span>}
						</div>
						<div className="form-group">
							<label className={touched.phone && error.phone ? 'error-adult-label' : ''}>Số điện thoại</label>
							<input
								type="text"
								name="phone"
								placeholder="Số điện thoại"
								className={error.phone && touched.phone ? 'error-adult-input' : ''}
								onChange={handleChange}
								onBlur={handleBlur}
							/>
							{error.phone && touched.phone && <span className="error-adult-form">{error.phone}</span>}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ContactInfoForm;
