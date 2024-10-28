import { useEffect, useState } from "react";
import { dataMayBay } from "../services/mayBayServices";

const useEffectDataMayBay = () =>{

  const [mayBay ,  setMayBay] =  useState([]);

  useEffect(() => {
    dataMayBay()
      .then((response) => {
        setMayBay(response.data.data);
      })
      .catch((error) => {
        console.log(error.response.data.message);
      })
  },[])

  return mayBay;
}

export default useEffectDataMayBay;