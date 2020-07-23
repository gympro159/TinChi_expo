import * as Types from './../constants/ActionType';

var initialState = {};

const hocPhanDKHT = (state = initialState, action) => {
    var { hocPhanDKHT } = action;
    switch (action.type) {
        case Types.FETCH_STUDENT_LIST_HOCPHANHOCKY:
            return {...hocPhanDKHT};
        default: return {...state};
    }
};
export default hocPhanDKHT;