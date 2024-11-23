import { useEffect, useState } from "react";
import { thongKeSoChuyenBay, thongKeSoNhanVien } from "../../../../services/chuyenBayServices";


export default function numNhanVienAndChuyenBay() {

  const [result, setResult] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const responseNhanVien = await thongKeSoNhanVien();
      const numNhanVien = responseNhanVien.data.data;
      const responseChuyenBay = await thongKeSoChuyenBay();
      const numChuyenBay = responseChuyenBay.data.data;
      setResult([numNhanVien, numChuyenBay]);
    }
    fetchData();
  }, []);
  return result;
}