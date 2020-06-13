import * as Types from './../constants/ActionType';

var initialState = {};

const hocKyTacNghiep = (state = initialState, action) => {
    var { hocKyTacNghiep } = action;
    switch (action.type) {
        case Types.FETCH_STUDENT_HOCKYTACNGHIEP:
            return {...hocKyTacNghiep};
        case Types.POST_STUDENT_HOCKYTACNGHIEP:
            return {...hocKyTacNghiep};
        default: return state;
    }
};
export default hocKyTacNghiep;