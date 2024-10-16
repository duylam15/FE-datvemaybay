import { useEffect, useState } from "react";
import { dataTuyenBay } from "../services/tuyenBayService";

const useEffectDataTuyenBay = () =>{

  const [tuyenBay ,  setTuyenBay] =  useState([]);

  useEffect(() => {
    dataTuyenBay()
      .then((response) => {
        setTuyenBay(response.data.data);
      })
      .catch((error) => {
        console.log(error.response.data.message);
      })
  },[]);

  return tuyenBay;
}

export default useEffectDataTuyenBay;