import _ from "lodash"

export function pad2(n) {
  return n < 10 ? "0" + n : n;
}

export function convertTime(date) {
  var result = date.getFullYear().toString() +
  pad2(date.getMonth() + 1) +
  pad2(date.getDate()) +
  pad2(date.getHours()) +
  pad2(date.getMinutes()) +
  pad2(date.getSeconds());
  return result;
}

export function getDateFormat(date) {
  result = `${
    date.getDate() > 9 ? date.getDate() : "0" + date.getDate()
  }/${
    date.getMonth() > 8
      ? date.getMonth() + 1
      : "0" + (date.getMonth() + 1)
  }/${date.getFullYear()}`;
  return result;
}

export function getLocalDateTimeFormat() {
  var date = new Date(),
  result = `${
    date.getDate() > 9 ? date.getDate() : "0" + date.getDate()
  }-${
    date.getMonth() > 8
      ? date.getMonth() + 1
      : "0" + (date.getMonth() + 1)
  }-${date.getFullYear()} ${
    date.getHours() > 9
      ? date.getHours()
      : "0" + date.getHours()
  }:${
    date.getMinutes() > 9
      ? date.getMinutes()
      : "0" + date.getMinutes()
  }`;
  return result;
}

export function getLocalDateFormat() {
  var date = new Date(),
  result = `${
    date.getDate() > 9 ? date.getDate() : "0" + date.getDate()
  }/${
    date.getMonth() > 8
      ? date.getMonth() + 1
      : "0" + (date.getMonth() + 1)
  }/${date.getFullYear()}`;
  return result;
}

export function getLocalDateFormat2() {
  var date = new Date(),
  result = `${
    date.getDate() > 9 ? date.getDate() : "0" + date.getDate()
  }-${
    date.getMonth() > 8
      ? date.getMonth() + 1
      : "0" + (date.getMonth() + 1)
  }-${date.getFullYear()}`;
  return result;
}

export function getDateISOStringZoneTime(params) {
  var tzoffset = params.getTimezoneOffset() * 60000;
  var localISOTime = (new Date(params - tzoffset)).toISOString().slice(0, -13)+"00:00:00";
  return localISOTime;
  //return "2019-09-03T00:00:00";
}

export function changeAlias(alias) {
  var str = alias.toString();
  str = str.toLowerCase();
  // str = _.deburr(str); // bỏ dấu 
  str = str.trim(); 
  return str;
}