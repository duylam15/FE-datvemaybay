import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './layoutThongBao.css';
export default function LayOutThongBao(props) {
  useEffect(() => {
    const currentPath = window.location.pathname; // Lấy đường dẫn hiện tại
    const newPath = currentPath.split("/"); // Thêm đoạn mới vào
    console.log(newPath);
    // navigator(`${newPath}/chuyenbay`, { replace: true }); // Điều hướng đến đường dẫn mới mà không lưu vào lịch sử
  }, [])

  const navigator = useNavigate();
  const OK = () => {
    props.setTypeDisplay("none");
    if (props.thongBao.typeMessage == "question") return;
    const currentPath = window.location.pathname; // Lấy đường dẫn hiện tại
    const path = currentPath.split("/");
    const newPath = `/admin/${path[2]}`;
    console.log(newPath);
    navigator(`${newPath}`, { replace: true }); // Điều hướng đến đường dẫn mới mà không lưu vào lịch sử
  }

  const Cancle = () => {
    props.setTypeDisplay("none");

  }
  return (
    <div className='layoutThongBao'>
      <div className="hopThoai">
        <div className="tieuDeHopThoai itemHopThoai">
          Thông báo
        </div>
        <div className="displayMessage itemHopThoai">
          <div>{props.thongBao.message}</div>
        </div>
        <div className="buttonHopThoai itemHopThoai">
          <button onClick={OK}>OK</button>
          {props.thongBao.typeMessage == "question" && (<button onClick={Cancle}>CANCLE</button>)}
        </div>
      </div>
    </div>
  )
}
