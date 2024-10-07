import React from 'react'

export default function Service({ navigate }) {

	const serviceData = [
		{
			id: 1,
			title: "Hành lí",
			icons: "public/icons/service-01.svg"
		},
		{
			id: 2,
			title: "Chọn chỗ ngồi",
			icons: "public/icons/service-01.svg"
		},
		{
			id: 3,
			title: "Chọn chỗ ngồi",
			icons: "public/icons/service-01.svg"
		},
		{
			id: 4,
			title: "Chọn chỗ ngồi",
			icons: "public/icons/service-01.svg"
		},
		{
			id: 5,
			title: "Chọn chỗ ngồi",
			icons: "public/icons/service-01.svg"
		},
		{
			id: 6,
			title: "Chọn chỗ ngồi",
			icons: "public/icons/service-01.svg"
		},
		{
			id: 7,
			title: "Chọn chỗ ngồi",
			icons: "public/icons/service-01.svg"
		},
		{
			id: 8,
			title: "Chọn chỗ ngồi",
			icons: "public/icons/service-01.svg"
		},
	]

	return (
		<div className="service">
			<div className="container">
				<div className="service__inner">
					<div className="service__list">
						{serviceData.map(service => (
							<div className="service__item" key={service.id}
								onClick={() => navigate(`/post/${service.id}`)} >
								<img src={service.icons} alt="" className="service__icon" />
								<p className="service__title">{service.title}</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}
