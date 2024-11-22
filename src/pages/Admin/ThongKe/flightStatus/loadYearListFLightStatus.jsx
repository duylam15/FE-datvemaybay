import { useEffect, useState } from "react";


export default function loadYearListFLightStatus() {
  const [yearListFLightStatus, setYearListFLightStatus] = useState([]);
  useEffect(() => {
    const currentDate = new Date();
    let result = [];
    for (let i = 2019; i <= currentDate.getFullYear(); i++) {
      result.push(i);
    }
    setYearListFLightStatus(result)
  }, [])

  return yearListFLightStatus;
}