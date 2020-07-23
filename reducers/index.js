import { combineReducers } from "redux";
import password from "./password";
import studentProfile from "./studentProfile";
import hoSoHocTap from "./hoSoHocTap";
import avatar from "./avatar";
import dataToken from "./dataToken";
import hocKyTacNghiep from "./hocKyTacNghiep";
import nganhHocTacNghiep from "./nganhHocTacNghiep";
import thoiKhoaBieu from "./thoiKhoaBieu";
import hocPhanDKHT from "./hocPhanDKHT";
import lopHocPhanDKHTDaDK from "./lopHocPhanDKHTDaDK";
import listTeachers from "./listTeachers";

const appReducers = combineReducers({
  password,
  studentProfile,
  hoSoHocTap,
  avatar,
  dataToken,
  hocKyTacNghiep,
  nganhHocTacNghiep,
  thoiKhoaBieu,
  hocPhanDKHT,
  lopHocPhanDKHTDaDK,
  listTeachers,
});

const rootReducer = (state, action) => {
  if (action.type === "USER_LOGOUT") {
    state = undefined;
  }

  return appReducers(state, action);
};

export default rootReducer;
