import * as Types from './../constants/ActionType';

var initialState = "";

const password = (state = initialState, action) => {
    var { password } = action;
    switch (action.type) {
        case Types.FETCH_STUDENT_PASSWORD:
            return password;
        case Types.CHANGE_STUDENT_PASSWORD:
            return password;
        default: return state;
    }
};
export default password;