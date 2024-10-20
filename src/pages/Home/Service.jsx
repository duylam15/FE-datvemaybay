import React, { useEffect, useState } from 'react';
import { getServiceData } from '../../services/homePageServices';

export default function Service({ navigate }) {
	const [serviceData, setServiceData] = useState([]);

	useEffect(() => {
		const fetchServiceData = async () => {
			try {
				const response = await getServiceData()
				setServiceData(response.data);
			} catch (error) {
				console.error("Error fetching service data:", error);
			}
		};
		fetchServiceData();
	}, []);

	return (
		<div className="service">
			<div className="container">
				<div className="service__inner">
					<div className="service__list">
						{Array.isArray(serviceData) && serviceData.map(service => (
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
