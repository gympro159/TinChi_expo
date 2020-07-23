import * as Types from "./../constants/ActionType";
import callApi from "./../utils/apiCaller";
import { convertTime } from "./../constants/common";
import md5 from "md5";

export const actUserLogout = () => {
  return {
    type: Types.USER_LOGOUT,
  };
};

export const actPostAccountRequest = (account, dp) => {
  var date = new Date();
  var appId = "TestApp";
  var time = convertTime(date);
  var signature = md5(`${appId + account.password + time}`);

  var header = {
    "ums-application": appId,
    "ums-time": time,
    "ums-signature": signature,
    "Content-Type": "application/json",
  };
  var body = {
    UserName: account.username,
    Password: md5(account.password),
  };
  return async (dispatch) => {
    callApi("account/authorize/student", "POST", body, header)
      .then((res) => {
        dp(res.data.Data);
        dispatch(actFetchStudentPassword(body.Password));
        dispatch(actFetchStudentAvatarRequest(res.data.Data));
        dispatch(actFetchStudentProfileRequest(res.data.Data));
        dispatch(actFetchStudentHoSoHocTapRequest(res.data.Data));
        dispatch(actGetToken(res.data.Data));
      })
      .catch((err) => {
        account.setLoad();
      });
  };
};

export const actGetToken = (dataToken) => {
  return {
    type: Types.GET_TOKEN,
    dataToken,
  };
};

export const actDeleteToken = () => {
  return {
    type: Types.DELETE_TOKEN,
  };
};

//Student Ho So Hoc Tap
export const actFetchStudentHoSoHocTapRequest = (dataToken) => {
  var date = new Date();
  var appId = dataToken.AppId;
  var time = convertTime(date);

  var header = {
    "ums-application": appId,
    "ums-time": time,
    "ums-token": dataToken.Token,
    "Content-Type": "application/json",
  };
  return (dispatch) => {
    return callApi("student-services/ho-so-hoc-tap", "GET", null, header).then(
      (res) => {
        dispatch(actFetchStudentHocKyTacNghiepRequest(dataToken));
        dispatch(actFetchStudentHoSoHocTap(res.data.Data));
      }
    );
  };
};

export const actFetchStudentHoSoHocTap = (hoSoHocTap) => {
  return {
    type: Types.FETCH_STUDENT_HOSOHOCTAP,
    hoSoHocTap,
  };
};

//Học kỳ tác nghiệp
export const actFetchStudentHocKyTacNghiepRequest = (dataToken) => {
  var date = new Date();
  var appId = dataToken.AppId;
  var time = convertTime(date);

  var header = {
    "ums-application": appId,
    "ums-time": time,
    "ums-token": dataToken.Token,
    "Content-Type": "application/json",
  };
  return (dispatch) => {
    return callApi(`configuration/get/student`, "GET", null, header).then(
      (res) => {
        dispatch(actFetchStudentHocKyTacNghiep(res.data.Data));
      }
    );
  };
};

export const actFetchStudentHocKyTacNghiep = (hocKyTacNghiep) => {
  return {
    type: Types.FETCH_STUDENT_HOCKYTACNGHIEP,
    hocKyTacNghiep,
  };
};

export const actGetStudentNganhHocTacNghiep = (hoSoHocTap, hocKyTacNghiep) => {
  let nganhHocTacNghiep;
  for (let hoSo of hoSoHocTap.HoSoNhapHoc) {
    if (hoSo.MaHocTap === hocKyTacNghiep.MaHocTap) {
      for (let quaTrinh of hoSo.QuaTrinhHocTap) {
        if (quaTrinh.MaHocKy === hocKyTacNghiep.MaHocKy) {
          nganhHocTacNghiep = { ...quaTrinh };
          break;
        }
      }
      break;
    }
  }
  return {
    type: Types.GET_STUDENT_NGANHHOCTACNGHIEP,
    nganhHocTacNghiep,
  };
};

export const actPostStudentHocKyTacNghiepRequest = (dataToken, dataBody) => {
  var date = new Date();
  var appId = dataToken.AppId;
  var secretKey = "123456";
  var time = convertTime(date);

  var header = {
    "ums-application": appId,
    "ums-time": time,
    "ums-signature": md5(appId + secretKey + time + dataToken.Token),
    "ums-token": dataToken.Token,
    "Content-Type": "application/json",
  };
  return (dispatch) => {
    return callApi("configuration/set/student", "POST", dataBody, header).then(
      (res) => {
        dispatch(actPostStudentHocKyTacNghiep(dataBody));
      }
    );
  };
};

