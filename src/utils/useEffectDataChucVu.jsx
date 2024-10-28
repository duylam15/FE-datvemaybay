import { useEffect, useState } from "react"
import { dataChucVu } from "../services/chucVuServices";

export const useEffectDataChucVu = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    dataChucVu()
    .then((response) =>{
      console.log(response.data.data);
      setData(response.data.data);
    })
    .catch((error) => {
      console.log(error.response.data);
    })
  }, []);
  return data;
}