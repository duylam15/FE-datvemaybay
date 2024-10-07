import React from 'react'

export default function BannerExplore() {
	return (
		<div className="banner-explore">
			<div className="container">
				<div className="banner-explore__inner">
					<div className="banner-explore__section">
						<h1 className="banner-explore__heading heading">Thông tin hữu ích cho chuyến bay của bạn</h1>
						<p className="banner-explore__desc desc">Tiêu chuẩn hành lý, điều kiện vé bay,... đều có ở đây!</p>
					</div>
					<button className="banner-explore__action" onClick={() => navigate(`/post`)}>
						Tra cứu <img src="public/icons/next-icon.svg" alt="" />
					</button>
				</div>
			</div>
		</div>
	)
}
