import { useEffect, useState } from "react";
import { dataCongBySanBay } from "../services/congServices";

export const useEffectDataCongBySanBay = (sanBay) => {
  const [cong ,  setcong] =  useState();

  useEffect(() => {
    dataCongBySanBay(sanBay == null ? 0 : sanBay.idSanBay)
      .then((response) => {
        console.log(response.data.data);
        setcong(response.data.data);
      })
      .catch((error) => {
        console.log(error.response.data.message);
      })
  },[])

  return cong;
}