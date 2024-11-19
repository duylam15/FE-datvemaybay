import axios from "../utils/axios-80802"

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
  setSortField,
  originalMerchandise,
  typeMerchans
) => {
  try {
    let sortedData;

    if (field === 'idLoaiHangHoa') {
      // Sort by "Loại hàng hoá" name
      sortedData = [...originalMerchandise].sort((a, b) => {
        const nameA =
          typeMerchans.find((t) => t.idLoaiHangHoa === a.idLoaiHangHoa)
            ?.tenLoaiHangHoa || '';
        const nameB =
          typeMerchans.find((t) => t.idLoaiHangHoa === b.idLoaiHangHoa)
            ?.tenLoaiHangHoa || '';
        return sortOrder === 'asc'
          ? nameA.localeCompare(nameB)
          : nameB.localeCompare(nameA);
      });
    } else {
      // Server-side sorting for other fields
      const response = await axios.get(`${API_URL}/getAllMerchandiseSorted`, {
        params: { field, order: sortOrder },
      });
      sortedData = response.data.data;
    }

    // Update the state with sorted data
    setMerchandise(sortedData);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    setSortField(field);
  } catch (error) {
    console.error('Error fetching sorted results:', error);
  }
};

export const block = async (idHangHoa) => {
  try {
    const response1 = await axios.put(
      `${API_URL}/blockMerchandise/${idHangHoa}`
    );
    console.log('Block Merchandise:', response1.data);
    const response2 = await fetch(`${API_URL}/getAllMerchandises`);
    const data = await response2.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching block airport:', error);
  }
};
