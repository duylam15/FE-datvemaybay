import axios from 'axios';

const API_URL = 'http://localhost:8080';

export const handleSort = async (
  field,
  sortOrder,
  setRoutes,
  setSortOrder,
  setSortField
) => {
  try {
    const response = await axios.get(`${API_URL}/getAllRoutesSorted`, {
      params: { field, order: sortOrder },
    });
    console.log('Sorted results:', response.data);
    setRoutes(response.data.data);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    setSortField(field);
  } catch (error) {
    console.error('Error fetching sorted results:', error);
  }
};
