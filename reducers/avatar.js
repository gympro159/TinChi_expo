import * as Types from './../constants/ActionType';

var initialState = "";

const avatar = (state = initialState, action) => {
    var { avatar } = action;
    switch (action.type) {
        case Types.FETCH_STUDENT_AVATAR:
            return avatar;
        default: return state;
    }
};
export default avatar;