import * as Types from './../constants/ActionType';

var initialState = {};

const nganhHocTacNghiep = (state = initialState, action) => {
    var { nganhHocTacNghiep } = action;
    switch (action.type) {
        case Types.GET_STUDENT_NGANHHOCTACNGHIEP:
            return {...nganhHocTacNghiep};
        default: return {...state};
    }
};
export default nganhHocTacNghiep;