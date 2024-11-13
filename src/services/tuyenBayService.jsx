import axios from 'axios';

const REST_API_BASE_URL = 'http://localhost:8080';

export const dataTuyenBay = () =>
  axios.get(`${REST_API_BASE_URL}/getAllRoutes`);

export const block = async (idTuyenBay) => {
  try {
    const response1 = await axios.put(
      `${REST_API_BASE_URL}/blockRoute/${idTuyenBay}`
    );
    console.log('Block Route:', response1.data);
    const response2 = await fetch(`${REST_API_BASE_URL}/getAllRoutes`);
    const data = await response2.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching block airport:', error);
  }
};
