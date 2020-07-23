import * as Types from './../constants/ActionType';

var initialState = {};

const hoSoHocTap = (state = initialState, action) => {
    var { hoSoHocTap } = action;
    switch (action.type) {
        case Types.FETCH_STUDENT_HOSOHOCTAP:
            return {...hoSoHocTap};
        default: return {...state};
    }
};
export default hoSoHocTap;