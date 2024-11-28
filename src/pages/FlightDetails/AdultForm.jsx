import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdultForm = ({ index, adultData, setAdultData, selectedTicket, numberOfTicketsToDetailNumber }) => {
	const [errors, setErrors] = useState({});
	const [touched, setTouched] = useState({});
	const [existingCCCDs, setExistingCCCDs] = useState([]); // Lưu các CCCD hiện tại từ API
	const [showForm, setShowForm] = useState(false);

	useEffect(() => {
		// Fetch danh sách khách hàng và lưu CCCD
		const fetchCustomers = async () => {
			try {
				const response = await axios.get('http://localhost:8080/khachhang/getAllCustomer');
				if (response.data.statusCode === 200) {
					const cccds = response.data.data.map(customer => customer.cccd); // Lấy danh sách CCCD
					setExistingCCCDs(cccds);
				} else {
					console.error('Lỗi khi lấy danh sách khách hàng:', response.data.message);
				}
			} catch (error) {
				console.error('Lỗi khi gọi API:', error.message);
			}
		};
		fetchCustomers();
	}, []); // Chỉ gọi API một lần khi component mount

	const handleChange = (e) => {
		const { name, value } = e.target;
		setAdultData(prevData => {
			const newData = [...prevData];
			newData[index - 1] = { ...newData[index - 1], [name]: value };
			return newData;
		});
		setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
	};

	const handleBlur = (e) => {
		const { name } = e.target;
		setTouched(prevTouched => ({ ...prevTouched, [name]: true }));
		validateField(name);
	};

	const validateField = (fieldName) => {
		const newErrors = {};
		const value = adultData[index - 1][fieldName];

		switch (fieldName) {
			case 'fullName':
				if (!value) newErrors.fullName = 'Tên không được để trống.';
				break;
			case 'lastName':
				if (!value) newErrors.lastName = 'Họ không được để trống.';
				break;
			case 'gender':
				if (!value) newErrors.gender = 'Giới tính không được để trống.';
				break;
			case 'cccd':
				if (!value) {
					newErrors.cccd = 'Căn cước công dân không được để trống.';
				} else if (!/^\d{9}$|^\d{12}$/.test(value)) {
					newErrors.cccd = 'Căn cước công dân phải là 9 hoặc 12 số.';
				}
				break;
			case 'birthDate':
				if (!value) {
					newErrors.birthDate = 'Ngày sinh không được để trống.';
				} else {
					const birthDate = new Date(value);
					const today = new Date();
					const age = today.getFullYear() - birthDate.getFullYear();
					if (birthDate > today) {
						newErrors.birthDate = 'Ngày sinh không thể ở tương lai.';
					}
				}
				break;
			default:
				break;
		}

		setErrors(prevErrors => ({ ...prevErrors, ...newErrors }));
	};

	const toggleForm = () => setShowForm(!showForm);

	return (
		<div className='AdultForm'>
			<div className="container">
				<div className="adult-form">
					<div className='adult-form__header' onClick={toggleForm}>
						<h3 className='form-title form__heading'>HÀNH KHÁCH {index}</h3>
					</div>
					<form className={`form-content show `} autoComplete="off">
						<div className="form-group-adultform">
							<label className={touched.fullName && errors.fullName ? 'error-adult-label' : ''}>Nhập Tên Đệm và Tên*</label>
							<input
								onInput={handleChange}
								type="text"
								name="fullName"
								placeholder="Tên Đệm và Tên"
								onChange={handleChange}
								onBlur={handleBlur}
								className={touched.fullName && errors.fullName ? 'error-adult-input' : ''}
							/>
							{touched.fullName && errors.fullName && <span className="error-adult-form">{errors.fullName}</span>}
						</div>
						<div className="form-group-adultform">
							<label className={touched.lastName && errors.lastName ? 'error-adult-label' : ''}>Họ*</label>
							<input
								onInput={handleChange}
								type="text"
								name="lastName"
								placeholder="Họ"
								onChange={handleChange}
								onBlur={handleBlur}
								className={touched.lastName && errors.lastName ? 'error-adult-input' : ''}
							/>
							{touched.lastName && errors.lastName && <span className="error-adult-form">{errors.lastName}</span>}
						</div>
						<div className="form-group-adultform">
							<label className={touched.cccd && errors.cccd ? 'error-adult-label' : ''}>Căn cước công dân*</label>
							<input
								onInput={handleChange}
								type="text"
								name="cccd"
								placeholder="Căn cước công dân"
								onChange={handleChange}
								onBlur={handleBlur}
								className={touched.cccd && errors.cccd ? 'error-adult-input' : ''}
							/>
							{touched.cccd && errors.cccd && <span className="error-adult-form">{errors.cccd}</span>}
						</div>

						<div className="form-group-adultform">
							<label className={touched.gender && errors.gender ? 'error-adult-label' : ''}>Giới tính*</label>
							<select
								name="gender"
								onChange={handleChange}
								onBlur={handleBlur}
								className={touched.gender && errors.gender ? 'error-adult-input' : ''}
							>
								<option value="">Chọn giới tính</option>
								<option value="male">Nam</option>
								<option value="female">Nữ</option>
							</select>
							{touched.gender && errors.gender && <span className="error-adult-form">{errors.gender}</span>}
						</div>
						<div className="form-group-adultform">
							<label className={touched.birthDate && errors.birthDate ? 'error-adult-label' : ''}>Ngày sinh</label>
							<input
								onInput={handleChange}
								type="date"
								name="birthDate"
								onChange={handleChange}
								onBlur={handleBlur}
								className={touched.birthDate && errors.birthDate ? 'error-adult-input' : ''}
							/>
							{touched.birthDate && errors.birthDate && <span className="error-adult-form">{errors.birthDate}</span>}
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default AdultForm;
