import { useEffect, useState } from "react";
import { getNhanVienById } from "../services/nhanVienServices";

export default function useEffectDataNhanVienByID(id){
  const [nhanviens, setNhanVien] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await  getNhanVienById(id);
            setNhanVien(response.data.data);
        } catch (error) {
            console.error('Error fetching data', error);
        }
    };
    fetchData();
}, []);

  return nhanviens ;
}