import { useState,useEffect } from "react";
import { dataMayBayById } from "../services/mayBayServices";

function useEffectDataMayBayById(id) {
  const [mayBay ,  setMayBay] =  useState();

  useEffect(() => {
    dataMayBayById(id)
      .then((response) => {
        setMayBay(response.data.data);
      })
      .catch((error) => {
        console.log(error.response.data.message);
      })
  },[])

  return mayBay;
}

export default useEffectDataMayBayById;