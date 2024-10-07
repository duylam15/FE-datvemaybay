import React from 'react'

export default function Portlet({ navigate }) {
	return (
		<div className="portlet">
			<div className="container">
				<div className="portlet__inner">
					<div className="portlet__top">
						<h1 className="portlet__heading heading">Ưu đãi</h1>
						<div className="tips">
							<img src="public/icons/tips-icon.svg" alt="" className="tips__icon" />
							<p className="tips__desc">
								Tham khảo  <span className="highlight">các ưu đãi</span> hấp dẫn!
							</p>
						</div>
					</div>
					<div className="portlet__content">
						<div className="portlet__left">
							<div className="portlet__item">
								<img src="public/images/portlet-01.png" alt="" className="portlet__img" />
								<p onClick={() => navigate(`/post`)} className="portlet__action">Nhận ưu đãi <img src="public/icons/arrow.svg" alt="" /></p>
							</div>
						</div>
						<div className="portlet__right">
							<div className="portlet__item">
								<img src="public/images/portlet-02.png" alt="" className="portlet__img" />
								<p onClick={() => navigate(`/post`)} className="portlet__action">Nhận ưu đãi <img src="public/icons/arrow.svg" alt="" /></p>
							</div>
							<div className="portlet__item">
								<img src="public/images/portlet-03.png" alt="" className="portlet__img" />
								<p onClick={() => navigate(`/post`)} className="portlet__action">Nhận ưu đãi <img src="public/icons/arrow.svg" alt="" /></p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
