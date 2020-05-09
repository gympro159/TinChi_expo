import { combineReducers } from 'redux';
import studentProfile from "./studentProfile";
import dataToken from "./dataToken";

const appReducers = combineReducers({
    studentProfile,
    dataToken
});

export default appReducers;