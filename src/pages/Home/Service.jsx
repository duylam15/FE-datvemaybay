import React, { useEffect, useState } from 'react';
import { getServiceData } from '../../services/homePageServices';

export default function Service({ navigate }) {
	const [serviceData, setServiceData] = useState([]);

	const serviceDataaa = [
		{
			"id": 1,
			"title": "Hành lí",
			"icons": "public/icons/service-01.png"
		},
		{
			"id": 2,
			"title": "Chọn chỗ ngồi",
			"icons": "public/icons/service-02.png"
		},
		{
			"id": 3,
			"title": "Nâng hạng vé",
			"icons": "public/icons/service-03.png"
		},
		{
			"id": 4,
			"title": "Phòng chờ",
			"icons": "public/icons/service-04.png"
		},
		{
			"id": 5,
			"title": "Bamboo Shop",
			"icons": "public/icons/service-05.png"
		},
		{
			"id": 6,
			"title": "Thẻ quà tặng",
			"icons": "public/icons/service-06.png"
		},
		{
			"id": 7,
			"title": "Hành lí đặc biệt",
			"icons": "public/icons/service-07.png"
		},
		{
			"id": 8,
			"title": "Khách sạn",
			"icons": "public/icons/service-08.png"
		}
	]
	// useEffect(() => {
	// 	const fetchServiceData = async () => {
	// 		try {
	// 			const response = await getServiceData()
	// 			setServiceData(response.data);
	// 		} catch (error) {
	// 			console.error("Error fetching service data:", error);
	// 		}
	// 	};
	// 	fetchServiceData();
	// }, []);

	return (
		<div className="service">
			<div className="container">
				<div className="service__inner">
					<div className="service__list">
						{Array.isArray(serviceDataaa) && serviceDataaa.map(service => (
							<div className="service__item" key={service.id} onClick={() => navigate(`/post/${service.id}`)}>
								<img src={service.icons} alt="" className="service__icon" />
								<p className="service__title">{service.title}</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