export const actPostStudentHocKyTacNghiep = (hocKyTacNghiep) => {
  return {
    type: Types.POST_STUDENT_HOCKYTACNGHIEP,
    hocKyTacNghiep,
  };
};

//Student Profile
export const actFetchStudentProfileRequest = (dataToken) => {
  var date = new Date();
  var appId = dataToken.AppId;
  var time = convertTime(date);

  var header = {
    "ums-application": appId,
    "ums-time": time,
    "ums-token": dataToken.Token,
    "Content-Type": "application/json",
  };
  return (dispatch) => {
    return callApi("account/profile", "GET", null, header).then((res) => {
      dispatch(actFetchStudentProfile(res.data.Data));
    });
  };
};

export const actFetchStudentProfile = (studentProfile) => {
  return {
    type: Types.FETCH_STUDENT_PROFILE,
    studentProfile,
  };
};

//Student Avatar
export const actFetchStudentAvatarRequest = (dataToken) => {
  var date = new Date();
  var appId = dataToken.AppId;
  var time = convertTime(date);

  var header = {
    "ums-application": appId,
    "ums-time": time,
    "ums-token": dataToken.Token,
    "Content-Type": "application/json",
  };
  return (dispatch) => {
    return callApi("account/photo", "GET", null, header).then((res) => {
      dispatch(actFetchStudentAvatar(res.data.Data));
    });
  };
};

export const actFetchStudentAvatar = (avatar) => {
  return {
    type: Types.FETCH_STUDENT_AVATAR,
    avatar,
  };
};

export const actPostStudentAvatarRequest = (dataToken, dataBody) => {
  var date = new Date();
  var secretKey = "123456";
  var time = convertTime(date);

  var header = {
    "ums-application": dataToken.AppId,
    "ums-time": time,
    "ums-signature": md5(dataToken.AppId + secretKey + time + dataToken.Token),
    "ums-token": dataToken.Token,
    "Content-Type": "application/json",
  };
  return (dispatch) => {
    return callApi("account/change-photo", "POST", dataBody, header).then(
      (res) => {
        // console.log(dataBody);
        console.log(res.data);
        dispatch(actPostStudentAvatar(dataBody));
      }
    );
  };
};

export const actPostStudentAvatar = (avatar) => {
  return {
    type: Types.POST_STUDENT_AVATAR,
    avatar,
  };
};

//Thoi Khoa Bieu
export const actFetchStudentThoiKhoaBieuRequest = (
  dataToken,
  hocKyTacNghiep,
  tuNgay,
  denNgay
) => {
  var date = new Date();
  var appId = dataToken.AppId;
  var time = convertTime(date);

  var header = {
    "ums-application": appId,
    "ums-time": time,
    "ums-token": dataToken.Token,
    "Content-Type": "application/json",
  };
  return (dispatch) => {
    return callApi(
      `student-services/thoi-khoa-bieu?mahocky=${hocKyTacNghiep}&tungay=${tuNgay}&denngay=${denNgay}`,
      "GET",
      null,
      header
    )
      .then((res) => {
        dispatch(actFetchStudentThoiKhoaBieu(res.data.Data));
      })
      .catch((err) => {
        //Nếu hocKyTacNghiep thay đổi quá nhiều, thì fetch sẽ gặp lỗi 401, nếu bị lỗi ta sẽ fetch lại 1 lần nữa
        return callApi(
          `student-services/thoi-khoa-bieu?mahocky=${hocKyTacNghiep}&tungay=${tuNgay}&denngay=${denNgay}`,
          "GET",
          null,
          header
        ).then((res) => {
          dispatch(actFetchStudentThoiKhoaBieu(res.data.Data));
        });
      });
  };
};

export const actFetchStudentThoiKhoaBieu = (thoiKhoaBieu) => {
  return {
    type: Types.FETCH_STUDENT_THOIKHOABIEU,
    thoiKhoaBieu,
  };
};

// Lấy danh sách giáo viên
export const actFetchListTeachersRequest = (dataToken) => {
  var date = new Date();
  var appId = dataToken.AppId;
  var time = convertTime(date);

  var header = {
    "ums-application": appId,
    "ums-time": time,
    "ums-token": dataToken.Token,
    "Content-Type": "application/json",
  };
  return (dispatch) => {
    return callApi(`account/list/teachers`, "GET", null, header).then((res) => {
      dispatch(actFetchListTeachers(res.data.Data));
    });
  };
};

