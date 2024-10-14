import axios from "../utils/axios-customize"

export const getListLocations = () => {
	return axios.get(`/locations`);
}

export const getServiceData = () => {
	return axios.get(`/serviceData`);
}

export const getListMenuPost = () => {
	return axios.get(`/menuPost`);
}

export const getNewsData = () => {
	return axios.get(`/newsData`);
}

export const getBonusServicesData = () => {
	return axios.get(`/bonusServicesData`);
}

export const getExperienceData = () => {
	return axios.get(`/experienceData`);
}

export const getPopularData = () => {
	return axios.get(`/popularData`);
}

export const getHotFlightsData = () => {
	return axios.get(`/hotFlightsData`);
}

export const getFooterMenuPost = () => {
	return axios.get(`/footerMenuPost`);
}





// Hàm lấy danh sách chuyến bay
export const getListFlights = async (departureLocation, arrivalLocation, departureDate, numberOfTickets) => {
	try {
		const response = await axios.get('/flights', {
			params: {
				departureLocation,
				arrivalLocation,
				departureDate,
				numberOfTickets
			}
		});
		return response.data; // Trả về dữ liệu chuyến bay
	} catch (error) {
		console.error('Lỗi khi gọi API để lấy danh sách chuyến bay:', error);
		throw error; // Ném lỗi ra ngoài để xử lý ở nơi gọi hàm
	}
};

