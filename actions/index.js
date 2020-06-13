import * as Types from "./../constants/ActionType";
import callApi from "./../utils/apiCaller";
import { convertTime } from "./../constants/common";
import md5 from "md5";
import { Alert } from "react-native";

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
  //console.log("actPostAccountRequest");
  return async (dispatch) => {
    callApi("account/authorize/student", "POST", body, header)
      .then((res) => {
        dp(res.data.Data);
        dispatch(actFetchStudentPassword(body.Password))
        dispatch(actFetchStudentAvatarRequest(res.data.Data));
        dispatch(actFetchStudentProfileRequest(res.data.Data));
        dispatch(actFetchStudentHocKyTacNghiepRequest(res.data.Data));
        dispatch(actGetToken(res.data.Data));
      })
      .catch((err) => {
        account.setLoad();
      });
  };
};

export const actGetToken = (dataToken) => {
  //console.log("actGetToken");
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
    return callApi("account/change-photo", "POST", dataBody, header).then(
      (res) => {
        //console.log(dataBody);
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
  hocKyTacNghiep
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
      `student-services/get-full-schedule?semester=${hocKyTacNghiep}`,
      "GET",
      null,
      header
    ).then((res) => {
      dispatch(actFetchStudentThoiKhoaBieu(res.data.Data));
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
    password
  }
}


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
