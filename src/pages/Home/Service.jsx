import React, { useEffect, useState } from 'react';
import { getServiceData } from '../../services/homePageServices';

export default function Service({ navigate }) {
	const [serviceData, setServiceData] = useState([]);

	const serviceDataaa = [
		{
			"id": 1,
			"title": "Hành lí",
			"icons": "public/icons/service-01.svg"
		},
		{
			"id": 2,
			"title": "Chọn chỗ ngồi",
			"icons": "public/icons/service-01.svg"
		},
		{
			"id": 3,
			"title": "Chọn chỗ ngồi",
			"icons": "public/icons/service-01.svg"
		},
		{
			"id": 4,
			"title": "Chọn chỗ ngồi",
			"icons": "public/icons/service-01.svg"
		},
		{
			"id": 5,
			"title": "Chọn chỗ ngồi",
			"icons": "public/icons/service-01.svg"
		},
		{
			"id": 6,
			"title": "Chọn chỗ ngồi",
			"icons": "public/icons/service-01.svg"
		},
		{
			"id": 7,
			"title": "Chọn chỗ ngồi",
			"icons": "public/icons/service-01.svg"
		},
		{
			"id": 8,
			"title": "Chọn chỗ ngồi",
			"icons": "public/icons/service-01.svg"
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
