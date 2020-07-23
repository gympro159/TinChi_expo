import * as Types from '../constants/ActionType';

var initialState = [];

const lopHocPhanDKHTDaDK = (state = initialState, action) => {
    var { lopHocPhanDKHTDaDK } = action;
    switch (action.type) {
        case Types.FETCH_STUDENT_LIST_LOPHOCPHANHOCKY_DADANGKY:
            return [...lopHocPhanDKHTDaDK];
        default: return [...state];
    }
};
export default lopHocPhanDKHTDaDK;