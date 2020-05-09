import * as Types from './../constants/ActionType';

var initialState = {};

const studentProfile = (state = initialState, action) => {
    var { studentProfile } = action;
    switch (action.type) {
        case Types.FETCH_STUDENT_PROFILE:
            return {...studentProfile};
        case Types.UPDATE_STUDENT_PROFILE:
            return {...studentProfile};
        default: return {...state};
    }
};
export default studentProfile;