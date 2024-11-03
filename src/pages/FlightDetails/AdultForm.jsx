import React, { useEffect, useState } from 'react';

const AdultForm = ({ index, adultData, setAdultData, selectedTicket, numberOfTicketsToDetailNumber }) => {
	const [errors, setErrors] = useState({});
	const [touched, setTouched] = useState({});
	const [showForm, setShowForm] = useState(false);

	console.log("adultDataadultDataadultData", adultData)

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
				if (!value) newErrors.cccd = 'Căn cước công dân không được để trống.';
				break;
			case 'passPort':
				if (!value) newErrors.passPort = 'Hộ chiếu không được để trống.';
				break;
			case 'birthDate':
				if (!value) newErrors.birthDate = 'Ngày sinh không được để trống.';
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
						<h3 className='form-title form__heading'>NGƯỜI LỚN {index} (Người lớn)</h3>
					</div>
					<form className={`form-content show `} autoComplete="off">
						<div className="form-group-adultform">
							<label className={touched.fullName && errors.fullName ? 'error-adult-label' : ''}>Nhập Tên Đệm và Tên*</label>
							<input
								type="text"
								name="fullName"
								placeholder="Tên Đệm và Tên"
								onChange={handleChange}
								onBlur={adultData.fullName ? "" : handleBlur}
								className={touched.fullName && errors.fullName ? 'error-adult-input' : ''}
							/>
							{touched.fullName && errors.fullName && <span className="error-adult-form">{errors.fullName}</span>}
						</div>
						<div className="form-group-adultform">
							<label className={touched.lastName && errors.lastName ? 'error-adult-label' : ''}>Họ*</label>
							<input
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
							<label className={touched.passPort && errors.passPort ? 'error-adult-label' : ''}>Hộ chiếu*</label>
							<input
								type="text"
								name="passPort"
								placeholder="Hộ chiếu"
								onChange={handleChange}
								onBlur={handleBlur}
								className={touched.passPort && errors.passPort ? 'error-adult-input' : ''}
							/>
							{touched.passPort && errors.passPort && <span className="error-adult-form">{errors.passPort}</span>}
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
								<option value="other">Khác</option>
							</select>
							{touched.gender && errors.gender && <span className="error-adult-form">{errors.gender}</span>}
						</div>
						<div className="form-group-adultform">
							<label className={touched.birthDate && errors.birthDate ? 'error-adult-label' : ''}>Ngày sinh</label>
							<input
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
