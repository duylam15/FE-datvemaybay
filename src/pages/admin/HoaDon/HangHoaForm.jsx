import React from "react";

const HangHoaForm = ({ hangHoa, onHangHoaChange, fieldErrors, index }) => {
  return (
    <div className="hang-hoa-info">
      <label style={{ fontSize: "1.1em", fontWeight: "bold", width: "100%" }}>
        Thông tin hàng hóa
      </label>
      <div className="mb-3 col-4">
        <label>Tên hàng hóa</label>
        <input
          type="text"
          className="form-control"
          value={hangHoa.tenHangHoa}
          onChange={(e) =>
            onHangHoaChange("tenHangHoa", e.target.value)
          }
        />
        {fieldErrors[`tenHangHoa-${index}`] && (
          <div className="text-danger">{fieldErrors[`tenHangHoa-${index}`]}</div>
        )}
      </div>
      <div className="mb-3 col-4">
        <label>Trọng lượng (kg)</label>
        <input
          type="number"
          className="form-control"
          value={hangHoa.taiTrong}
          onChange={(e) =>
            onHangHoaChange("taiTrong", e.target.value)
          }
        />
        {fieldErrors[`taiTrong-${index}`] && (
          <div className="text-danger">{fieldErrors[`taiTrong-${index}`]}</div>
        )}
      </div>
    </div>
  );
};

export default HangHoaForm;
