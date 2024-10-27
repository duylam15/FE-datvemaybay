import axios from 'axios';

const API_URL = 'http://localhost:8080';

export const searchMerchans = async (searchTerm) => {
  try {
    const response = await axios.get(`${API_URL}/findMerchandise`, {
      params: { keyword: searchTerm },
    });
    return response; // Return the response for further processing
  } catch (error) {
    console.error('Error fetching search results:', error);
    throw error; // Throw error to handle it in the calling function
  }
};

export const handleSort = async (
  field,
  sortOrder,
  setMerchandise,
  setSortOrder,
  setSortField
) => {
  try {
    const response = await axios.get(`${API_URL}/getAllMerchandiseSorted`, {
      params: { field, order: sortOrder },
    });
    console.log('Sorted results:', response.data);
    setMerchandise(response.data.data);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    setSortField(field);
  } catch (error) {
    console.error('Error fetching sorted results:', error);
  }
};
