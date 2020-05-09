import * as Types from "./../constants/ActionType";
import callApi from "./../utils/apiCaller";
import convertTime from "./../constants/common";
import md5 from "md5";

export const actPostAccountRequest = (account) => {
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
  console.log("actPostAccountRequest");
  return async (dispatch) => {
    var db = await callApi("account/authorize/student", "POST", body, header)
    // .then(
    //   (res) => {
    //     dispatch(actGetToken(res.data.Data));
    //   }
    // ); 
    await dispatch(actGetToken(db.data.Data))
  };
};

export const actGetToken = (dataToken) => {
  console.log("actGetToken");
  
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
