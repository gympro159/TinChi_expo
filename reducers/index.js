import { combineReducers } from 'redux';
import studentProfile from "./studentProfile";
import avatar from "./avatar";
import dataToken from "./dataToken";

const appReducers = combineReducers({
    studentProfile,
    avatar,
    dataToken
});

export default appReducers;