import { combineReducers } from 'redux';
import password from "./password";
import studentProfile from "./studentProfile";
import avatar from "./avatar";
import dataToken from "./dataToken";
import hocKyTacNghiep from "./hocKyTacNghiep";
import thoiKhoaBieu from "./thoiKhoaBieu";
import listTeachers from "./listTeachers";

const appReducers = combineReducers({
    password,
    studentProfile,
    avatar,
    dataToken,
    hocKyTacNghiep,
    thoiKhoaBieu,
    listTeachers
});

export default appReducers;