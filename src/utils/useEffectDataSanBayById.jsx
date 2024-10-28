import { useEffect, useState } from "react";
import { dataSanBayById } from "../services/sanBayService";

export default function useEffectDataSanBayByID(idSanBay){
  const [sanBay, setSanBay] = useState();

  useEffect(() => {
    dataSanBayById(idSanBay)
      .then((response) => {
        console.log(response.data);
        setSanBay(response.data.data);
      })
}, [idSanBay]);

  return sanBay ;
}