import { useEffect, useState } from "react";
import { thongKeTrangThaiByYear } from "../../../services/chuyenBayServices";


export default function dataFlightStatus() {
  const [status, setStatus] = useState({});

  const flightStatusData = [
    { status: 'Đúng giờ', percent: 0 },
    { status: 'Trễ', percent: 0 },
    { status: 'Hủy', percent: 0 },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const response = await thongKeTrangThaiByYear();
      console.log('data thong ke data flight status : ')
      const data = response.data.data;
      const currentDate = new Date();
      let result = data.find((item) =>
        item["Year:" + currentDate.getFullYear()] != undefined
      )["Year:" + currentDate.getFullYear()];
      setStatus(result);
    }
    fetchData();
  }, [])
  flightStatusData[0].percent = status["SCHEDULED"] * 100 / status["TONG"];
  flightStatusData[1].percent = status["DELAYED"] * 100 / status["TONG"];
  flightStatusData[2].percent = status["CANCELED"] * 100 / status["TONG"];
  const roundedData = flightStatusData.map(item => ({
    ...item,
    percent: parseFloat(item.percent.toFixed(2))
  }));
  return roundedData;
}