import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { addChuyenbay, getChuyenBayById, updateChuyenBay } from '../../services/chuyenBayServices';
import { dataCongBySanBay, getCongById } from '../../services/congServices';
import { dataMayBay, updateMayBay } from '../../services/mayBayServices';
import { dataNhanVien, editNhanVien } from '../../services/nhanVienServices';
import { dataSanBay, dataSanBayById } from '../../services/sanBayService';
import useEffectDataTuyenBay from '../../utils/useEffectDataTuyenBay';
import './chuyenbay.css';

export const AddChuyenBay = (props) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const idChuyenBay = queryParams.get('id');
  const [dataSelectChuyenBay, setDataSelectChuyenBay] = useState([]);

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
  const [trangThaiActive, setTrangThaiActive] = useState("0");
  const [soGhe, setSoGhe] = useState(0);

  useEffect(() => {
    const setMinDatetime = () => {
      const currentDatetime = new Date().toISOString().slice(0, 16);
      document.getElementById('startDatetime').min = currentDatetime;
      document.getElementById('endDatetime').min = currentDatetime;
    };
    setMinDatetime();
    const interval = setInterval(setMinDatetime, 600000);
    return () => clearInterval(interval);
  }, []);

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

  const [increaseDelay, setIncreaseDelay] = useState(0);
  const handleIncreaseDelay = (e) => {
    setIncreaseDelay(e.target.value);
  }

  const handleTrangThai = (e) => {
    setTrangThai(e.target.value);
  }

  const handleTrangThaiActive = (e) => {
    setTrangThaiActive(e.target.value);
  }

  const [sanBay, setDataSanBay] = useState([]);
  const [sanBayBatDau, setSanBayBatDau] = useState("0");
  const [sanBayKetThuc, setSanBayKetThuc] = useState("0");
  let [dataSanBayBatDau, setDataSanBayBatDau] = useState({
    idSanBay: 0,
    iataSanBay: "",
    icaoSanBay: "",
    diaChi: "",
    thanhPho: "",
    quocGia: ""
  });
  let [dataSanBayKetThuc, setDataSanBayKetThuc] = useState({
    idSanBay: 0,
    iataSanBay: "",
    icaoSanBay: "",
    diaChi: "",
    thanhPho: "",
    quocGia: ""
  });


  useEffect(() => {
    dataSanBayById(sanBayBatDau)
      .then((response) => {
        const data = response.data.data;
        let result = {
          idSanBay: data?.idSanBay,
          iataSanBay: data?.iataSanBay,
          icaoSanBay: data?.icaoSanBay,
          diaChi: data?.diaChi,
          thanhPho: data?.thanhPho.tenThanhPho,
          quocGia: data?.thanhPho?.quocGia?.tenQuocGia
        }
        setDataSanBayBatDau(result);
      })
  }, [sanBayBatDau])


  const [datacong, setdatacong] = useState([]);
  const [selectCong, setSelectCong] = useState(0);
  const [cong, setCong] = useState();

  const handleSelectCong = (e) => {
    setSelectCong(e.target.value);
  }

  // LOAD DATA CỔNG THEO SAN BAY BẮT ĐẦU
  useEffect(() => {
    dataCongBySanBay(sanBayBatDau)
      .then((response) => {
        setdatacong(response.data.data);
      })
  }, [sanBayBatDau])

  // SET DATA CỦA CỔNG VỪA CHỌN
  useEffect(() => {
    getCongById(selectCong)
      .then((response) => {
        setCong(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      })
  }, [selectCong])

  let dataTuyenBay = useEffectDataTuyenBay();
  const [tuyenBay, setTuyenBay] = useState();

  const [mayBays, setMayBays] = useState([]);
  const [selectMayBay, setSelectMayBay] = useState("0");
  const [mayBay, setMayBay] = useState();
  const [mayBayCu, setMayBayCu] = useState();

  // get may bay theo san bay bat dau
  useEffect(() => {
    dataMayBay()
      .then((response) => {
        const data = response.data.data;
        const dataBySanBayBatDau = data?.filter((item) => item?.sanBay?.idSanBay == sanBayBatDau)
        const mayBayChuaChon = dataBySanBayBatDau?.filter((item) => item?.chuyenBay == null);
        const mayBayByIdChuyenBay = dataBySanBayBatDau?.find((item) => item?.chuyenBay?.idChuyenBay == idChuyenBay);

        setMayBays(idChuyenBay ? [mayBayByIdChuyenBay, ...mayBayChuaChon] : mayBayChuaChon);
        setMayBay(idChuyenBay ? mayBayByIdChuyenBay : null);
        setMayBayCu(idChuyenBay ? mayBayByIdChuyenBay : null);
        setSelectMayBay(idChuyenBay ? mayBayByIdChuyenBay?.idMayBay : "0");
        console.log("danh sach may bay : ");
        console.log(idChuyenBay ? [mayBayByIdChuyenBay, ...mayBayChuaChon] : mayBayChuaChon);
        console.log("may bay duoc chon : ");
        console.log(idChuyenBay ? mayBayByIdChuyenBay : null);
        console.log("id may bay : ");
        console.log(idChuyenBay ? mayBayByIdChuyenBay?.idMayBay : "0");
      })
  }, [sanBayBatDau])

  // TÌM MÁY BAY THEO SELECTMAYBAY
  useEffect(() => {
    const temp = mayBays?.find((item) => item?.idMayBay == selectMayBay)
    setMayBay(temp);
    setSoGhe(temp?.soLuongGhe);
  }, [selectMayBay, mayBays])

  // set tuyên bay
  useEffect(() => {
    // Kiểm tra nếu cả hai sân bay và dữ liệu tuyến bay đã có
    if (dataTuyenBay.length > 0) {
      // Tìm tuyến bay dựa trên sanBayBatDau và sanBayKetThuc
      const tuyenBay = dataTuyenBay.find(
        (item) =>
          item.sanBayBatDau.idSanBay == sanBayBatDau &&
          item.sanBayKetThuc.idSanBay == sanBayKetThuc
      );
      setTuyenBay(tuyenBay);
      let temp = tuyenBay?.sanBayBatDau;
      let result = {
        idSanBay: temp?.idSanBay,
        iataSanBay: temp?.iataSanBay,
        icaoSanBay: temp?.icaoSanBay,
        diaChi: temp?.diaChi,
        thanhPho: temp?.thanhPho.tenThanhPho,
        quocGia: temp?.thanhPho?.quocGia?.tenQuocGia
      }
      setDataSanBayBatDau(result);
      temp = tuyenBay?.sanBayKetThuc;
      result = {
        idSanBay: temp?.idSanBay,
        iataSanBay: temp?.iataSanBay,
        icaoSanBay: temp?.icaoSanBay,
        diaChi: temp?.diaChi,
        thanhPho: temp?.thanhPho?.tenThanhPho,
        quocGia: temp?.thanhPho?.quocGia?.tenQuocGia
      }
      setDataSanBayKetThuc(result);
    }
  }, [sanBayBatDau, sanBayKetThuc]);

  //load data san bay
  useEffect(() => {
    dataSanBay()
      .then((response) => {
        setDataSanBay(response.data.data);
      })
  }, [])

  const handleSanBayBatDau = (e) => {
    setSanBayBatDau(e.target.value);
    setSelectMayBay("0");
  }

  const handleSanBayKetThuc = (e) => {
    setSanBayKetThuc(e.target.value);
  }

  const handleMayBay = (e) => {
    setSelectMayBay(e.target.value);
  }

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
  }, [thoiGianBatDauDuTinh, tuyenBay, delay])

  // xac dinh icao cho chuyen bay,iata cho chuyến bay
  useEffect(() => {
    if (tuyenBay == undefined || mayBay == undefined || dataSanBayBatDau == undefined || dataSanBayKetThuc == undefined)
      return;
    setIcaoChuyenBay(mayBay.soHieu + " " + dataSanBayBatDau.icaoSanBay + "-" + dataSanBayKetThuc.icaoSanBay)
    setIataChuyenBay(mayBay.soHieu);
  }, [tuyenBay, mayBay])
  const navigator = useNavigate();


  useEffect(() => {
    getChuyenBayById(idChuyenBay)
      .then((response) => {
        setDataSelectChuyenBay(response.data.data);
        const data = response.data.data;
        setDelay(data.delay);
        setSanBayBatDau(data.tuyenBay.sanBayBatDau.idSanBay);
        let temp = data.tuyenBay.sanBayBatDau;
        let result = {
          idSanBay: temp.idSanBay,
          iataSanBay: temp.iataSanBay,
          icaoSanBay: temp.icaoSanBay,
          diaChi: temp.diaChi,
          thanhPho: temp.thanhPho.tenThanhPho,
          quocGia: temp.thanhPho.quocGia.tenQuocGia
        }
        setDataSanBayBatDau(result);
        setSanBayKetThuc(data.tuyenBay.sanBayKetThuc.idSanBay);
        temp = data.tuyenBay.sanBayKetThuc;
        result = {
          idSanBay: temp.idSanBay,
          iataSanBay: temp.iataSanBay,
          icaoSanBay: temp.icaoSanBay,
          diaChi: temp.diaChi,
          thanhPho: temp.thanhPho.tenThanhPho,
          quocGia: temp.thanhPho.quocGia.tenQuocGia
        }
        setDataSanBayKetThuc(result);
        setSelectCong(data.cong.idCong);
        setTuyenBay(data.tuyenBay);
        setIataChuyenBay(data.iataChuyenBay);
        setIcaoChuyenBay(data.icaoChuyenBay);
        setNgayBay(data.ngayBay.toString().split("T")[0]);
        setthoiGianBatDauDuTinh(data.thoiGianBatDauDuTinh);
        setthoiGianBatDauThucTe(data.thoiGianBatDauThucTe)
        setThoiGianKetThucDuTinh(data.thoiGianKetThucDuTinh);
        setThoiGianKetThucThucTe(data.thoiGianKetThucThucTe);
        setTrangThaiCu(data.trangThai);
        setTrangThai(data.trangThai);
        setTrangThaiActive(data.trangThaiActive);
      })
  }, [])

  // set ngay bay khi chọn thoi gian bat dau du tinh
  useEffect(() => {
    if (thoiGianBatDauThucTe == "")
      return;
    const getDate = thoiGianBatDauThucTe.split("T")[0];
    setNgayBay(getDate);
  }, [thoiGianBatDauThucTe])

  const cancle = () => {
    const currentPath = window.location.pathname; // Lấy đường dẫn hiện tại
    const newPath = currentPath.split("?")[0]; // Thêm đoạn mới vào
    navigator(newPath, { replace: true }); // Điều hướng đến đường dẫn mới mà không lưu vào lịch sử
    props.setAction("main");
  }

  const [nhanviens, setNhanViens] = useState([]);
  useEffect(() => {
    dataNhanVien()
      .then((response) => {
        setNhanViens(response.data.data);
      })
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
    console.log("thong tin co truong : ")
    console.log(coTruongs?.find((item) => item?.idNhanVien == indexCoTruong));
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
    console.log("thong tin co pho : ")
    console.log(coPhos?.find((item) => item?.idNhanVien == indexCoPho));
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
    console.log("data tiep vien cu :");
    console.log(tiepVienChuyenbay);
  }, [nhanviens]);


  useEffect(() => {
    const tiepVienChuyenbay = idChuyenBay ? nhanviens?.filter((item) => item?.chucVu?.ten == "Tiếp viên" && item?.chuyenBay?.idChuyenBay == idChuyenBay) : [];
    setDanhSachTiepVien(tiepVienChuyenbay?.map(item => item?.idNhanVien));
  }, [nhanviens])

  const handleIndexTiepVien = (index, value) => {
    const updatedDanhSach = [...danhSachTiepVien];
    updatedDanhSach.splice(index, 1, value);
    setDanhSachTiepVien(updatedDanhSach);
    console.log("chon tiep vien", updatedDanhSach);
  }

  const handleCountTiepVien = () => {
    setCountTiepVien(countTiepVien + 1);

    danhSachTiepVien.push('0')
    setDanhSachTiepVien([...danhSachTiepVien]);
    console.log("them tiep vien")
    console.log([...danhSachTiepVien]);
  }


  const handleSubCountTiepVien = (index) => {
    setCountTiepVien(countTiepVien - 1);

    danhSachTiepVien.splice(index, 1);
    setDanhSachTiepVien([...danhSachTiepVien]);
    console.log("xoa tiep vien")
    console.log([...danhSachTiepVien]);
  }

  useEffect(() => {
    setDataTiepVienMoi(danhSachTiepVien?.map((item) => tiepViens?.find((item1) => item == item1?.idNhanVien)));
  }, [danhSachTiepVien])

  const HasError = () => {
    let hasError = false;
    if (mayBay == undefined) {
      setErrorNhanVien("CHọn máy bay để chọn nhân viên")
      setErrorMayBay("Chọn sân bay bắt đầu để chọn máy bay  ");
      hasError = true;
    }
    if (!selectedCoTruong) {
      setErrorCoTruong("Vui long chon co truong")
      console.log("Vui long chon co truong")
      hasError = true;

    }
    if (!selectedCoPho) {
      setErrorCoPho("Vui long chon co pho");
      console.log("Vui long chon Pho")
      hasError = true;
    }


    if (Math.ceil(mayBay?.soLuongGhe / 50) > dataTiepVienMoi.length) {
      setErrorNhanVien("Tiep vien toi thieu la : " + Math.ceil(mayBay?.soLuongGhe / 50))
      console.log("Tiep vien toi thieu la : " + Math.ceil(mayBay?.soLuongGhe / 50))
      hasError = true;
    }

    if (sanBayBatDau == "0") {
      hasError = true;
      setErrorSanBayBatDau("Chọn sân bay bắt đầu");
      setErrorSanBayKetThuc("Chọn sân bay bắt đầu để chọn sân bay kết thúc");
      setErrorCoPho("Chọn sân bay bắt đầu để chọn cổng");
    }

    if (sanBayBatDau != "0" && sanBayKetThuc == "0") {
      hasError = true;
      setErrorSanBayKetThuc("CHọn sân bay kết thúc");
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



    return hasError;
  }

  // CREATE CHUYEN BAY 
  const createChuyenBay = () => {
    noError();
    console.log("them chuyen bay");
    const hasError = HasError();
    if (hasError) return;

    const dataChuyenBay = { delay, iataChuyenBay, icaoChuyenBay, ngayBay, thoiGianBatDauDuTinh, thoiGianBatDauThucTe, thoiGianKetThucDuTinh, thoiGianKetThucThucTe, trangThai, trangThaiActive, soGhe, tuyenBay, cong };

    addChuyenbay(dataChuyenBay)
      .then((response) => {
        console.log(response.data);
        if (response.data.statusCode == 201) {
          const chuyenBayMoi = response.data.data;

          if (mayBay) {
            mayBay.chuyenBay = chuyenBayMoi;
            updateMayBay(mayBay.idMayBay, mayBay)
              .then(() => {
                console.log("gan chuyen bay vao may bay")
              })
          }

          if (selectedCoTruong) {
            selectedCoTruong.chuyenBay = chuyenBayMoi;
            editNhanVien(selectedCoTruong.idNhanVien, selectedCoTruong)
              .then(() => {
                console.log("gan co truong vao chuyen bay");
              })
          }

          if (selectedCoPho) {
            selectedCoPho.chuyenBay = chuyenBayMoi;
            editNhanVien(selectedCoPho.idNhanVien, selectedCoPho)
              .then(() => {
                console.log("gan co pho vao chuyen bay");
              })
          }

          const newList = dataTiepVienMoi;
          if (newList.length > 0) {
            newList?.map((item) => {
              item.chuyenBay = chuyenBayMoi;
              editNhanVien(item.idNhanVien, item)
                .then(() => {
                  console.log("gan tiep vien bao chuyen bay");
                })
            });
          }
          props.setAction("main");
        }
      })
      .catch(error => {
        console.log(error.response.data);
        const errorData = error.response.data.data;
      })


  }

  const suaChuyenBay = () => {

    /// neu trangThaiCu  == "IN_FLIGHT" thi khong the sua chuyen bay

    if (trangThai == "CANCELED" || trangThai == "COMPLETED") {

      if (mayBayCu) {
        mayBayCu.chuyenBay = null;
        updateMayBay(mayBayCu.idMayBay, mayBayCu)
          .then(() => {
            console.log("go chuyen bay ra khoi")
          })
      }

      if (selectedCoTruongCu) {
        selectedCoTruongCu.chuyenBay = null;
        editNhanVien(selectedCoTruongCu.idNhanVien, selectedCoTruongCu)
          .then(() => {
            console.log("thanh cong");
          })
      }
      if (selectedCoPhoCu) {
        selectedCoPhoCu.chuyenBay = null;
        editNhanVien(selectedCoPhoCu.idNhanVien, selectedCoPhoCu)
          .then(() => {
            console.log("thanh cong");
          })
      }

      if (dataTiepVienCu.length > 0) {
        dataTiepVienCu?.map((item) => {
          item.chuyenBay = null;
          editNhanVien(item.idNhanVien, item)
            .then(() => {
              console.log("thanh cong");
            })
        });
      }

      const dataChuyenBay = { idChuyenBay, delay, iataChuyenBay, icaoChuyenBay, ngayBay, thoiGianBatDauDuTinh, thoiGianBatDauThucTe, thoiGianKetThucDuTinh, thoiGianKetThucThucTe, trangThai, trangThaiActive, soGhe, tuyenBay, cong };
      updateChuyenBay(idChuyenBay, dataChuyenBay)
        .then((response) => {
          console.log(response.data);
          const currentPath = window.location.pathname; // Lấy đường dẫn hiện tại
          const newPath = currentPath.split("?")[0]; // Thêm đoạn mới vào
          navigator(newPath, { replace: true }); // Điều hướng đến đường dẫn mới mà không lưu vào lịch sử
          props.setAction("main");
        })
        .catch((error) => {
          console.log(error.response.data);
          const errorData = error.response.data.data;
        })

      return;
    }

    noError();
    let hasError = HasError();
    if (hasError) return;

    const dataChuyenBay = { idChuyenBay, delay, iataChuyenBay, icaoChuyenBay, ngayBay, thoiGianBatDauDuTinh, thoiGianBatDauThucTe, thoiGianKetThucDuTinh, thoiGianKetThucThucTe, trangThai, trangThaiActive, soGhe, tuyenBay, cong };
    updateChuyenBay(idChuyenBay, dataChuyenBay)
      .then(() => {
        const currentPath = window.location.pathname; // Lấy đường dẫn hiện tại
        const newPath = currentPath.split("?")[0]; // Thêm đoạn mới vào
        navigator(newPath, { replace: true }); // Điều hướng đến đường dẫn mới mà không lưu vào lịch sử
        props.setAction("main");
      })
      .catch((error) => {
        console.log(error.response.data);
        const errorData = error.response.data.data;
      })

    if (selectedCoTruongCu && selectedCoTruong && selectedCoTruong.idNhanVien != selectedCoTruongCu.idNhanVien) {
      selectedCoTruong.chuyenBay = dataSelectChuyenBay;
      editNhanVien(selectedCoTruong.idNhanVien, selectedCoTruong)
        .then(() => {
          console.log("thanh cong");
        })
      selectedCoTruongCu.chuyenBay = null;
      editNhanVien(selectedCoTruongCu.idNhanVien, selectedCoTruongCu)
        .then(() => {
          console.log("thanh cong");
        })
    }
    if (selectedCoPhoCu && selectedCoPho && selectedCoPho.idNhanVien != selectedCoPhoCu.idNhanVien) {
      selectedCoPho.chuyenBay = dataSelectChuyenBay;
      editNhanVien(selectedCoPho.idNhanVien, selectedCoPho)
        .then(() => {

          console.log("thanh cong");
        })
      selectedCoPhoCu.chuyenBay = null;
      editNhanVien(selectedCoPhoCu.idNhanVien, selectedCoPhoCu)
        .then(() => {
          console.log("thanh cong");
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
            console.log("thanh cong");
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

    if (mayBay && mayBayCu && mayBayCu.idMayBay != mayBay.idMayBay) {
      mayBay.chuyenBay = dataSelectChuyenBay;
      updateMayBay(mayBay.idMayBay, mayBay)
        .then((response) => {
          console.log("gan chuyen bay vao may bay")
          console.log(response.data.data);
        })
      mayBayCu.chuyenBay = null;
      updateMayBay(mayBayCu.idMayBay, mayBayCu)
        .then((response) => {
          console.log("go chuyen bay ra khoi")
          console.log(response.data.data);
        })
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
  }

  return (
    <>
      <div className="container-all">
        <div className="container-infor container-nhanvienchuyenbay">
          <h3>Nhân viên</h3>
          <div className=" container-selectnhanvien ">
            <div className='container-phicong container-infor'>
              <div className="container__input">
                <div className="form-input">
                  <label htmlFor="">Chọn cơ trưởng :</label>
                  <select name="" id="" value={indexCoTruong} onChange={handleIndexCoTruong}>
                    <option value="0">Chọn cơ trưởng</option>
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
                    <option value="0">Chọn cơ phó</option>
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
                    <div className="select-tiepvien">
                      <label htmlFor="" key={index + 1}>Tiếp viên {index + 1} :</label>
                      <select name="" id="" value={danhSachTiepVien?.length > 0 ? danhSachTiepVien[index] : '0'} onChange={(event) => handleIndexTiepVien(index, event.target.value)}>
                        <option value="0">Chọn tiếp viên</option>
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
                <button onClick={handleCountTiepVien} className='btn'>Thêm tiếp viên{`(Tối thiểu ${Math.ceil(mayBay?.soLuongGhe / 50) ? Math.ceil(mayBay?.soLuongGhe / 50) : ""}  nhân viên)`}</button>
                <span>{errorNhanVien}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="container-chuyenbay">
          <div className="container-tuyenbay container-infor">
            <h3>Tuyến bay</h3>
            <div className="container-sanbay">
              <div className="container-inforsanbay">
                <div className='container__input'>
                  <div className="form-input">
                    <label> San bay bat dau </label>
                    <select name="" id="" onChange={handleSanBayBatDau} value={sanBayBatDau}>
                      {
                        sanBayBatDau == 0 && <option value="0">Chon San Bay</option>
                      }
                      {
                        sanBay?.filter((item) => item.idSanBay != sanBayKetThuc)
                          .map((item) => (
                            <option value={item.idSanBay}>{item.tenSanBay}</option>
                          ))
                      }
                    </select>
                  </div>
                  <span>{errorSanBayBatDau}</span>
                </div>
                <div>
                  <label htmlFor="">iata san bay :</label>
                  <input type="text" name="" id="" disabled={true} value={dataSanBayBatDau.iataSanBay} />
                </div>
                <div>
                  <label htmlFor="">icao san bay :</label>
                  <input type="text" name="" id="" disabled={true} value={dataSanBayBatDau.icaoSanBay} />
                </div>
                <div>
                  <label htmlFor="">Địa chỉ :</label>
                  <input type="text" name="" id="" disabled={true} value={dataSanBayBatDau.diaChi} />
                </div>
                <div>
                  <label htmlFor="">Quốc gia :</label>
                  <input type="text" name="" id="" disabled={true} value={dataSanBayBatDau.quocGia} />
                </div>
                <div className='container__input'>
                  <div className="form-input">
                    <label>Chọn cổng </label>
                    <select name="" id="" onChange={handleSelectCong} value={selectCong}>
                      {selectCong == "0 " && (<option value="0">Chon Cong</option>)}
                      {
                        Array.isArray(datacong) && datacong?.map((item) => (
                          <option value={item.idCong}>{item.tenCong}</option>
                        ))
                      }
                    </select>
                    <span>{errorCong}</span>
                  </div>
                </div>
              </div>
              <div className="container-inforsanbay">
                <div className='container__input'>
                  <div className="form-input">
                    <label> San Bay Ket Thuc </label>
                    <select name="" id="" onChange={handleSanBayKetThuc} value={sanBayKetThuc} disabled={sanBayBatDau != 0 ? false : true}>
                      {
                        sanBayKetThuc == 0 && <option value="0">Chon San Bay</option>
                      }
                      {
                        sanBay?.filter((item) => item.idSanBay != sanBayBatDau)
                          .map((item) => (
                            <option value={item.idSanBay}>{item.tenSanBay}</option>
                          ))
                      }
                    </select>
                  </div>
                  <span>{errorSanBayKeThuc}</span>
                </div>
                <div>
                  <label htmlFor="">iata san bay :</label>
                  <input type="text" name="" id="" disabled={true} value={dataSanBayKetThuc.iataSanBay} />
                </div>
                <div>
                  <label htmlFor="">icao san bay :</label>
                  <input type="text" name="" id="" disabled={true} value={dataSanBayKetThuc.icaoSanBay} />
                </div>
                <div>
                  <label htmlFor="">Địa chỉ :</label>
                  <input type="text" name="" id="" disabled={true} value={dataSanBayKetThuc.diaChi} />
                </div>
                <div>
                  <label htmlFor="">Quốc gia :</label>
                  <input type="text" name="" id="" disabled={true} value={dataSanBayKetThuc.quocGia} />
                </div>
              </div>
            </div>
            <div>
              <label htmlFor="">Khoảng cách :</label>
              <input type="number" name="" id="" disabled={true} value={tuyenBay == null ? 0 : tuyenBay.khoangCach} />
            </div>
            <div>
              <label htmlFor="">TGCB{"(Phút)*"} :</label>
              <input type="text" name="" id="" disabled={true} value={tuyenBay == null ? 0 : tuyenBay.thoiGianChuyenBay} />
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
                      selectMayBay == "0" && ((mayBays?.length > 0 && (<option value="0">{"Chọn máy bay"}</option>)) || ((mayBays?.length == 0 && (<option value="0">{"Máy bay không có sẵn"}</option>))))
                    }
                    {
                      mayBays?.map((item) => (
                        <option value={item?.idMayBay}>{item?.tenMayBay}</option>
                      ))
                    }
                  </select>
                </div>
                <span>{errorMayBay}</span>
              </div>
              <div>
                <label htmlFor="">Tên hãng bay :</label>
                <input type="text" name="" id="" disabled={true} value={mayBay == null ? "" : mayBay.hangBay.tenHangBay} />
              </div>
              <div>
                <label htmlFor="">icao may bay :</label>
                <input type="text" name="" id="" disabled={true} value={mayBay == null ? "" : mayBay.icaoMayBay} />
              </div>
              <div>
                <label htmlFor="">Nam san xuat :</label>
                <input type="number" name="" id="" disabled={true} value={mayBay == null ? "" : mayBay.namSanXuat} />
              </div>
              <div>
                <label htmlFor="">So Hieu :</label>
                <input type="text" name="" id="" disabled={true} value={mayBay == null ? "" : mayBay.soHieu} />
              </div>
              <div>
                <label htmlFor="">So Luong ghe :</label>
                <input type="number" name="" id="" disabled={true} value={mayBay == null ? "" : mayBay.soLuongGhe} />
              </div>
            </div>
            <div className="container-inforchuyenbay container-infor">
              <h3>Thông tin chuyến bay</h3>
              <div>
                <label htmlFor="">Iata chuyến bay:</label>
                <input type="text" name="" id="" onChange={handleIataChuyenBay} value={iataChuyenBay} disabled={true} />
              </div>
              <div>
                <label htmlFor="">Icao chuyến bay:</label>
                <input type="text" name="" id="" onChange={handleIcaoChuyenBay} value={icaoChuyenBay} disabled={true} />
              </div>
              <div>
                <label htmlFor="">Ngày bay :</label>
                <input type="date" name="" id="" onChange={handleNgayBay} value={ngayBay} disabled={true} />
              </div>
              <div className='container__input'>
                <div className="form-input">
                  <label htmlFor="">TGBDDT{"*"} :</label>
                  <input type='datetime-local' name="" id="startDatetime" onChange={handleThoiGianBatDauDuTinh} value={thoiGianBatDauDuTinh} />
                </div>
                <span>{errorThoiGianBayDauDuTinh}</span>
              </div>
              <div>
                <label htmlFor="">TGKTDT{"*"} :</label>
                <input type="datetime-local" name="" id="endDatetime" onChange={handleThoiGianKetThucDuTinh} value={thoiGianKetThucDuTinh} disabled={true} />
              </div>
              <div className='container__input'>
                <div className="form-input">
                  <label htmlFor="">delay{"(Phút)"}:</label>
                  <input type="number" name="" id="" onChange={handleDelay} value={delay} min={0} />
                  {/* <input type="number" name="" id="" onChange={handleIncreaseDelay} value={increaseDelay} min={0} /> */}
                </div>
                <span>{errorDelay}</span>
              </div>
              <div className='container__input'>
                <div className="form-input">
                  <label htmlFor="">TTCB{"*"}</label>
                  <select name="" id="" onChange={handleTrangThai} value={trangThai} disabled={trangThaiCu == "CANCELED" || trangThaiCu == "COMPLETED" || props.action == "addChuyenBay" ? true : false}> STATUS
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
              <div>
                <label htmlFor="">Trạng thái xử lí</label>
                <select name="" id="" onChange={handleTrangThaiActive} value={"ACTIVE"} disabled={true}> STATUS
                  <option value="">chọn trạng thái xử lí</option>
                  <option value="ACTIVE">ACTIVE</option>
                  <option value="IN_ACTIVE">IN_ACTIVE</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="container-btn">
          <button className="btn" onClick={idChuyenBay ? suaChuyenBay : createChuyenBay}>{idChuyenBay ? "Sửa chuyến bay" : "Thêm chuyến bay"}</button>
          <button className="btnHuy" onClick={cancle}>huy bo</button>
        </div>
        <div className="container-ghichu">
          {"*{TGBDDT : Thời gian bắt đầu dự tính ; THKTDT : Thời gian kết thúc dự tính , TTCB : Trạng thái chuyến bay , TGCB : Thời gian chuyến bay}"}
        </div>
      </div>
    </>
  )
}