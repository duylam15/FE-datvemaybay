import { useEffect, useState } from 'react';
import { thongKeTrangThaiByYear, thongKeTrangThaiByYearAndMonth, thongKeTrangThaiByYearAndQuy } from '../../../../services/chuyenBayServices';

export default function dataFlightStatus(timeFlightStatus, selectYearFLightStatus, viewFlightStatus) {
  const [status, setStatus] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const loadData = (data, type) => {
        const currentDate = new Date();
        let result = data.find(
          (item) => item['Year:' + selectYearFLightStatus] != undefined
        )['Year:' + selectYearFLightStatus];
        let formater = [];
        for (let month in result) {
          const data = result[month];
          if (viewFlightStatus === 'Table') {
            formater.push({ time: type + month.split(":")[1], status: "Đúng giờ", value: data.SCHEDULED })
            formater.push({ time: type + month.split(":")[1], status: "Trễ giờ", value: data.DELAYED })
            formater.push({ time: type + month.split(":")[1], status: "Huỷ", value: data.CANCELED })
          }
          else {
            if (data.SCHEDULED > 0 || data.DELAYED > 0 || data.CANCELED > 0) {
              formater.push({ time: type + month.split(":")[1], status: "Đúng giờ", value: data.SCHEDULED })
              formater.push({ time: type + month.split(":")[1], status: "Trễ giờ", value: data.DELAYED })
              formater.push({ time: type + month.split(":")[1], status: "Huỷ", value: data.CANCELED })
            }
          }
        }
        console.log(formater);
        setStatus(formater);
      }
      let response = null;
      if (timeFlightStatus === 'monthly') {
        response = await thongKeTrangThaiByYearAndMonth();
        loadData(response.data.data, "Tháng ");
      }
      if (timeFlightStatus === 'quarterly') {
        response = await thongKeTrangThaiByYearAndQuy();
        console.log(response);
        loadData(response.data.data, "Quý ");
      }
      if (timeFlightStatus == 'yearly') {
        let result = [];
        response = await thongKeTrangThaiByYear();
        const data = response.data.data;
        for (let item in data) {
          const getDetailItem = data[item];
          for (let detailItem in getDetailItem) {
            const dataDetailItem = getDetailItem[detailItem];
            result.push({ time: "Năm " + detailItem.split(":")[1], status: "Đúng giờ", value: dataDetailItem.SCHEDULED })
            result.push({ time: "Năm " + detailItem.split(":")[1], status: "Trễ giờ", value: dataDetailItem.DELAYED })
            result.push({ time: "Năm " + detailItem.split(":")[1], status: "Huỷ", value: dataDetailItem.CANCELED })
          }
        }
        setStatus(result);
      }
    };
    fetchData();
  }, [timeFlightStatus, selectYearFLightStatus, viewFlightStatus]);

  return status;
}
