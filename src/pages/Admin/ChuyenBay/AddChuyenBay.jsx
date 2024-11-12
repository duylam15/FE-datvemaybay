import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import LayOutThongBao from '../../../layout/LayoutThongBao/layOutThongBao';
import { addChuyenbay, dataChuyenBay, getChuyenBayById, updateChuyenBay } from '../../../services/chuyenBayServices';
import { dataCong } from '../../../services/congServices';
import { dataMayBay, editMayBay } from '../../../services/mayBayServices';
import { dataNhanVien, editNhanVien } from '../../../services/nhanVienServices';
import { dataSanBay } from '../../../services/sanBayService';
import { dataTuyenBay } from '../../../services/tuyenBayService';
import './chuyenbay.css';
export const AddChuyenBay = () => {

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const idChuyenBay = queryParams.get('id');
  const action = idChuyenBay ? "edit" : "add";
  const [dataSelectChuyenBay, setDataSelectChuyenBay] = useState([]);
  const [loadData, setLoadData] = useState(0);
  const [delay, setDelay] = useState(0);
  const [errorDelay, setErrorDelay] = useState("");
  const [iataChuyenBay, setIataChuyenBay] = useState("");
  const [icaoChuyenBay, setIcaoChuyenBay] = useState("");
  const [ngayBay, setNgayBay] = useState("");
  const [thoiGianBatDauDuTinh, setthoiGianBatDauDuTinh] = useState("");
  const [thoiGianKetThucDuTinh, setThoiGianKetThucDuTinh] = useState("");
  const [thoiGianBatDauThucTe, setthoiGianBatDauThucTe] = useState("");
  const [thoiGianKetThucThucTe, setThoiGianKetThucThucTe] = useState("");
  const [trangThaiCu, setTrangThaiCu] = useState("0");
  const [trangThai, setTrangThai] = useState(idChuyenBay ? "0" : "SCHEDULED");
  const [trangThaiActive, setTrangThaiActive] = useState("ACTIVE");
  const [soGhe, setSoGhe] = useState(0);
  const [nvhk, setNvhk] = useState("");

  const [chuyenBays, setChuyenBays] = useState([]);
  let [tuyenBays, setTuyenBays] = useState([]);
  const [datacong, setdatacong] = useState([]);
  const [selectCong, setSelectCong] = useState(0);
  const [cong, setCong] = useState();
  const [sanBayBatDau, setSanBayBatDau] = useState(0);
  const [sanBayBatDauCu, setSanBayBatDauCu] = useState(0);
  const [sanBayKetThuc, setSanBayKetThuc] = useState(0);
  const [sanBay, setDataSanBay] = useState([]);
  const [mayBays, setMayBays] = useState([]);
  const [selectMayBay, setSelectMayBay] = useState("0");
  const [mayBay, setMayBay] = useState();

  let [dataSanBayBatDau, setDataSanBayBatDau] = useState({
    idSanBay: 0,
    tenSanBay: "",
    iataSanBay: "",
    icaoSanBay: "",
    diaChi: "",
    thanhPho: "",
    quocGia: ""
  });
  let [dataSanBayKetThuc, setDataSanBayKetThuc] = useState({
    idSanBay: 0,
    tenSanBay: "",
    iataSanBay: "",
    icaoSanBay: "",
    diaChi: "",
    thanhPho: "",
    quocGia: ""
  });

  const [tuyenBay, setTuyenBay] = useState();
  const [selectTuyenBay, setSelectTuyenBay] = useState(0);
  const handleSelectTuyenBay = (e) => {
    setSelectTuyenBay(e.target.value);
    const id = e.target.value;
  }

  const handleIataChuyenBay = (e) => {
    setIataChuyenBay(e.target.value);
  }

  const handleIcaoChuyenBay = (e) => {
    setIcaoChuyenBay(e.target.value);
  }

  const handleNgayBay = (e) => {
    setNgayBay(e.target.value);
  }

  const handleThoiGianBatDauDuTinh = (e) => {
    const currentTime = new Date();
    const timeStartWish = new Date(e.target.value);
    if (currentTime.getTime() >= timeStartWish.getTime()) {
      setErrorThoiGianBayDauDuTinh("Thời gian bắt đầu dự tính phải lớn hơn thời gian hiện tại")
      return;
    }
    setthoiGianBatDauDuTinh(e.target.value);
    handleThoiGianBatDauThucTe(e);
  }

  const handleThoiGianBatDauThucTe = (e) => {
    setthoiGianBatDauThucTe(e.target.value);
  }

  const handleThoiGianKetThucDuTinh = (e) => {
    setThoiGianKetThucDuTinh(e.target.value);
    handleThoiGianKetThucThucTe(e);
  }

  const handleThoiGianKetThucThucTe = (e) => {
    setThoiGianKetThucThucTe(e.target.value);
  }

  const handleDelay = (e) => {
    setDelay(e.target.value);
  }
  const [newDelay, setNewDelay] = useState(0);
  const AddTimeDelay = (e) => {
    setNewDelay(e.target.value)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      const increment = Number(newDelay); // Chuyển đổi giá trị thành số
      if (!isNaN(increment)) { // Kiểm tra nếu giá trị hợp lệ
        if (delay + increment < 0) {
          setErrorDelay("Thời gian delay phải dương");
          return;
        }
        const currentTime = new Date();
        const timeStartWish = new Date(thoiGianBatDauDuTinh);
        const incrementmilisecond = increment * 60 * 100;
        const timeStartWishIncrementMiliseconds = new Date(timeStartWish.getTime() + incrementmilisecond);
        if (timeStartWishIncrementMiliseconds.getTime() < currentTime.getTime()) {
          setErrorDelay("Thời gian bắt đầu thực tế không được bé hơn thời gian hiện tại")
          return;
        }
        setDelay(delay + increment); // Tăng giá trị delay
        setNewDelay(""); // Xóa giá trị trong ô input mới
      }
    }
  };

  const [increaseDelay, setIncreaseDelay] = useState(0);
  const handleIncreaseDelay = (e) => {
    setIncreaseDelay(e.target.value);
  }

  const handleTrangThai = (e) => {
    if (trangThaiCu == "COMPLETED" || trangThaiCu == "CANCLED")
      return;
    const currentTime = new Date();
    const timeStartReal = new Date(thoiGianBatDauThucTe);
    const timeEndReal = new Date(thoiGianKetThucThucTe);
    const timeStartWish = new Date(thoiGianBatDauDuTinh);
    let trangThaiMoi = "";
    if (e.target.value == "CANCELED" && trangThai != "IN_FLIGHT")
      trangThaiMoi = e.target.value;
    if (timeStartWish.getTime() == timeStartReal.getTime() && timeStartReal.getTime() > currentTime.getTime() && e.target.value == "SCHEDULED") {
      trangThaiMoi = e.target.value;
    }
    if (timeStartReal.getTime() != timeStartWish.getTime() && timeStartReal.getTime() > currentTime.getTime() && e.target.value == "DELAYED") {
      trangThaiMoi = e.target.value;
    }
    if (currentTime.getTime() >= timeStartReal.getTime() && currentTime.getTime() <= timeEndReal.getTime() && e.target.value == "IN_FLIGHT")
      trangThaiMoi = e.target.value;
    if (timeEndReal.getTime() <= currentTime.getTime() && e.target.value == "COMPLETED")
      trangThaiMoi = e.target.value;
    if (trangThaiMoi != "" && trangThaiCu != "IN_FLIGHT")
      setTrangThai(trangThaiMoi);
    else if (trangThaiMoi == "COMPLETED" && trangThaiCu == "IN_FLIGHT")
      setTrangThai(trangThaiMoi);
    else {
      setThongBao({ message: "Không thể đổi trạng thái", typeMessage: "inpage" });
      setTypeDisplay("block");
    }
  }

  const handleTrangThaiActive = (e) => {
    setTrangThaiActive(e.target.value);
  }


  const handleSelectCong = (e) => {
    setSelectCong(e.target.value);
  }

  const handleMayBay = (e) => {
    setSelectMayBay(e.target.value);
  }

  useEffect(() => {
    console.log("start chuyenBay");
  }, [])

  const [one, setone] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const responseSanBay = await dataSanBay();
      const getDataSanbay = responseSanBay.data.data;
      setDataSanBay(getDataSanbay.filter((item) => item.trangThaiActive == "ACTIVE"));
      setone(true);
    };
    fetchData();
  }, [])

  const [two, settwo] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const responseTuyenBay = await dataTuyenBay();
      let getdataTuyenBay = responseTuyenBay.data.data;

      getdataTuyenBay.map((item) => {
        const sanbaybatdau = sanBay.find((s) => s.idSanBay == item.idSanBayBatDau);
        const sanbayketthuc = sanBay.find((s) => s.idSanBay == item.idSanBayKetThuc);
        item.sanBayBatDau = sanbaybatdau;
        item.sanBayKetThuc = sanbayketthuc;
      });

      setTuyenBays(getdataTuyenBay.filter((item) => item.status == "ACTIVE")
        .sort((a, b) => a.sanBayBatDau?.tenSanBay.localeCompare(b.sanBayBatDau?.tenSanBay)));
      settwo(true);
    }
    fetchData();
  }, [one])

  const [three, setthree] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const responseChuyenBay = await dataChuyenBay();
      let udpateData = [...responseChuyenBay?.data?.data];

      udpateData.map((item) => {
        const sanBayBatDau = sanBay.filter((sanbayitem) => sanbayitem?.idSanBay == item.tuyenBay.idSanBayBatDau);
        const sanBayKetThuc = sanBay.filter((sanbayitem) => sanbayitem?.idSanBay == item.tuyenBay.idSanBayKetThuc);
        item.tuyenBay.sanBayBatDau = sanBayBatDau[0];
        item.tuyenBay.sanBayKetThuc = sanBayKetThuc[0];
      });
      setChuyenBays(udpateData);
      setthree(!three);
    }
    fetchData();
  }, [two])

  useEffect(() => {
    const setMinDatetime = () => {
      const currentDatetime = new Date().toISOString().slice(0, 16);
      document.getElementById('startDatetime').min = currentDatetime;
      document.getElementById('endDatetime').min = currentDatetime;
    };
    setMinDatetime();
    const interval = setInterval(setMinDatetime, 60000);
    return () => clearInterval(interval);
  }, []);

  const [four, setfour] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const reponseDataChuyenBayID = await getChuyenBayById(Number(idChuyenBay));
      const data = reponseDataChuyenBayID.data.data;
      setDataSelectChuyenBay(data);
      setDelay(data.delay);
      setMayBay(data.mayBay);
      setSelectMayBay(data.mayBay?.idMayBay);
      setSelectCong(data.cong?.idCong);
      setCong(data.cong);
      setSanBayBatDauCu(data?.tuyenBay?.idSanBayBatDau);
      setSelectTuyenBay(data.tuyenBay?.idTuyenBay);
      setIataChuyenBay(data.iataChuyenBay);
      setIcaoChuyenBay(data.icaoChuyenBay);
      setNgayBay(data.ngayBay?.toString()?.split("T")[0]);
      setthoiGianBatDauDuTinh(data.thoiGianBatDauDuTinh);
      setthoiGianBatDauThucTe(data.thoiGianBatDauThucTe);
      setThoiGianKetThucDuTinh(data.thoiGianKetThucDuTinh);
      setThoiGianKetThucThucTe(data.thoiGianKetThucThucTe);
      setTrangThaiCu(data.trangThai);
      setTrangThai(data.trangThai);
      setTrangThaiActive(data.trangThaiActive);
      setNvhk(data.nvhk);
      setfour(!four);
    }
    fetchData();
  }, [three])

  const [five, setfive] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const tb = tuyenBays.find((item) => selectTuyenBay == item.idTuyenBay)
      setTuyenBay(tb);
      setDataSanBayBatDau({
        idSanBay: tb?.sanBayBatDau?.idSanBay,
        tenSanBay: tb?.sanBayBatDau?.tenSanBay,
        iataSanBay: tb?.sanBayBatDau?.iataSanBay,
        icaoSanBay: tb?.sanBayBatDau?.icaoSanBay,
        diaChi: tb?.sanBayBatDau?.diaChi,
        thanhPho: tb?.sanBayBatDau?.thanhPho.tenThanhPho,
        quocGia: tb?.sanBayBatDau?.thanhPho?.quocGia?.tenQuocGia
      });
      setSanBayBatDau(tb?.sanBayBatDau?.idSanBay);
      setDataSanBayKetThuc({
        idSanBay: tb?.sanBayKetThuc?.idSanBay,
        tenSanBay: tb?.sanBayKetThuc?.tenSanBay,
        iataSanBay: tb?.sanBayKetThuc?.iataSanBay,
        icaoSanBay: tb?.sanBayKetThuc?.icaoSanBay,
        diaChi: tb?.sanBayKetThuc?.diaChi,
        thanhPho: tb?.sanBayKetThuc?.thanhPho?.tenThanhPho,
        quocGia: tb?.sanBayKetThuc?.thanhPho?.quocGia?.tenQuocGia
      });
      setSanBayKetThuc(tb?.sanBayKetThuc?.idSanBay)
      setfive(!five);
    }
    fetchData();
  }, [selectTuyenBay, tuyenBays, four, sanBayBatDau, thoiGianBatDauDuTinh])

  const differentBetween2Time = (start, end) => {
    const startTIme = new Date(start);
    const endTIme = new Date(end);
    const result = endTIme.getTime() - startTIme.getTime();
    return result > 2 * 60 * 60 * 1000;
  }
  const [six, setsix] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const responseDataMayBay = await dataMayBay();
      const data = responseDataMayBay.data.data;
      const temp = data?.find((item) => Number(item?.idMayBay) == Number(selectMayBay))
      setMayBay(temp);
      setSoGhe((temp?.soHangGheThuong * temp?.soCotGheThuong.toString().length) + (temp?.soHangGheVip * temp?.soCotGheVip.toString().length));
      const mayBayTheoSanBayBatDau = data.filter((item) => item?.sanBay?.idSanBay == sanBayBatDau);
      const mayBayChuaChon = mayBayTheoSanBayBatDau.filter((item) => !chuyenBays.find((item1) => item1.mayBay.idMayBay == item.idMayBay));
      const mayBayDuocChon = mayBayTheoSanBayBatDau.filter((item) => chuyenBays.find((item1) => item.idMayBay == item1.mayBay.idMayBay))
      const mayBayDaHoanThanhChuyenBay = mayBayDuocChon.filter((item) => chuyenBays.find((item1) => item.idMayBay == item1.mayBay.idMayBay && (item1.trangThai == "CANCELED" || item1.trangThai == "COMPLETED") && item1.idChuyenBay != idChuyenBay))
      const mayBayCoSan0 = mayBayDaHoanThanhChuyenBay.filter((item) => !chuyenBays.find((item1) => item.idMayBay == item1.mayBay.idMayBay && (item1.trangThai == "SCHEDULED" || item1.trangThai == "DELAYED" || item1.trangThai == "IN_FLIGHT") && item1.idChuyenBay != idChuyenBay))
      const mayBayCoTheCo = mayBayDaHoanThanhChuyenBay.filter(
        (item) => chuyenBays.find((item1) =>
          item.idMayBay == item1.mayBay.idMayBay
          && (item1.trangThai == "SCHEDULED"
            || item1.trangThai == "DELAYED"
            || item1.trangThai == "IN_FLIGHT")
          && item1.idChuyenBay != idChuyenBay
          && differentBetween2Time(item1.thoiGianKetThucThucTe, thoiGianBatDauDuTinh)
        )
      )

      console.log("may bay cos the co")
      console.log([...mayBayCoTheCo])
      const danhSachMayBay = mayBay != undefined && sanBayBatDauCu == sanBayBatDau ? [mayBay, ...mayBayChuaChon, ...mayBayCoSan0, ...mayBayCoTheCo] : [...mayBayChuaChon, ...mayBayCoSan0, ...mayBayCoTheCo];
      const uniqueArray = danhSachMayBay.filter((item, index, self) =>
        index == self.findIndex((t) => t.idMayBay == item.idMayBay)
      );
      setMayBays(uniqueArray);
    }
    fetchData();
  }, [five])

  useEffect(() => {
    const fetchData = async () => {
      const responseCong = await dataCong();
      const responseCongBySanBay = responseCong.data.data.filter((item) => item.sanBay.idSanBay == sanBayBatDau);
      setdatacong(responseCongBySanBay);
    }
    fetchData();
  }, [sanBayBatDau, five])

  // SET DATA CỦA CỔNG VỪA CHỌN
  useEffect(() => {
    const getdatacong = datacong.find((item) => item.idCong == selectCong)
    setCong(getdatacong);
  }, [selectCong])


  // TÌM MÁY BAY THEO SELECTMAYBAY
  useEffect(() => {
    const temp = mayBays?.find((item) => Number(item?.idMayBay) == Number(selectMayBay))
    setMayBay(temp);
    setSoGhe((temp?.soHangGheThuong * temp?.soCotGheThuong.toString().length) + (temp?.soHangGheVip * temp?.soCotGheVip.toString().length));
  }, [selectMayBay]);


  const formatDateTime = (inputDateTime) => {
    // Định dạng lại kết quả về dạng yyyy-MM-dd hh:mm:ss
    const year = inputDateTime.getFullYear();
    const month = String(inputDateTime.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
    const day = String(inputDateTime.getDate()).padStart(2, '0');
    const formattedHours = String(inputDateTime.getHours()).padStart(2, '0');
    const formattedMinutes = String(inputDateTime.getMinutes()).padStart(2, '0');
    const formattedSeconds = String(inputDateTime.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day}T${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  };

  //set thoi ket thuc du tinh  theo thời gian bắt đầu dự tính và thời gian chuyến bay
  useEffect(() => {
    if (delay < 0) {
      setErrorDelay("delay không được bé hơn 0")
      return;
    }
    else {
      setErrorDelay("");
    }
    if (tuyenBay == undefined || thoiGianBatDauDuTinh == "")
      return;
    const currentTime = new Date();
    // Tính tổng số giây từ thời gian chuyến bay
    const totalSeconds = tuyenBay.thoiGianChuyenBay * 60;
    //tông thời gian delay
    const delayInMilliseconds = delay * 60 * 1000; // Chuyển đổi phút thành mili giây
    // Chuyển đổi thoiGianBatDauDuTinh thành đối tượng Date
    const startDateTime = new Date(thoiGianBatDauDuTinh);
    const startDateTimeForDelay = new Date(startDateTime.getTime() + delayInMilliseconds);
    setthoiGianBatDauThucTe(formatDateTime(startDateTimeForDelay))
    // Tính thời gian kết thúc
    const endDateTime = new Date(startDateTime.getTime() + totalSeconds * 1000);
    const endDateTimeForDelay = new Date(endDateTime.getTime() + delayInMilliseconds);
    setThoiGianKetThucDuTinh(formatDateTime(endDateTime));
    setThoiGianKetThucThucTe(formatDateTime(endDateTimeForDelay));
    if (startDateTime.getTime() != startDateTimeForDelay.getTime() && startDateTimeForDelay.getTime() > currentTime.getTime()) {
      setTrangThai("DELAYED");
    }
    if (startDateTime.getTime() == startDateTimeForDelay.getTime() && startDateTimeForDelay.getTime() > currentTime.getTime()) {
      setTrangThai("SCHEDULED");
    }
  }, [thoiGianBatDauDuTinh, tuyenBay, delay])

  // xac dinh icao cho chuyen bay,iata cho chuyến bay
  useEffect(() => {
    if (tuyenBay == undefined || mayBay == undefined || dataSanBayBatDau == undefined || dataSanBayKetThuc == undefined)
      return;
    setIcaoChuyenBay(mayBay.soHieu + " " + dataSanBayBatDau.icaoSanBay + "-" + dataSanBayKetThuc.icaoSanBay)
    setIataChuyenBay(mayBay.soHieu);
  }, [tuyenBay, mayBay])


  // set ngay bay khi chọn thoi gian bat dau du tinh
  useEffect(() => {
    if (thoiGianBatDauThucTe == "")
      return;
    const getDate = thoiGianBatDauThucTe?.split("T")[0];
    setNgayBay(getDate);
  }, [thoiGianBatDauThucTe])

  const cancle = () => {
    setTypeDisplay("block");
    setThongBao({ message: message.cancle, typeMessage: "outpage" });
  }

  const [nhanviens, setNhanViens] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await dataNhanVien();
      const data = response.data.data;
      const filterActive = data.filter((item) => item.trangThaiActive == "ACTIVE")
      setNhanViens(filterActive);
    }
    fetchData();
  }, [])

  const [coTruongs, setCoTruong] = useState([]);
  const [indexCoTruong, setIndexCoTruong] = useState("0");
  const [selectedCoTruong, setSelectedCoTruong] = useState();
  const [selectedCoTruongCu, setSelectedCoTruongCu] = useState({ idNhanVien: 0 });
  // load data co truong
  useEffect(() => {
    const coTruongChuyenBay = idChuyenBay ? nhanviens?.find((item) => item?.chucVu?.ten == "Cơ trưởng" && item?.chuyenBay?.idChuyenBay == idChuyenBay) : null;
    const coTruongNull = nhanviens?.filter((item) => item?.chucVu?.ten == "Cơ trưởng" && item?.chuyenBay == null);
    setCoTruong(coTruongChuyenBay ? [coTruongChuyenBay, ...coTruongNull] : coTruongNull);
    setSelectedCoTruongCu(coTruongChuyenBay ? coTruongChuyenBay : { idNhanVien: 0 });
  }, [nhanviens]);


  useEffect(() => {
    const index = idChuyenBay ? coTruongs?.find((item) => item?.chuyenBay?.idChuyenBay == idChuyenBay && item?.chucVu?.ten == "Cơ trưởng")?.idNhanVien : "0";
    setIndexCoTruong(index);
  }, [coTruongs])

  useEffect(() => {
    setSelectedCoTruong(coTruongs?.find((item) => item?.idNhanVien == indexCoTruong));
  }, [indexCoTruong])

  const handleIndexCoTruong = (e) => {
    setIndexCoTruong(e.target.value);
  }


  const [coPhos, setCoPho] = useState([]);
  const [selectedCoPhoCu, setSelectedCoPhoCu] = useState({ idNhanVien: 0 });
  const [indexCoPho, setIndexCoPho] = useState(0);
  const [selectedCoPho, setSelectedCoPho] = useState();


  useEffect(() => {
    const coPhoChuyenBay = idChuyenBay ? nhanviens?.find((item) => item?.chucVu?.ten == "Cơ phó" && item?.chuyenBay?.idChuyenBay == idChuyenBay) : null;
    const coPhoNull = nhanviens?.filter((item) => item?.chucVu?.ten == "Cơ phó" && item?.chuyenBay == null);
    setCoPho(coPhoChuyenBay ? [coPhoChuyenBay, ...coPhoNull] : coPhoNull);
    setSelectedCoPhoCu(coPhoChuyenBay ? coPhoChuyenBay : { idNhanVien: 0 });
  }, [nhanviens]);

  useEffect(() => {
    const index = idChuyenBay ? coPhos?.find((item) => item?.chuyenBay?.idChuyenBay == idChuyenBay && item?.chucVu?.ten == "Cơ phó")?.idNhanVien : "0";
    setIndexCoPho(index);
  }, [coPhos])

  useEffect(() => {
    setSelectedCoPho(coPhos?.find((item) => item?.idNhanVien == indexCoPho));
  }, [indexCoPho])

  const handleIndexCoPho = (e) => {
    setIndexCoPho(e.target.value);
  }


  const [tiepViens, setTiepVien] = useState([]);
  const [dataTiepVienCu, setDataTiepVienCu] = useState([]);
  const [dataTiepVienMoi, setDataTiepVienMoi] = useState([]);
  const [danhSachTiepVien, setDanhSachTiepVien] = useState([]);
  const [countTiepVien, setCountTiepVien] = useState(danhSachTiepVien?.length);

  useEffect(() => {
    const tiepVienChuyenbay = idChuyenBay ? nhanviens?.filter((item) => item?.chucVu?.ten == "Tiếp viên" && item?.chuyenBay?.idChuyenBay == idChuyenBay) : [];
    const tiepVienNull = nhanviens?.filter((item) => item?.chucVu?.ten == "Tiếp viên" && item?.chuyenBay == null)
    setTiepVien(tiepVienChuyenbay?.length > 0 ? [...tiepVienChuyenbay, ...tiepVienNull] : tiepVienNull);
    setDataTiepVienCu(tiepVienChuyenbay ? tiepVienChuyenbay : [])
  }, [nhanviens]);


  useEffect(() => {
    const tiepVienChuyenbay = idChuyenBay ? nhanviens?.filter((item) => item?.chucVu?.ten == "Tiếp viên" && item?.chuyenBay?.idChuyenBay == idChuyenBay) : [];
    setDanhSachTiepVien(tiepVienChuyenbay?.map(item => item?.idNhanVien));
  }, [nhanviens])

  const handleIndexTiepVien = (index, value) => {
    const updatedDanhSach = [...danhSachTiepVien];
    updatedDanhSach.splice(index, 1, value);
    setDanhSachTiepVien(updatedDanhSach);
  }

  const handleCountTiepVien = () => {
    if (countTiepVien == 15) {
      setErrorNhanVien("Tối đa 15 nhân viên")
      return;
    }
    setCountTiepVien(countTiepVien + 1);

    danhSachTiepVien.push('0')
    setDanhSachTiepVien([...danhSachTiepVien]);
  }


  const handleSubCountTiepVien = (index) => {
    setCountTiepVien(countTiepVien - 1);

    danhSachTiepVien.splice(index, 1);

    setDanhSachTiepVien([...danhSachTiepVien]);
  }

  useEffect(() => {
    console.log("danh sach tiep vien : " + danhSachTiepVien.join('-'));
    setDataTiepVienMoi(danhSachTiepVien?.map((item) => tiepViens?.find((item1) => item == item1?.idNhanVien)));
  }, [danhSachTiepVien])

  const HasError = () => {
    let hasError = false;
    if (mayBay == undefined) {
      setErrorNhanVien("Chọn máy bay để chọn nhân viên")
      setErrorMayBay("Chọn tuyến bay để chọn máy bay  ");
      hasError = true;
    }
    if (!selectedCoTruong) {
      setErrorCoTruong("Vui long chon co truong")
      hasError = true;

    }
    if (!selectedCoPho) {
      setErrorCoPho("Vui long chon co pho");
      hasError = true;
    }


    if (Math.ceil(soGhe / 50) > dataTiepVienMoi.length) {
      setErrorNhanVien("Tiep vien toi thieu la : " + Math.ceil(soGhe / 50))
      hasError = true;
    }

    if (selectTuyenBay == 0) {
      hasError = true;
      setErrorTuyenBay("Chọn tuyến bay");
    }

    if (selectCong == 0 && sanBayBatDau != 0) {
      hasError = true;
      setErrorCong("Chọn cổng")
    }

    if (thoiGianBatDauDuTinh == "") {
      hasError = true;
      setErrorThoiGianBayDauDuTinh("Chọn thời gian bắt đầu dự tính");
    }

    if (trangThai == "0") {
      hasError = true;
      setErrorTrangThai("Vui lòng chọn trạng thái cho chuyến bay");
    }
    if (delay < 0) {
      hasError = true;
      setErrorDelay("Thời gian delay phải >= 0");
    }
    if (hasError) {
      setTypeDisplay("block");
      setThongBao({ message: message.errorField, typeMessage: "inpage" });
    }

    return hasError;
  }

  // CREATE CHUYEN BAY 
  const createChuyenBay = () => {
    noError();
    const hasError = HasError();
    if (hasError) return;

    delete tuyenBay.sanBayBatDau;
    delete tuyenBay.sanBayKetThuc;

    const nvhk = indexCoTruong + "/" + indexCoPho + "/" + danhSachTiepVien.join('-');
    const dataChuyenBay = { delay, iataChuyenBay, icaoChuyenBay, ngayBay, thoiGianBatDauDuTinh, thoiGianBatDauThucTe, thoiGianKetThucDuTinh, thoiGianKetThucThucTe, trangThai, trangThaiActive, soGhe, tuyenBay, cong, mayBay, nvhk };

    addChuyenbay(dataChuyenBay)
      .then((response) => {
        if (response.data.statusCode == 201) {
          const chuyenBayMoi = response.data.data;

          if (selectedCoTruong) {
            selectedCoTruong.chuyenBay = chuyenBayMoi;
            editNhanVien(selectedCoTruong.idNhanVien, selectedCoTruong)
              .then(() => {
              })
              .catch((err) => {
              })
          }

          if (selectedCoPho) {
            selectedCoPho.chuyenBay = chuyenBayMoi;
            editNhanVien(selectedCoPho.idNhanVien, selectedCoPho)
              .then(() => {
              })
              .catch((err) => {
              })
          }

          const newList = dataTiepVienMoi;
          if (newList.length > 0) {
            newList?.map((item) => {
              item.chuyenBay = chuyenBayMoi;
              editNhanVien(item.idNhanVien, item)
                .then(() => {
                })
                .catch((err) => {
                })
            });
          }
          setTypeDisplay("block");
          setThongBao({ message: message.sucessAdd, type: "outpagengay" });
        }
      })
      .catch(error => {
        const errorData = error.response.data.data;
        setTypeDisplay("block");
        setThongBao({ message: error.response.data?.message, typeMessage: "inpage" });
        // console.log(error.response.data.message)
      })
  }

  const suaChuyenBay = () => {

    /// neu trangThaiCu  == "IN_FLIGHT" thi khong the sua chuyen bay
    const currentTime = new Date();
    const endreal = new Date(thoiGianKetThucThucTe);
    console.log(currentTime)
    console.log(endreal)
    if (trangThaiCu == "IN_FLIGHT" && currentTime.getTime() < endreal.getTime()) {
      setTypeDisplay("block");
      setThongBao({ message: "Chuyến bay đang diễn ra .Không thể thay đổi thông tin", typeMessage: "inpage" });
      return;
    }
    if (trangThai == "CANCELED" || trangThai == "COMPLETED") {
      if (selectedCoTruongCu) {
        selectedCoTruongCu.chuyenBay = null;
        editNhanVien(selectedCoTruongCu.idNhanVien, selectedCoTruongCu)
          .then(() => {
          })
          .catch((err) => {
          })
      }
      if (selectedCoPhoCu) {
        selectedCoPhoCu.chuyenBay = null;
        editNhanVien(selectedCoPhoCu.idNhanVien, selectedCoPhoCu)
          .then((response) => {

          })
          .catch((err) => {
          })
      }

      if (dataTiepVienCu.length > 0) {
        dataTiepVienCu?.map((item) => {
          item.chuyenBay = null;
          editNhanVien(item.idNhanVien, item)
            .then(() => {
            })
            .catch((err) => {
            })
        });
      }

      delete tuyenBay.sanBayBatDau;
      delete tuyenBay.sanBayKetThuc;
      const nvhk = indexCoTruong + "/" + indexCoPho + "/" + danhSachTiepVien.join('-')
      const dataChuyenBay = { idChuyenBay, delay, iataChuyenBay, icaoChuyenBay, ngayBay, thoiGianBatDauDuTinh, thoiGianBatDauThucTe, thoiGianKetThucDuTinh, thoiGianKetThucThucTe, trangThai, trangThaiActive, soGhe, tuyenBay, cong, mayBay, nvhk };
      updateChuyenBay(idChuyenBay, dataChuyenBay)
        .then((response) => {
          if (response.data.statusCode == 201 && trangThai == "COMPLETED") {
            const sanBayMoi = sanBay.find((item) => item.idSanBay == dataSanBayKetThuc.idSanBay)
            mayBay.sanBay = sanBayMoi;
            editMayBay(mayBay.idMayBay, mayBay)
              .then(() => {

              })
              .catch((error) => {

              })
          }
          else {
            console.log("chuyen bay chua hoan tat , khong the thay doi san bay");
          }
          setTypeDisplay("block");
          setThongBao({ message: response.data.message, typeMessage: "outpagengay" });
        })
        .catch((error) => {
          setTypeDisplay("block");
          setThongBao({ message: "Không thể sửa chuyến bay ", typeMessage: "inpage" })
          const errorData = error.response.data.data;
        })

      return;
    }

    noError();
    let hasError = HasError();
    if (hasError) return;

    delete tuyenBay.sanBayBatDau;
    delete tuyenBay.sanBayKetThuc;
    const nvhk = indexCoTruong + "/" + indexCoPho + "/" + danhSachTiepVien.join('-')
    const dataChuyenBay = { idChuyenBay, delay, iataChuyenBay, icaoChuyenBay, ngayBay, thoiGianBatDauDuTinh, thoiGianBatDauThucTe, thoiGianKetThucDuTinh, thoiGianKetThucThucTe, trangThai, trangThaiActive, soGhe, tuyenBay, cong, mayBay, nvhk };
    updateChuyenBay(idChuyenBay, dataChuyenBay)
      .then((response) => {
        if (response.data.statusCode == 201 && trangThai == "COMPLETED") {
          const sanBayMoi = sanBay.find((item) => item.idSanBay == dataSanBayKetThuc.idSanBay)
          mayBay.sanBay = sanBayMoi;
          editMayBay(mayBay.idMayBay, mayBay)
            .then(() => {

            })
            .catch((error) => {

            })
        }
        else {
          console.log("chuyen bay chua hoan tat , khong the thay doi");
        }
        setTypeDisplay("block");
        setThongBao({ message: response.data.message, typeMessage: "outpagengay" });
      })
      .catch((error) => {
        const errorData = error.response.data.data;
        setTypeDisplay("block");
        setThongBao({ message: error.response.data.message, typeMessage: "inpage" });
      })

    if (selectedCoTruongCu && selectedCoTruong && selectedCoTruong.idNhanVien != selectedCoTruongCu.idNhanVien) {
      selectedCoTruong.chuyenBay = dataSelectChuyenBay;
      editNhanVien(selectedCoTruong.idNhanVien, selectedCoTruong)
        .then(() => {
        })
      selectedCoTruongCu.chuyenBay = null;
      editNhanVien(selectedCoTruongCu.idNhanVien, selectedCoTruongCu)
        .then(() => {
        })
    }
    if (selectedCoPhoCu && selectedCoPho && selectedCoPho.idNhanVien != selectedCoPhoCu.idNhanVien) {
      selectedCoPho.chuyenBay = dataSelectChuyenBay;
      editNhanVien(selectedCoPho.idNhanVien, selectedCoPho)
        .then(() => {
        })
      selectedCoPhoCu.chuyenBay = null;
      editNhanVien(selectedCoPhoCu.idNhanVien, selectedCoPhoCu)
        .then(() => {
        })
    }

    const oldList = dataTiepVienCu;
    const newList = dataTiepVienMoi;
    // Phần giống nhau
    const same = oldList.filter(oldItem =>
      newList.some(newItem =>
        newItem.idNhanVien === oldItem.idNhanVien && JSON.stringify(newItem) === JSON.stringify(oldItem)
      )
    );

    // Danh sách 1 khác danh sách 2 (chỉ có trong oldList)
    const onlyInOldList = oldList.filter(oldItem =>
      !newList.some(newItem => newItem.idNhanVien === oldItem.idNhanVien)
    );

    // Danh sách 2 khác danh sách 1 (chỉ có trong newList)
    const onlyInNewList = newList.filter(newItem =>
      !oldList.some(oldItem => oldItem.idNhanVien === newItem?.idNhanVien)
    );

    if (onlyInOldList.length > 0) {
      onlyInOldList?.map((item) => {
        item.chuyenBay = null;
        editNhanVien(item.idNhanVien, item)
          .then(() => {
          })
      });
    }

    if (onlyInNewList.length > 0) {
      onlyInNewList?.map((item) => {
        item.chuyenBay = dataSelectChuyenBay;
        editNhanVien(item.idNhanVien, item)
          .then(() => {
            console.log("thanh cong");
          })
      });
    }

  }

  const [errorCoTruong, setErrorCoTruong] = useState("");
  const [errorCoPho, setErrorCoPho] = useState("");
  const [errorNhanVien, setErrorNhanVien] = useState("");
  const [errorMayBay, setErrorMayBay] = useState("");
  const [errorSanBayBatDau, setErrorSanBayBatDau] = useState("");
  const [errorSanBayKeThuc, setErrorSanBayKetThuc] = useState("");
  const [errorCong, setErrorCong] = useState("");
  const [errorThoiGianBayDauDuTinh, setErrorThoiGianBayDauDuTinh] = useState("");
  const [errorTrangThai, setErrorTrangThai] = useState("");
  const [errorTuyenBay, setErrorTuyenBay] = useState("");

  const noError = () => {
    setErrorCoPho("");
    setErrorCoTruong("");
    setErrorCong("");
    setErrorDelay("");
    setErrorMayBay("");
    setErrorNhanVien("");
    setErrorSanBayBatDau("");
    setErrorSanBayKetThuc("");
    setErrorThoiGianBayDauDuTinh("");
    setErrorTrangThai("");
    setErrorTuyenBay("")
  }

  /// bat tat layout thong bao va gui thong bao 
  const [typeDisplay, setTypeDisplay] = useState('none'); /// on layout == 'block //off layout  =='none'
  const [thongBao, setThongBao] = useState({
    message: "",
    typeMessage: "" // "error" ,"answer" ,  "question"
  });
  const message = {
    cancle: "Bạn có quay trở lại trang chính và ngưng việc " + (idChuyenBay ? "sửa chuyến bay" : "thêm chuyến bay"),
    sucessAdd: "Thêm thành công",
    errorField: "Có thông tin không hợp lệ.Hãy kiểm tra lại!",
    sucessEdit: "Sửa thành công"
  }

  return (
    <>
      <div className="container-all">
        <div className="container-chuyenbay">
          <div className="container-tuyenbay container-infor">
            <h3>Tuyến bay</h3>
            <div className='container__input'>
              <div className="form-input2">
                <label htmlFor="">Tuyến bay</label>
                <select name="" id="" onChange={handleSelectTuyenBay} value={selectTuyenBay}>
                  {selectTuyenBay == 0 && <option value="0">Chọn tuyến bay</option>}
                  {
                    tuyenBays.map((item) => (
                      <option value={item.idTuyenBay}>{item.sanBayBatDau?.tenSanBay}{"->"}{item.sanBayKetThuc?.tenSanBay}</option>
                    ))
                  }
                </select>
              </div>
              <span>{errorTuyenBay}</span>
            </div>
            <div className="container-sanbay">
              <div className="container-inforsanbay">
                <div className='container__input'>
                  <div className="form-input">
                    <label> San bay bat dau </label>
                    <input type="text" value={dataSanBayBatDau.tenSanBay} disabled={true} />
                  </div>
                  <span>{errorSanBayBatDau}</span>
                </div>
                <div className='container__input'>
                  <div className="form-input">
                    <label htmlFor="">iata san bay :</label>
                    <input type="text" name="" id="" disabled={true} value={dataSanBayBatDau.iataSanBay} />
                  </div>
                </div>
                <div className='container__input'>
                  <div className="form-input">
                    <label htmlFor="">icao san bay :</label>
                    <input type="text" name="" id="" disabled={true} value={dataSanBayBatDau.icaoSanBay} />
                  </div>
                </div>
                <div className='container__input'>
                  <div className="form-input">
                    <label htmlFor="">Địa chỉ :</label>
                    <input type="text" name="" id="" disabled={true} value={dataSanBayBatDau.diaChi} />
                  </div>
                </div>
                <div className='container__input'>
                  <div className="form-input">
                    <label htmlFor="">Quốc gia :</label>
                    <input type="text" name="" id="" disabled={true} value={dataSanBayBatDau.quocGia} />
                  </div>
                </div>
                <div className='container__input'>
                  <div className="form-input">
                    <label>Chọn cổng </label>
                    <select name="" id="" onChange={handleSelectCong} value={selectCong}>
                      {datacong.length != 0 && (<option value="0">Chon Cong</option>)}
                      {datacong.length == 0 && (<option value="0">Không có sẵn cổng</option>)}
                      {
                        Array.isArray(datacong) && datacong?.map((item) => (
                          <option value={item.idCong}>{item.tenCong}</option>
                        ))
                      }
                    </select>
                  </div>
                  <span>{errorCong}</span>
                </div>
              </div>
              <div className="container-inforsanbay">
                <div className='container__input'>
                  <div className="form-input">
                    <label> San Bay Ket Thuc </label>
                    <input type="text" value={dataSanBayKetThuc.tenSanBay} disabled={true} />
                  </div>
                  <span>{errorSanBayKeThuc}</span>
                </div>
                <div className='container__input'>
                  <div className="form-input">
                    <label htmlFor="">iata san bay :</label>
                    <input type="text" name="" id="" disabled={true} value={dataSanBayKetThuc.iataSanBay} />
                  </div>
                </div>
                <div className='container__input'>
                  <div className="form-input">
                    <label htmlFor="">icao san bay :</label>
                    <input type="text" name="" id="" disabled={true} value={dataSanBayKetThuc.icaoSanBay} />
                  </div>
                </div>
                <div className='container__input'>
                  <div className="form-input">
                    <label htmlFor="">Địa chỉ :</label>
                    <input type="text" name="" id="" disabled={true} value={dataSanBayKetThuc.diaChi} />
                  </div>
                </div>
                <div className='container__input'>
                  <div className="form-input">
                    <label htmlFor="">Quốc gia :</label>
                    <input type="text" name="" id="" disabled={true} value={dataSanBayKetThuc.quocGia} />
                  </div>
                </div>
              </div>
            </div>
            <div className='container__input'>
              <div className="form-input">
                <label htmlFor="">Khoảng cách :</label>
                <input type="number" name="" id="" disabled={true} value={tuyenBay == null ? 0 : tuyenBay.khoangCach} />
              </div>
            </div>
            <div className='container__input'>
              <div className="form-input">
                <label htmlFor="">TGCB{"(Phút)*"} :</label>
                <input type="text" name="" id="" disabled={true} value={tuyenBay == null ? 0 : tuyenBay.thoiGianChuyenBay} />
              </div>
            </div>
          </div>
          <div className="container-maybay-inforchuyenbay">
            <div className="container-maybay container-infor">
              <h3>Máy bay</h3>
              <div className='container__input'>
                <div className="form-input">
                  <label>Chọn  máy bay</label>
                  <select name="" id="" value={selectMayBay} onChange={handleMayBay}>
                    {
                      mayBays.length != 0 && (<option value="0">{"Chọn máy bay"}</option>)
                    }
                    {
                      mayBays.length == 0 && (<option value="0">{"Máy bay không có sẵn"}</option>)
                    }
                    {
                      mayBays?.map((item) => (
                        item != undefined && <option value={item?.idMayBay}>{item?.tenMayBay}</option>
                      ))
                    }
                  </select>
                </div>
                <span>{errorMayBay}</span>
              </div>
              <div className='container__input'>
                <div className="form-input">
                  <label htmlFor="">Tên hãng bay :</label>
                  <input type="text" name="" id="" disabled={true} value={mayBay == null ? "" : mayBay.hangBay.tenHangBay} />
                </div>
              </div>
              <div className='container__input'>
                <div className="form-input">
                  <label htmlFor="">icao may bay :</label>
                  <input type="text" name="" id="" disabled={true} value={mayBay == null ? "" : mayBay.icaoMayBay} />
                </div>
              </div>
              <div className='container__input'>
                <div className="form-input">
                  <label htmlFor="">Nam san xuat :</label>
                  <input type="number" name="" id="" disabled={true} value={mayBay == null ? "" : mayBay.namSanXuat} />
                </div>
              </div>
              <div className='container__input'>
                <div className="form-input">
                  <label htmlFor="">So Hieu :</label>
                  <input type="text" name="" id="" disabled={true} value={mayBay == null ? "" : mayBay.soHieu} />
                </div>
              </div>
              <div className='container__input'>
                <div className="form-input">
                  <label htmlFor="">So Luong ghe :</label>
                  <input type="number" name="" id="" disabled={true} value={soGhe} />
                </div>
              </div>
            </div>
            <div className="container-inforchuyenbay container-infor">
              <h3>Thông tin chuyến bay</h3>
              <div className='container__input'>
                <div className="form-input">
                  <label htmlFor="">Iata chuyến bay:</label>
                  <input type="text" name="" id="" onChange={handleIataChuyenBay} value={iataChuyenBay} disabled={true} />
                </div>
              </div>
              <div className='container__input'>
                <div className="form-input">
                  <label htmlFor="">Icao chuyến bay:</label>
                  <input type="text" name="" id="" onChange={handleIcaoChuyenBay} value={icaoChuyenBay} disabled={true} />
                </div>
              </div>
              <div className='container__input'>
                <div className="form-input">
                  <label htmlFor="">Ngày bay :</label>
                  <input type="date" name="" id="" onChange={handleNgayBay} value={ngayBay} disabled={true} />
                </div>
              </div>
              <div className='container__input'>
                <div className="form-input">
                  <label htmlFor="">TGBDDT{"*"} :</label>
                  <input type='datetime-local' name="" id="startDatetime" onChange={handleThoiGianBatDauDuTinh} value={thoiGianBatDauDuTinh} />
                </div>
                <span>{errorThoiGianBayDauDuTinh}</span>
              </div>
              <div className='container__input'>
                <div className="form-input">
                  <label htmlFor="">TGBDTT{"*"} :</label>
                  <input type='datetime-local' name="" id="startDatetimeReal" value={thoiGianBatDauThucTe} disabled />
                </div>
                <span></span>
              </div>
              <div className='container__input'>
                <div className="form-input">
                  <label htmlFor="">TGKTDT{"*"} :</label>
                  <input type="datetime-local" name="" id="endDatetime" onChange={handleThoiGianKetThucDuTinh} value={thoiGianKetThucDuTinh} disabled={true} />
                </div>
              </div>
              <div className='container__input'>
                <div className="custom-form-input">
                  <label htmlFor="">delay{"(Phút)"}:</label>
                  <input type="number" name="" id="" onChange={handleDelay} value={delay} min={0} disabled={true} />
                  <div style={{ fontSize: "24px" }}>+</div>
                  <input type="number" value={newDelay} onChange={AddTimeDelay} onKeyDown={handleKeyDown} disabled={idChuyenBay ? false : true} />
                </div>
                <span>{errorDelay}</span>
              </div>
              <div className='container__input'>
                <div className="form-input">
                  <label htmlFor="">TTCB{"*"}</label>
                  <select name="" id="" onChange={handleTrangThai} value={trangThai} disabled={trangThaiCu == "CANCELED" || trangThaiCu == "COMPLETED" || action == "add" ? true : false}> STATUS
                    <option value="0">chọn trạng thái chuyến bay</option>
                    <option value="CANCELED">CANCELED</option>
                    <option value="COMPLETED">COMPLETED</option>
                    <option value="DELAYED">DELAYED</option>
                    <option value="SCHEDULED">SCHEDULED</option>
                    <option value="IN_FLIGHT">IN_FLIGHT</option>
                  </select>
                </div>
                <span>{errorTrangThai}</span>
              </div>
              <div className='container__input'>
                <div className="form-input">
                  <label htmlFor="">Trạng thái xử lí</label>
                  <select name="" id="" onChange={handleTrangThaiActive} value={trangThaiActive} disabled={idChuyenBay ? false : true}> STATUS
                    <option value="">chọn trạng thái xử lí</option>
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="IN_ACTIVE">IN_ACTIVE</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="container-infor container-nhanvienchuyenbay">
            <h3>Nhân viên</h3>
            <div className=" container-selectnhanvien ">
              <div className='container-phicong container-infor'>
                <div className="container__input">
                  <div className="form-input">
                    <label htmlFor="">Chọn cơ trưởng :</label>
                    <select name="" id="" value={indexCoTruong} onChange={handleIndexCoTruong}>
                      {coTruongs.length != 0 && (<option value="0">Chọn cơ trưởng</option>)}
                      {coTruongs.length == 0 && (<option value="0">Cơ trưởng không có sẵn</option>)}
                      {
                        coTruongs?.map((item) => (
                          <option value={item?.idNhanVien}>{item?.hoTen}</option>
                        ))
                      }
                    </select>
                  </div>
                  <span>{errorCoTruong}</span>
                </div>
                <div className='container__input'>
                  <div className='form-input'>
                    <label htmlFor="">Chọn cơ phó :</label>
                    <select name="" id="" value={indexCoPho} onChange={handleIndexCoPho}>
                      {coPhos.length != 0 && (<option value="0">Chọn cơ phó</option>)}
                      {coPhos.length == 0 && (<option value="0">Cơ phó không có sẵn</option>)}
                      {
                        coPhos?.map((item) => (
                          <option value={item?.idNhanVien}>{item?.hoTen}</option>
                        ))
                      }
                    </select>
                  </div>
                  <span>{errorCoPho}</span>
                </div>
              </div>
              <div className='container-infor container-tiepvien'>
                <div className="container-listtiepvien">
                  {
                    [...Array(danhSachTiepVien?.length)].map((_, index) => (
                      <div className="select-tiepvien form-input">
                        <label htmlFor="" key={index + 1}>Tiếp viên {index + 1}</label>
                        <select name="" id="" value={danhSachTiepVien?.length > 0 ? danhSachTiepVien[index] : '0'} onChange={(event) => handleIndexTiepVien(index, event.target.value)}>
                          {tiepViens.filter((item) => !danhSachTiepVien?.find((item1) => item1 == item.idNhanVien)).length == 0 && (<option value="0">Tiếp viên không có sẵn</option>)}
                          {tiepViens.filter((item) => !danhSachTiepVien?.find((item1) => item1 == item.idNhanVien)).length != 0 && (<option value="0">Chọn tiếp viên</option>)}
                          {
                            tiepViens?.find((item) => item.idNhanVien == danhSachTiepVien[index]) && (
                              <option value={danhSachTiepVien[index]}>{tiepViens?.find((item) => item.idNhanVien == danhSachTiepVien[index])?.hoTen}</option>
                            )
                          }
                          {
                            tiepViens?.filter((item) => !danhSachTiepVien?.find((item1) => item1 == item?.idNhanVien))
                              .map((item2) => (
                                <option value={item2?.idNhanVien}>{item2?.hoTen}</option>
                              ))
                          }
                        </select>
                        <button onClick={() => handleSubCountTiepVien(index)} style={{ marginLeft: '10px', cursor: 'pointer' }}>X</button>
                      </div>
                    ))
                  }
                </div>
                <div className='custom-button-span'>
                  <button onClick={handleCountTiepVien} className='btn'>Thêm tiếp viên{`(Tối thiểu ${Math.ceil(soGhe / 50) ? Math.ceil(soGhe / 50) : ""}  nhân viên)`}</button>
                  <span>{errorNhanVien}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container-btn">
          <button className="btn" onClick={idChuyenBay ? suaChuyenBay : createChuyenBay}>{idChuyenBay ? "Sửa chuyến bay" : "Thêm chuyến bay"}</button>
          <button className="btnHuy" onClick={cancle}>huy bo</button>
        </div>
        <div className="container-ghichu">
          {"*{TGBDDT : Thời gian bắt đầu dự tính ; TGBDTT : Thời gian bắt đầu thực tế ; THKTDT : Thời gian kết thúc dự tính , TTCB : Trạng thái chuyến bay , TGCB : Thời gian chuyến bay}"}
        </div>
      </div>
      <div style={{ display: typeDisplay }}>
        <LayOutThongBao thongBao={thongBao} setTypeDisplay={setTypeDisplay} />
      </div>
    </>
  )
}