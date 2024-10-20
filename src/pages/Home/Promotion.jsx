import React, { useState } from 'react';

export default function Promotion() {
	const [showMoreFields, setShowMoreFields] = useState(false);

	return (
		<div className="promotion">
			<div className="container">
				<div className="promotion__inner">
					<div className="promotion__section">
						<h4 className="promotion__heading">Đăng kí Email!</h4>
						<p className="promotion__desc">Đăng ký Email để nhận ngay các thông tin, ưu đãi mới nhất từ Bamboo Airways.</p>
					</div>
					<form action="" className='promotion__form'>
						<div className="promotion__row">
							{/* Ô nhập email và nút đăng ký */}
							<input className='promotion__input w-360'
								type="email"
								placeholder='Nhập email của bạn'
								onFocus={() => setShowMoreFields(true)}
							/>
							<button type='submit' className='promotion__submit'>Đăng kí</button>
						</div>

						{showMoreFields && (
							<>
								<div className="promotion__input-group">
									<div className="promotion__form-group ">
										<label className='promotion__label ' htmlFor="salutation">Danh xưng</label>
										<input className='promotion__input ' type="text" id="salutation" placeholder='Danh xưng' />
									</div>

									<div className="promotion__form-group ">
										<label className='promotion__label' htmlFor="lastName">Họ của bạn</label>
										<input className='promotion__input ' type="text" id="lastName" placeholder='Họ của bạn' />
									</div>

									<div className="promotion__form-group ">
										<label className='promotion__label' htmlFor="firstName">Tên</label>
										<input className='promotion__input ' type="text" id="firstName" placeholder='Tên' />
									</div>

								</div>
								<div className="promotion__input-group ">
									<div className="promotion__form-group">
										<label className='promotion__label ' htmlFor="salutation">Địa chỉ</label>
										<input className='promotion__input  w-340' type="text" id="salutation" placeholder='Địa chỉ' />
									</div>

									<div className="promotion__form-group ">
										<label className='promotion__label' htmlFor="lastName">Ngày sinh</label>
										<input className='promotion__input w-340' type="date" id="lastName" placeholder='Họ của bạn' />
									</div>
								</div>
							</>
						)}
					</form>
				</div>
			</div>
		</div>
	);
}
