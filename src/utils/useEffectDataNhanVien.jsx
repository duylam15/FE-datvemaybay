import { useEffect, useState } from "react";
import { dataNhanVien } from "../services/nhanVienServices";

export const useEffectDataNhanVien = () => {

  const [nhanviens, setNhanViens] = useState([]);

  useEffect(() => {
    dataNhanVien()
      .then((response) => {
        setNhanViens(response.data.data);
      })
      .catch((error) => {
        console.log(error.response.data.message);
      })
  }, []);

  return nhanviens;
}