export const actFetchListTeachers = (listTeachers) => {
  return {
    type: Types.FETCH_LIST_TEACHERS,
    listTeachers,
  };
};

//Đổi mật khẩu
export const actFetchStudentPassword = (password) => {
  return {
    type: Types.FETCH_STUDENT_PASSWORD,
    password,
  };
};

export const actChangePasswordStudentRequest = (
  dataToken,
  dataBody,
  confirm
) => {
  var date = new Date();
  var appId = dataToken.AppId;
  var secretKey = "123456";
  var time = convertTime(date);

  var header = {
    "ums-application": appId,
    "ums-time": time,
    "ums-signature": md5(appId + secretKey + time + dataToken.Token),
    "ums-token": dataToken.Token,
    "Content-Type": "application/json",
  };
  return (dispatch) => {
    return callApi("account/change-password", "POST", dataBody, header).then(
      (res) => {
        dispatch(actFetchStudentProfile(dataBody.NewPassword));
        if (res.data.Code === 1) confirm(1);
        else confirm(-1);
      }
    );
  };
};

export const actChangePasswordStudent = (password) => {
  return {
    type: Types.CHANGE_STUDENT_PASSWORD,
    password,
  };
};

//Module - Kế hoạch đào tạo
export const actFetchStudentListHocPhanHocKyRequest = (
  dataToken,
  nganhHocTacNghiep
) => {
  var date = new Date();
  var appId = dataToken.AppId;
  var time = convertTime(date);

  var header = {
    "ums-application": appId,
    "ums-time": time,
    "ums-token": dataToken.Token,
    "Content-Type": "application/json",
  };
  return (dispatch) => {
    return callApi(
      `student-services/ke-hoach-dao-tao?makhoahoc=${nganhHocTacNghiep.MaKhoaHoc}&manganh=${nganhHocTacNghiep.MaNganh}&mahocky=${nganhHocTacNghiep.MaHocKy}`,
      "GET",
      null,
      header
    )
      .then((res) => {
        dispatch(actFetchStudentListHocPhanHocKy(res.data.Data));
      })
      .catch((err) => {
        //Nếu hocKyTacNghiep thay đổi quá nhiều, thì fetch sẽ gặp lỗi 401, nếu bị lỗi ta sẽ fetch lại 1 lần nữa
        return callApi(
          `student-services/ke-hoach-dao-tao?makhoahoc=${nganhHocTacNghiep.MaKhoaHoc}&manganh=${nganhHocTacNghiep.MaNganh}&mahocky=${nganhHocTacNghiep.MaHocKy}`,
          "GET",
          null,
          header
        )
          .then((res) => {
            dispatch(actFetchStudentListHocPhanHocKy(res.data.Data));
          })
          .catch((err) => console.log(err));
      });
  };
};

export const actFetchStudentListHocPhanHocKy = (hocPhanDKHT) => {
  return {
    type: Types.FETCH_STUDENT_LIST_HOCPHANHOCKY,
    hocPhanDKHT,
  };
};

export const actFetchStudentListLopHocPhanDKHTDaDKRequest = (
  dataToken,
  hocKy
) => {
  var date = new Date();
  var appId = dataToken.AppId;
  var time = convertTime(date);

  var header = {
    "ums-application": appId,
    "ums-time": time,
    "ums-token": dataToken.Token,
    "Content-Type": "application/json",
  };
  return (dispatch) => {
    return callApi(
      `student-services/danh-sach-lop-da-dang-ky?mahocky=${hocKy}`,
      "GET",
      null,
      header
    )
      .then((res) => {
        dispatch(actFetchStudentListLopHocPhanDKHTDaDK(res.data.Data));
      })
      .catch((err) => {
        //Nếu hocKyTacNghiep thay đổi quá nhiều, thì fetch sẽ gặp lỗi 401, nếu bị lỗi ta sẽ fetch lại 1 lần nữa
        return callApi(
          `student-services/danh-sach-lop-da-dang-ky?mahocky=${hocKy}`,
          "GET",
          null,
          header
        )
          .then((res) => {
            dispatch(actFetchStudentListLopHocPhanDKHTDaDK(res.data.Data));
          })
          .catch((err) => console.log(err));
      });
  };
};

export const actFetchStudentListLopHocPhanDKHTDaDK = (lopHocPhanDKHTDaDK) => {
  return {
    type: Types.FETCH_STUDENT_LIST_LOPHOCPHANHOCKY_DADANGKY,
    lopHocPhanDKHTDaDK,
  };
};
