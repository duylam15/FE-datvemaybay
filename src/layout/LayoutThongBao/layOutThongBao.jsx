import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './layoutThongBao.css';
export default function LayOutThongBao(props) {
  function removeActionAndPathFromURL(url) {
    return url.replace(/\/(add|edit).*$/, ""); // Thay thế từ "add" hoặc "edit" đến hết chuỗi bằng chuỗi rỗng
  }
  useEffect(() => {
    console.log(props.thongBao);
  }, [])

  const navigator = useNavigate();
  const OK = () => {
    props.setTypeDisplay("none");
    if (props.thongBao.typeMessage == "inpage") return;
    const currentPath = window.location.pathname; // Lấy đường dẫn hiện tại
    navigator(`${removeActionAndPathFromURL(currentPath)}`, { replace: true }); // Điều hướng đến đường dẫn mới mà không lưu vào lịch sử
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
          <div>{props.thongBao.message ? props.thongBao.message : "Thông báo"}</div>
        </div>
        <div className="buttonHopThoai itemHopThoai">
          <button onClick={OK}>OK</button>
          {props.thongBao.typeMessage == "outpage" && (<button onClick={Cancle}>CANCLE</button>)}
        </div>
      </div>
    </div>
  )
}
